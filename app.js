const BUILD_STAMP = '2026-03-21 15-21-00';

document.getElementById('buildStamp').textContent = BUILD_STAMP;

const state = {
  audioContext: null,
  audioBuffer: null,
  currentFile: null,
  objectUrl: null,
  analysis: null,
};

const fileInput = document.getElementById('audioFile');
const analyzeBtn = document.getElementById('analyzeBtn');
const dropzone = document.getElementById('dropzone');
const audioPlayer = document.getElementById('audioPlayer');
const fileStatus = document.getElementById('fileStatus');
const fileNameEl = document.getElementById('fileName');
const fileDurationEl = document.getElementById('fileDuration');
const fileChannelsEl = document.getElementById('fileChannels');
const fileRateEl = document.getElementById('fileRate');

const metrics = {
  peak: document.getElementById('metricPeak'),
  rms: document.getElementById('metricRms'),
  crest: document.getElementById('metricCrest'),
  sibilance: document.getElementById('metricSibilance'),
  stereo: document.getElementById('metricStereo'),
  health: document.getElementById('metricHealth'),
};

const issuesList = document.getElementById('issuesList');
const summaryText = document.getElementById('summaryText');
const bandsBars = document.getElementById('bandsBars');
const waveCanvas = document.getElementById('waveCanvas');
const spectrumCanvas = document.getElementById('spectrumCanvas');

setupEvents();
initCanvasPlaceholders();

function setupEvents() {
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  });

  analyzeBtn.addEventListener('click', async () => {
    if (!state.audioBuffer) return;
    await analyzeCurrentBuffer();
  });

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  });
}

function initAudioContext() {
  if (!state.audioContext) {
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return state.audioContext;
}

async function handleFile(file) {
  resetAnalysis();
  setStatus('busy', 'Carregando arquivo');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = initAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));

    state.currentFile = file;
    state.audioBuffer = audioBuffer;

    if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
    state.objectUrl = URL.createObjectURL(file);
    audioPlayer.src = state.objectUrl;

    fileNameEl.textContent = file.name;
    fileDurationEl.textContent = formatTime(audioBuffer.duration);
    fileChannelsEl.textContent = audioBuffer.numberOfChannels === 2 ? 'Estéreo' : `${audioBuffer.numberOfChannels} canal`;
    fileRateEl.textContent = `${audioBuffer.sampleRate} Hz`;

    drawWaveform(audioBuffer);
    drawSpectrumPlaceholder('MasterCheck pronto para análise');
    analyzeBtn.disabled = false;
    setStatus('ready', 'Arquivo pronto');
  } catch (error) {
    console.error(error);
    setStatus('idle', 'Falha ao carregar');
    alert('Não foi possível abrir esse arquivo. Tente outro WAV ou MP3.');
  }
}

async function analyzeCurrentBuffer() {
  setStatus('busy', 'Analisando');
  analyzeBtn.disabled = true;

  try {
    const analysis = await analyzeAudioBuffer(state.audioBuffer);
    state.analysis = analysis;
    updateUIWithAnalysis(analysis);
    setStatus('ready', 'Análise concluída');
  } catch (error) {
    console.error(error);
    setStatus('idle', 'Erro na análise');
    alert('Ocorreu um erro durante a análise do áudio.');
  } finally {
    analyzeBtn.disabled = false;
  }
}

function updateUIWithAnalysis(analysis) {
  metrics.peak.textContent = `${analysis.peakDb.toFixed(1)} dBFS`;
  metrics.rms.textContent = `${analysis.rmsDb.toFixed(1)} dBFS`;
  metrics.crest.textContent = `${analysis.crestFactorDb.toFixed(1)} dB`;
  metrics.sibilance.textContent = analysis.sibilanceLabel;
  metrics.stereo.textContent = analysis.stereoLabel;
  metrics.health.textContent = analysis.healthLabel;

  renderIssues(analysis.issues);
  summaryText.textContent = analysis.summary;
  renderBands(analysis.bands);
  drawSpectrumFromMagnitudes(analysis.spectrumMagnitudes, analysis.sampleRate, analysis.fftSize);
}

async function analyzeAudioBuffer(audioBuffer) {
  const sampleRate = audioBuffer.sampleRate;
  const left = audioBuffer.getChannelData(0);
  const right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
  const mono = new Float32Array(left.length);

  let peak = 0;
  let sumSquares = 0;
  let correlationNumerator = 0;
  let leftSquares = 0;
  let rightSquares = 0;
  let sideEnergy = 0;
  let midEnergy = 0;

  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const r = right[i];
    const m = (l + r) * 0.5;
    const s = (l - r) * 0.5;
    mono[i] = m;
    peak = Math.max(peak, Math.abs(l), Math.abs(r));
    sumSquares += m * m;
    correlationNumerator += l * r;
    leftSquares += l * l;
    rightSquares += r * r;
    midEnergy += m * m;
    sideEnergy += s * s;
  }

  const rms = Math.sqrt(sumSquares / mono.length || 0);
  const peakDb = toDb(peak || 1e-8);
  const rmsDb = toDb(rms || 1e-8);
  const crestFactorDb = peakDb - rmsDb;
  const stereoCorrelation = correlationNumerator / Math.sqrt((leftSquares * rightSquares) || 1e-12);
  const stereoWidth = sideEnergy / (midEnergy || 1e-12);

  const fftSize = 65536;
  const monoSlice = selectRepresentativeSlice(mono, fftSize);
  const windowed = applyHannWindow(monoSlice);
  const { magnitudes } = fftReal(windowed);

  const bands = [
    { key: 'sub', label: 'Subgrave', min: 20, max: 60 },
    { key: 'low', label: 'Grave', min: 60, max: 250 },
    { key: 'lowMid', label: 'Médio-grave', min: 250, max: 500 },
    { key: 'mid', label: 'Médios', min: 500, max: 2000 },
    { key: 'presence', label: 'Presença', min: 2000, max: 5000 },
    { key: 'high', label: 'Brilho', min: 5000, max: 10000 },
    { key: 'air', label: 'Ar', min: 10000, max: 20000 },
  ];

  const bandResults = bands.map((band) => {
    const energy = bandEnergy(magnitudes, sampleRate, fftSize, band.min, band.max);
    return { ...band, energy };
  });

  const totalBandEnergy = bandResults.reduce((sum, band) => sum + band.energy, 0) || 1e-12;
  bandResults.forEach((band) => {
    band.percent = (band.energy / totalBandEnergy) * 100;
  });

  const sibilanceEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 5000, 10000);
  const presenceEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 2000, 5000);
  const lowMidEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 200, 350);
  const mudEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 250, 500);
  const harshEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 7000, 9000);
  const subEnergy = bandEnergy(magnitudes, sampleRate, fftSize, 20, 60);

  const sibilanceRatio = sibilanceEnergy / (presenceEnergy + sibilanceEnergy + 1e-12);
  const lowMidRatio = lowMidEnergy / totalBandEnergy;
  const mudRatio = mudEnergy / totalBandEnergy;
  const harshRatio = harshEnergy / totalBandEnergy;
  const subRatio = subEnergy / totalBandEnergy;

  const issues = [];

  if (lowMidRatio > 0.17 || mudRatio > 0.22) {
    issues.push({
      severity: 'high',
      title: 'Acúmulo de médios-graves',
      detail: 'Há indícios de embolo entre 200 e 500 Hz. Isso pode reduzir clareza e definição.',
      action: 'Teste cortes suaves entre 250 e 350 Hz e revise instrumentos competindo nessa área.',
    });
  }

  if (harshRatio > 0.07) {
    issues.push({
      severity: 'medium',
      title: 'Aspereza nos agudos',
      detail: 'A região entre 7 e 9 kHz está relativamente destacada e pode soar cansativa.',
      action: 'Avalie um corte sutil ou dynamic EQ nessa faixa, especialmente em vocais e pratos.',
    });
  }

  if (sibilanceRatio > 0.44) {
    issues.push({
      severity: 'medium',
      title: 'Possível sibilância',
      detail: 'A energia entre 5 e 10 kHz sugere sibilância perceptível.',
      action: 'Teste de-esser focado em 6 a 8 kHz se o material tiver voz.',
    });
  }

  if (crestFactorDb < 8) {
    issues.push({
      severity: 'high',
      title: 'Dinâmica reduzida / compressão forte',
      detail: 'O crest factor está baixo, indicando pouca diferença entre pico e nível médio.',
      action: 'Se quiser mais impacto, alivie compressão/limiter ou use ataque mais lento.',
    });
  }

  if (peakDb > -0.5) {
    issues.push({
      severity: 'medium',
      title: 'Headroom apertado',
      detail: 'O pico máximo está muito próximo de 0 dBFS.',
      action: 'Deixe mais folga para evitar clipping, principalmente em master.',
    });
  }

  if (subRatio > 0.16) {
    issues.push({
      severity: 'low',
      title: 'Subgrave em evidência',
      detail: 'Há energia relevante abaixo de 60 Hz.',
      action: 'Confirme em monitores/fones se o low-end está controlado e compatível com o estilo.',
    });
  }

  if (stereoCorrelation < 0.05) {
    issues.push({
      severity: 'medium',
      title: 'Compatibilidade mono merece revisão',
      detail: 'A correlação estéreo está baixa, indicando largura grande ou elementos fora de fase.',
      action: 'Cheque o mix em mono e revise efeitos estéreo extremos.',
    });
  }

  if (!issues.length) {
    issues.push({
      severity: 'low',
      title: 'Nenhum alerta forte',
      detail: 'O áudio não apresentou sinais críticos nas regras atuais do MVP.',
      action: 'Use a referência e escuta crítica para validar decisões artísticas.',
    });
  }

  const sibilanceLabel = sibilanceRatio > 0.44 ? 'Alta' : sibilanceRatio > 0.34 ? 'Média' : 'Baixa';
  const stereoLabel = stereoWidth > 0.35 ? 'Aberto' : stereoWidth > 0.16 ? 'Equilibrado' : 'Fechado';
  const healthLabel = issues.some((x) => x.severity === 'high')
    ? 'Ajustes importantes'
    : issues.some((x) => x.severity === 'medium')
      ? 'Pode melhorar'
      : 'Saudável';

  const summary = buildSummary({
    peakDb,
    rmsDb,
    crestFactorDb,
    sibilanceLabel,
    stereoLabel,
    issues,
    bandResults,
  });

  return {
    sampleRate,
    fftSize,
    spectrumMagnitudes: Array.from(magnitudes),
    peakDb,
    rmsDb,
    crestFactorDb,
    sibilanceLabel,
    stereoLabel,
    healthLabel,
    stereoCorrelation,
    stereoWidth,
    bands: bandResults,
    issues,
    summary,
  };
}

function buildSummary({ peakDb, rmsDb, crestFactorDb, sibilanceLabel, stereoLabel, issues, bandResults }) {
  const dominantBand = [...bandResults].sort((a, b) => b.percent - a.percent)[0];
  const highSeverity = issues.filter((x) => x.severity === 'high').length;
  const mediumSeverity = issues.filter((x) => x.severity === 'medium').length;

  const intro = `O arquivo analisado apresenta pico em ${peakDb.toFixed(1)} dBFS, RMS aproximado em ${rmsDb.toFixed(1)} dBFS e crest factor de ${crestFactorDb.toFixed(1)} dB.`;
  const tone = `A região com maior predominância espectral foi ${dominantBand.label.toLowerCase()} (${dominantBand.percent.toFixed(1)}% da energia estimada).`;
  const stereo = `A imagem estéreo foi classificada como ${stereoLabel.toLowerCase()} e a sibilância estimada como ${sibilanceLabel.toLowerCase()}.`;

  let priority = 'No momento, o material parece relativamente estável dentro das regras atuais do MVP.';
  if (highSeverity > 0) {
    priority = `Foram encontrados ${highSeverity} alerta(s) importante(s). Priorize correções de dinâmica/headroom e equilíbrio tonal antes de refinamentos.`;
  } else if (mediumSeverity > 0) {
    priority = `Foram encontrados ${mediumSeverity} ponto(s) moderado(s) de atenção. Vale revisar brilho, sibilância ou compatibilidade mono.`;
  }

  return `${intro} ${tone} ${stereo} ${priority}`;
}

function renderIssues(issues) {
  issuesList.classList.remove('empty-state');
  issuesList.innerHTML = issues.map((issue) => `
    <article class="issue-card">
      <div class="issue-card__top">
        <strong>${issue.title}</strong>
        <span class="issue-card__tag tag--${issue.severity}">${translateSeverity(issue.severity)}</span>
      </div>
      <div>${issue.detail}</div>
      <p><strong>Sugestão:</strong> ${issue.action}</p>
    </article>
  `).join('');
}

function renderBands(bands) {
  const maxPercent = Math.max(...bands.map((band) => band.percent), 1);
  bandsBars.innerHTML = bands.map((band) => `
    <div class="band-row">
      <strong>${band.label}</strong>
      <div class="band-row__track">
        <div class="band-row__bar" style="width:${(band.percent / maxPercent) * 100}%"></div>
      </div>
      <span>${band.percent.toFixed(1)}%</span>
    </div>
  `).join('');
}

function resetAnalysis() {
  metrics.peak.textContent = '-- dBFS';
  metrics.rms.textContent = '-- dBFS';
  metrics.crest.textContent = '-- dB';
  metrics.sibilance.textContent = '--';
  metrics.stereo.textContent = '--';
  metrics.health.textContent = 'Aguardando';
  issuesList.className = 'issues-list empty-state';
  issuesList.innerHTML = 'Carregue um arquivo e clique em <strong>Analisar agora</strong>.';
  summaryText.className = 'summary-box empty-state';
  summaryText.textContent = 'O relatório completo será gerado automaticamente após a análise.';
  bandsBars.innerHTML = '';
}

function setStatus(type, text) {
  fileStatus.className = `status status--${type}`;
  fileStatus.textContent = text;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function toDb(value) {
  return 20 * Math.log10(Math.max(value, 1e-8));
}

function selectRepresentativeSlice(data, size) {
  if (data.length <= size) {
    const slice = new Float32Array(size);
    slice.set(data);
    return slice;
  }
  const start = Math.max(0, Math.floor((data.length - size) / 2));
  return data.slice(start, start + size);
}

function applyHannWindow(data) {
  const out = new Float32Array(data.length);
  const N = data.length;
  for (let n = 0; n < N; n++) {
    out[n] = data[n] * 0.5 * (1 - Math.cos((2 * Math.PI * n) / (N - 1)));
  }
  return out;
}

function fftReal(input) {
  const N = input.length;
  const re = new Float64Array(N);
  const im = new Float64Array(N);
  for (let i = 0; i < N; i++) re[i] = input[i];

  bitReverse(re, im);

  for (let size = 2; size <= N; size <<= 1) {
    const half = size >> 1;
    const tableStep = (-2 * Math.PI) / size;
    for (let start = 0; start < N; start += size) {
      for (let k = 0; k < half; k++) {
        const evenIndex = start + k;
        const oddIndex = evenIndex + half;
        const angle = tableStep * k;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const tre = cos * re[oddIndex] - sin * im[oddIndex];
        const tim = sin * re[oddIndex] + cos * im[oddIndex];
        re[oddIndex] = re[evenIndex] - tre;
        im[oddIndex] = im[evenIndex] - tim;
        re[evenIndex] += tre;
        im[evenIndex] += tim;
      }
    }
  }

  const magnitudes = new Float64Array(N / 2);
  for (let i = 0; i < N / 2; i++) {
    magnitudes[i] = Math.sqrt(re[i] * re[i] + im[i] * im[i]);
  }
  return { magnitudes };
}

function bitReverse(re, im) {
  const N = re.length;
  let j = 0;
  for (let i = 1; i < N; i++) {
    let bit = N >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
}

function bandEnergy(magnitudes, sampleRate, fftSize, minHz, maxHz) {
  const binHz = sampleRate / fftSize;
  const start = Math.max(1, Math.floor(minHz / binHz));
  const end = Math.min(magnitudes.length - 1, Math.ceil(maxHz / binHz));
  let energy = 0;
  for (let i = start; i <= end; i++) {
    energy += magnitudes[i] * magnitudes[i];
  }
  return energy;
}

function initCanvasPlaceholders() {
  drawWavePlaceholder();
  drawSpectrumPlaceholder('Aguardando áudio');
}

function drawWavePlaceholder() {
  const ctx = waveCanvas.getContext('2d');
  const { width, height } = waveCanvas;
  drawCanvasBackground(ctx, width, height);
  ctx.strokeStyle = 'rgba(104, 212, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    const t = x / width;
    const y = height / 2 + Math.sin(t * Math.PI * 8) * 24 + Math.sin(t * Math.PI * 32) * 8;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  drawCanvasLabel(ctx, width, height, 'Waveform Preview');
}

function drawSpectrumPlaceholder(text) {
  const ctx = spectrumCanvas.getContext('2d');
  const { width, height } = spectrumCanvas;
  drawCanvasBackground(ctx, width, height);
  ctx.fillStyle = 'rgba(123, 116, 255, 0.18)';
  for (let i = 0; i < 48; i++) {
    const barWidth = width / 60;
    const gap = width / 120;
    const x = 22 + i * (barWidth + gap);
    const barHeight = 30 + Math.sin(i * 0.45) * 60 + i * 0.8;
    ctx.fillRect(x, height - 24 - Math.max(22, barHeight), barWidth, Math.max(22, barHeight));
  }
  drawCanvasLabel(ctx, width, height, text);
}

function drawWaveform(audioBuffer) {
  const ctx = waveCanvas.getContext('2d');
  const { width, height } = waveCanvas;
  drawCanvasBackground(ctx, width, height);

  const data = audioBuffer.getChannelData(0);
  const step = Math.ceil(data.length / width);
  const amp = height / 2.6;

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(104, 212, 255, 0.98)';
  ctx.beginPath();

  for (let i = 0; i < width; i++) {
    let min = 1;
    let max = -1;
    for (let j = 0; j < step; j++) {
      const datum = data[(i * step) + j] || 0;
      if (datum < min) min = datum;
      if (datum > max) max = datum;
    }
    ctx.moveTo(i, (1 + min) * amp);
    ctx.lineTo(i, (1 + max) * amp);
  }
  ctx.stroke();
  drawCanvasLabel(ctx, width, height, 'Waveform do arquivo');
}

function drawSpectrumFromMagnitudes(magnitudes, sampleRate, fftSize) {
  const ctx = spectrumCanvas.getContext('2d');
  const { width, height } = spectrumCanvas;
  drawCanvasBackground(ctx, width, height);

  const points = 180;
  const nyquist = sampleRate / 2;
  ctx.beginPath();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(123, 116, 255, 0.95)';

  for (let i = 0; i < points; i++) {
    const frac = i / (points - 1);
    const freq = 20 * Math.pow(nyquist / 20, frac);
    const bin = Math.min(magnitudes.length - 1, Math.max(1, Math.floor((freq / sampleRate) * fftSize)));
    const mag = Math.log10(1 + magnitudes[bin]);
    const norm = Math.min(1, mag / 4.2);
    const x = frac * width;
    const y = height - 24 - norm * (height - 48);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = 'rgba(123, 116, 255, 0.15)';
  ctx.lineTo(width, height - 24);
  ctx.lineTo(0, height - 24);
  ctx.closePath();
  ctx.fill();

  drawCanvasLabel(ctx, width, height, 'Espectro estimado');
}

function drawCanvasBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(5, 12, 22, 0.95)');
  gradient.addColorStop(1, 'rgba(11, 23, 38, 0.95)');
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 5; i++) {
    const y = (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawCanvasLabel(ctx, width, height, text) {
  ctx.fillStyle = 'rgba(235, 243, 255, 0.72)';
  ctx.font = '600 14px Inter, sans-serif';
  ctx.fillText(text, 16, height - 14);
}

function translateSeverity(severity) {
  return severity === 'high' ? 'Alta' : severity === 'medium' ? 'Média' : 'Baixa';
}

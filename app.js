const BUILD_STAMP = "2026-03-23 16-24-00";
const STORAGE_KEY = "mastercheck_custom_presets_v1";
const BAND_KEYS = ["sub","low","lowMid","mid","presence","high","air"];
const BAND_META = [
  { key: "sub", label: "Subgrave", min: 20, max: 60 },
  { key: "low", label: "Grave", min: 60, max: 250 },
  { key: "lowMid", label: "Médio-grave", min: 250, max: 500 },
  { key: "mid", label: "Médios", min: 500, max: 2000 },
  { key: "presence", label: "Presença", min: 2000, max: 5000 },
  { key: "high", label: "Brilho", min: 5000, max: 10000 },
  { key: "air", label: "Ar", min: 10000, max: 20000 }
];

const BUILTIN_PRESETS = {
  universal: { id: "universal", label: "Universal Balanced", description: "Referência ampla e equilibrada para mix/master sem faixa externa.", isCustom: false, targets: { bands: { sub: 7, low: 14, lowMid: 16, mid: 24, presence: 18, high: 14, air: 7 }, crestDb: 10.5, rmsDb: -12.0, sibilanceMax: 0.36, reverbMax: 0.46, saturationMax: 0.28, stereoWidth: 0.46, peakDb: -1.0 } },
  pop: { id: "pop", label: "Pop Master", description: "Mais presença e brilho, mantendo controle de sibilância e loudness competitivo.", isCustom: false, targets: { bands: { sub: 6, low: 15, lowMid: 17, mid: 22, presence: 19, high: 14, air: 7 }, crestDb: 9.5, rmsDb: -10.5, sibilanceMax: 0.34, reverbMax: 0.44, saturationMax: 0.30, stereoWidth: 0.52, peakDb: -0.8 } },
  trap: { id: "trap", label: "Trap / Urban", description: "Subgrave mais forte, médios controlados e topo brilhante sem perder punch.", isCustom: false, targets: { bands: { sub: 12, low: 22, lowMid: 16, mid: 16, presence: 13, high: 12, air: 9 }, crestDb: 8.8, rmsDb: -9.5, sibilanceMax: 0.35, reverbMax: 0.40, saturationMax: 0.34, stereoWidth: 0.48, peakDb: -0.7 } },
  rock: { id: "rock", label: "Rock Master", description: "Baixo e médio-grave firmes, médios presentes e topo controlado.", isCustom: false, targets: { bands: { sub: 7, low: 18, lowMid: 20, mid: 21, presence: 15, high: 12, air: 7 }, crestDb: 10.0, rmsDb: -11.5, sibilanceMax: 0.31, reverbMax: 0.42, saturationMax: 0.32, stereoWidth: 0.40, peakDb: -0.9 } },
  edm: { id: "edm", label: "EDM / Dance", description: "Sub e grave sustentados, energia alta e brilho aerado para club/streaming.", isCustom: false, targets: { bands: { sub: 10, low: 21, lowMid: 15, mid: 16, presence: 14, high: 14, air: 10 }, crestDb: 8.6, rmsDb: -9.0, sibilanceMax: 0.33, reverbMax: 0.43, saturationMax: 0.35, stereoWidth: 0.57, peakDb: -0.6 } },
  podcast: { id: "podcast", label: "Podcast / Voice", description: "Foco em inteligibilidade, médio e presença com controle rígido de sibilância.", isCustom: false, targets: { bands: { sub: 4, low: 9, lowMid: 16, mid: 34, presence: 21, high: 11, air: 5 }, crestDb: 11.0, rmsDb: -16.0, sibilanceMax: 0.29, reverbMax: 0.30, saturationMax: 0.20, stereoWidth: 0.10, peakDb: -1.5 } },
  acoustic: { id: "acoustic", label: "Acoustic / Natural", description: "Mais naturalidade e dinâmica, com topo suave e ambiente moderado.", isCustom: false, targets: { bands: { sub: 5, low: 13, lowMid: 18, mid: 27, presence: 18, high: 12, air: 7 }, crestDb: 12.0, rmsDb: -14.0, sibilanceMax: 0.30, reverbMax: 0.48, saturationMax: 0.22, stereoWidth: 0.42, peakDb: -1.2 } },
  gospel: { id: "gospel", label: "Gospel / Worship", description: "Base interna com vocal à frente, corpo quente, ambiência controlada e abertura estéreo musical.", isCustom: false, targets: { bands: { sub: 5, low: 13, lowMid: 18, mid: 24, presence: 20, high: 13, air: 7 }, crestDb: 10.8, rmsDb: -11.8, sibilanceMax: 0.31, reverbMax: 0.46, saturationMax: 0.24, stereoWidth: 0.48, peakDb: -1.0 } },
  broadcast: { id: "broadcast", label: "Broadcast / Rádio", description: "Referência interna focada em inteligibilidade, estabilidade tonal e segurança de loudness.", isCustom: false, targets: { bands: { sub: 4, low: 10, lowMid: 17, mid: 31, presence: 21, high: 11, air: 6 }, crestDb: 9.8, rmsDb: -14.0, sibilanceMax: 0.28, reverbMax: 0.28, saturationMax: 0.20, stereoWidth: 0.18, peakDb: -1.3 } },
  cinematic: { id: "cinematic", label: "Cinematic / Trailer", description: "Resposta interna com subgrave amplo, impacto e profundidade, mantendo espaço nos médios para narrativa.", isCustom: false, targets: { bands: { sub: 12, low: 19, lowMid: 16, mid: 18, presence: 14, high: 12, air: 9 }, crestDb: 12.0, rmsDb: -13.0, sibilanceMax: 0.28, reverbMax: 0.50, saturationMax: 0.26, stereoWidth: 0.56, peakDb: -1.1 } },
  vocalbright: { id: "vocalbright", label: "Vocal Bright / Streaming", description: "Preset interno para vozes em destaque com presença controlada e risco de sibilância sob vigilância.", isCustom: false, targets: { bands: { sub: 3, low: 8, lowMid: 14, mid: 33, presence: 24, high: 12, air: 6 }, crestDb: 10.5, rmsDb: -15.0, sibilanceMax: 0.27, reverbMax: 0.33, saturationMax: 0.18, stereoWidth: 0.14, peakDb: -1.4 } }
};

const state = { audioContext: null, audioBuffer: null, currentFile: null, objectUrl: null, analysis: null, presets: {}, selectedPresetId: "universal" };

const els = {
  buildStamp: document.getElementById("buildStamp"),
  fileInput: document.getElementById("audioFile"),
  analyzeBtn: document.getElementById("analyzeBtn"),
  exportBtn: document.getElementById("exportBtn"),
  resetBtn: document.getElementById("resetBtn"),
  dropzone: document.getElementById("dropzone"),
  audioPlayer: document.getElementById("audioPlayer"),
  fileStatus: document.getElementById("fileStatus"),
  fileName: document.getElementById("fileName"),
  fileDuration: document.getElementById("fileDuration"),
  fileChannels: document.getElementById("fileChannels"),
  fileRate: document.getElementById("fileRate"),
  presetSelect: document.getElementById("presetSelect"),
  presetDescription: document.getElementById("presetDescription"),
  syncPresetBtn: document.getElementById("syncPresetBtn"),
  savePresetBtn: document.getElementById("savePresetBtn"),
  deletePresetBtn: document.getElementById("deletePresetBtn"),
  issuesList: document.getElementById("issuesList"),
  effectsList: document.getElementById("effectsList"),
  summaryText: document.getElementById("summaryText"),
  recommendations: document.getElementById("recommendations"),
  bandsBars: document.getElementById("bandsBars"),
  segmentsGrid: document.getElementById("segmentsGrid"),
  waveCanvas: document.getElementById("waveCanvas"),
  spectrumCanvas: document.getElementById("spectrumCanvas"),
  tonalCanvas: document.getElementById("tonalCanvas"),
  eqDetailCanvas: document.getElementById("eqDetailCanvas"),
  effectsCanvas: document.getElementById("effectsCanvas"),
  metricPeak: document.getElementById("metricPeak"),
  metricRms: document.getElementById("metricRms"),
  metricCrest: document.getElementById("metricCrest"),
  metricSibilance: document.getElementById("metricSibilance"),
  metricReverb: document.getElementById("metricReverb"),
  metricSaturation: document.getElementById("metricSaturation"),
  metricStereo: document.getElementById("metricStereo"),
  metricHealth: document.getElementById("metricHealth"),
  customPresetName: document.getElementById("customPresetName"),
  customPresetDescription: document.getElementById("customPresetDescription"),
  targetCrest: document.getElementById("targetCrest"),
  targetRms: document.getElementById("targetRms"),
  targetSibilance: document.getElementById("targetSibilance"),
  targetReverb: document.getElementById("targetReverb"),
  targetSaturation: document.getElementById("targetSaturation"),
  targetStereo: document.getElementById("targetStereo"),
  targetPeak: document.getElementById("targetPeak"),
  band_sub: document.getElementById("band_sub"),
  band_low: document.getElementById("band_low"),
  band_lowMid: document.getElementById("band_lowMid"),
  band_mid: document.getElementById("band_mid"),
  band_presence: document.getElementById("band_presence"),
  band_high: document.getElementById("band_high"),
  band_air: document.getElementById("band_air")
};

init();

function init() {
  els.buildStamp.textContent = BUILD_STAMP;
  loadPresets();
  setupEvents();
  renderPresetOptions();
  syncEditorFromSelectedPreset();
  initCanvasPlaceholders();
}

function setupEvents() {
  els.fileInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  });
  els.dropzone.addEventListener("click", () => els.fileInput.click());
  els.dropzone.addEventListener("dragover", (event) => { event.preventDefault(); els.dropzone.classList.add("dragover"); });
  els.dropzone.addEventListener("dragleave", () => els.dropzone.classList.remove("dragover"));
  els.dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    els.dropzone.classList.remove("dragover");
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  });
  els.analyzeBtn.addEventListener("click", analyzeCurrentBuffer);
  els.exportBtn.addEventListener("click", exportReport);
  els.resetBtn.addEventListener("click", clearProjectState);
  els.presetSelect.addEventListener("change", () => {
    state.selectedPresetId = els.presetSelect.value;
    updatePresetDescription();
    if (state.analysis) renderTonalAndEffects(state.analysis, getSelectedPreset());
  });
  els.syncPresetBtn.addEventListener("click", syncEditorFromSelectedPreset);
  els.savePresetBtn.addEventListener("click", saveCustomPreset);
  els.deletePresetBtn.addEventListener("click", deleteCurrentCustomPreset);
}

function loadPresets() {
  let custom = {};
  try { custom = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (e) { custom = {}; }
  state.presets = { ...BUILTIN_PRESETS, ...custom };
}

function persistCustomPresets() {
  const custom = {};
  Object.values(state.presets).forEach((preset) => { if (preset.isCustom) custom[preset.id] = preset; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

function renderPresetOptions() {
  const items = Object.values(state.presets).sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  if (!state.presets[state.selectedPresetId]) state.selectedPresetId = "universal";
  els.presetSelect.innerHTML = items.map((preset) => `<option value="${escapeHtmlAttr(preset.id)}">${escapeHtml(preset.label)}${preset.isCustom ? " · custom" : ""}</option>`).join("");
  els.presetSelect.value = state.selectedPresetId;
  updatePresetDescription();
}

function updatePresetDescription() {
  const preset = getSelectedPreset();
  els.presetDescription.textContent = preset ? preset.description : "";
}

function getSelectedPreset() {
  return state.presets[state.selectedPresetId] || state.presets.universal;
}

function syncEditorFromSelectedPreset() {
  const preset = getSelectedPreset();
  if (!preset) return;
  els.customPresetName.value = preset.isCustom ? preset.label : `${preset.label} Custom`;
  els.customPresetDescription.value = preset.description || "";
  els.targetCrest.value = preset.targets.crestDb;
  els.targetRms.value = preset.targets.rmsDb;
  els.targetSibilance.value = preset.targets.sibilanceMax;
  els.targetReverb.value = preset.targets.reverbMax;
  els.targetSaturation.value = preset.targets.saturationMax;
  els.targetStereo.value = preset.targets.stereoWidth;
  els.targetPeak.value = preset.targets.peakDb;
  BAND_KEYS.forEach((key) => { els[`band_${key}`].value = preset.targets.bands[key]; });
}

function readEditorPresetData() {
  const preset = {
    id: `custom_${slugify(els.customPresetName.value || "preset")}`,
    label: (els.customPresetName.value || "Preset Custom").trim(),
    description: (els.customPresetDescription.value || "Preset customizado criado dentro do MasterCheck.").trim(),
    isCustom: true,
    targets: {
      crestDb: toNum(els.targetCrest.value, 10),
      rmsDb: toNum(els.targetRms.value, -12),
      sibilanceMax: clamp01(toNum(els.targetSibilance.value, 0.35)),
      reverbMax: clamp01(toNum(els.targetReverb.value, 0.45)),
      saturationMax: clamp01(toNum(els.targetSaturation.value, 0.28)),
      stereoWidth: clamp(toNum(els.targetStereo.value, 0.46), 0, 1.2),
      peakDb: toNum(els.targetPeak.value, -1),
      bands: {}
    }
  };
  BAND_KEYS.forEach((key) => { preset.targets.bands[key] = Math.max(0, toNum(els[`band_${key}`].value, 0)); });
  normalizeBandTargets(preset.targets.bands);
  return preset;
}

function saveCustomPreset() {
  const preset = readEditorPresetData();
  if (!preset.label) return alert("Defina um nome para o preset.");
  state.presets[preset.id] = preset;
  state.selectedPresetId = preset.id;
  persistCustomPresets();
  renderPresetOptions();
  alert(`Preset ${preset.label} salvo localmente.`);
}

function deleteCurrentCustomPreset() {
  const preset = getSelectedPreset();
  if (!preset?.isCustom) return alert("Selecione um preset customizado para excluir.");
  delete state.presets[preset.id];
  state.selectedPresetId = "universal";
  persistCustomPresets();
  renderPresetOptions();
  syncEditorFromSelectedPreset();
  alert("Preset customizado removido.");
}

async function initAudioContext() {
  if (!state.audioContext) state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (state.audioContext.state === "suspended") await state.audioContext.resume();
}

async function handleFile(file) {
  try {
    await initAudioContext();
    clearObjectUrl();
    state.currentFile = file;
    const buffer = await file.arrayBuffer();
    state.audioBuffer = await state.audioContext.decodeAudioData(buffer.slice(0));
    state.objectUrl = URL.createObjectURL(file);
    els.audioPlayer.src = state.objectUrl;
    els.fileName.textContent = file.name;
    els.fileDuration.textContent = formatDuration(state.audioBuffer.duration);
    els.fileChannels.textContent = `${state.audioBuffer.numberOfChannels}`;
    els.fileRate.textContent = `${state.audioBuffer.sampleRate} Hz`;
    els.fileStatus.textContent = "Arquivo pronto";
    els.fileStatus.className = "status status--ready";
    els.analyzeBtn.disabled = false;
    els.exportBtn.disabled = true;
    state.analysis = null;
    drawWaveform(state.audioBuffer);
    drawCanvasMessage(els.spectrumCanvas, "Espectro será atualizado após análise");
    drawCanvasMessage(els.tonalCanvas, "Gráfico tonal vs preset aparecerá aqui");
    drawCanvasMessage(els.effectsCanvas, "Mapa de efeitos / indícios aparecerá aqui");
  } catch (error) {
    console.error(error);
    alert("Não foi possível abrir este arquivo de áudio no navegador.");
  }
}

function clearObjectUrl() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.objectUrl = null;
}

function clearProjectState() {
  clearObjectUrl();
  state.audioBuffer = null;
  state.currentFile = null;
  state.analysis = null;
  els.audioPlayer.removeAttribute("src");
  els.audioPlayer.load();
  els.fileInput.value = "";
  els.fileName.textContent = "Nenhum arquivo carregado";
  els.fileDuration.textContent = "--:--";
  els.fileChannels.textContent = "--";
  els.fileRate.textContent = "--";
  els.fileStatus.textContent = "Aguardando arquivo";
  els.fileStatus.className = "status status--idle";
  els.analyzeBtn.disabled = true;
  els.exportBtn.disabled = true;
  els.issuesList.innerHTML = 'Carregue um arquivo e clique em <strong>Analisar agora</strong>.';
  els.effectsList.textContent = 'Aguardando análise.';
  els.summaryText.textContent = 'O relatório completo aparecerá aqui após a análise.';
  els.recommendations.innerHTML = '';
  els.bandsBars.innerHTML = '';
  els.segmentsGrid.textContent = 'Quando a análise terminar, o app compara os 3 trechos principais do áudio.';
  renderMetrics(null);
  initCanvasPlaceholders();
}

async function analyzeCurrentBuffer() {
  if (!state.audioBuffer) return;
  const preset = getSelectedPreset();
  els.fileStatus.textContent = "Analisando...";
  els.fileStatus.className = "status status--busy";
  els.analyzeBtn.disabled = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const analysis = analyzeBuffer(state.audioBuffer, preset);
    state.analysis = analysis;
    renderAnalysis(analysis, preset);
    els.exportBtn.disabled = false;
    els.fileStatus.textContent = "Análise concluída";
    els.fileStatus.className = "status status--ready";
  } catch (error) {
    console.error(error);
    alert("Falha durante a análise.");
  } finally {
    els.analyzeBtn.disabled = false;
  }
}

function analyzeBuffer(buffer, preset) {
  const left = buffer.getChannelData(0);
  const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
  const mono = mixToMono(buffer);
  const sampleRate = buffer.sampleRate;
  const basic = computeBasicMetrics(mono);
  const stereo = computeStereoMetrics(left, right);
  const spectrum = computeAverageSpectrum(mono, sampleRate, 4096, 48);
  const bandResults = BAND_META.map((band) => {
    const energy = bandEnergy(spectrum.magnitudes, sampleRate, 4096, band.min, band.max);
    return { ...band, energy, target: preset.targets.bands[band.key] || 0 };
  });
  const totalEnergy = bandResults.reduce((sum, band) => sum + band.energy, 0) || 1e-12;
  bandResults.forEach((band) => {
    band.percent = band.energy / totalEnergy * 100;
    band.delta = band.percent - band.target;
  });

  const sub = getBandPercent(bandResults, "sub");
  const low = getBandPercent(bandResults, "low");
  const lowMid = getBandPercent(bandResults, "lowMid");
  const presence = getBandPercent(bandResults, "presence");
  const high = getBandPercent(bandResults, "high");
  const air = getBandPercent(bandResults, "air");

  const sibilanceEnergy = bandEnergy(spectrum.magnitudes, sampleRate, 4096, 5000, 10000);
  const presenceEnergy = bandEnergy(spectrum.magnitudes, sampleRate, 4096, 2000, 5000);
  const upperEnergy = bandEnergy(spectrum.magnitudes, sampleRate, 4096, 7000, 12000);
  const lowEnergy = bandEnergy(spectrum.magnitudes, sampleRate, 4096, 80, 300);

  const sibilanceRatio = sibilanceEnergy / (sibilanceEnergy + presenceEnergy + 1e-12);
  const compressionScore = clamp01(1 - ((basic.crestDb - 6) / 8));
  const reverbScore = estimateReverbScore(mono, sampleRate, stereo.width, spectrum.flux);
  const saturationScore = estimateSaturationScore(mono, basic.peakLinear, basic.crestDb, upperEnergy, lowEnergy);
  const transientScore = estimateTransientScore(spectrum.flux, basic.crestDb, preset.targets.crestDb);
  const harshnessScore = estimateHarshnessScore(presence, high, air, preset.targets.bands);
  const maskingScore = estimateMaskingScore(lowMid, mid, presence, preset.targets.bands);
  const limiterStress = clamp01(((basic.peakDb - preset.targets.peakDb) / 1.5 + compressionScore) / 2);
  const clippingRisk = clamp01((basic.clippedFraction * 20) + (basic.peakDb > -0.15 ? 0.35 : 0));
  const eqDeviation = clamp01(bandResults.reduce((sum, band) => sum + Math.abs(band.delta), 0) / 36);

  const effectScores = {
    equalizacao: eqDeviation,
    compressao: compressionScore,
    transient: transientScore,
    masking: maskingScore,
    harshness: harshnessScore,
    deEsser: clamp01((sibilanceRatio - preset.targets.sibilanceMax + 0.08) / 0.22),
    reverberacao: reverbScore,
    saturacao: saturationScore,
    stereo: clamp01(Math.abs(stereo.width - preset.targets.stereoWidth) / 0.45),
    limiter: limiterStress,
    clipping: clippingRisk
  };

  const issues = [];
  if (lowMid - preset.targets.bands.lowMid > 4 || low - preset.targets.bands.low > 5) issues.push(issue("high","Acúmulo de graves / médios-graves","Há peso extra na região de corpo e low-mid, com chance de embolo.","Teste cortes suaves entre 180 e 350 Hz e revise competição entre baixo, kick e instrumentos de corpo."));
  if (presence - preset.targets.bands.presence > 4 || high - preset.targets.bands.high > 4) issues.push(issue("medium","Presença / brilho acima do alvo","A curva tonal mostra mais energia em presença ou brilho do que o preset interno pede.","Avalie EQ dinâmica em 3–8 kHz para suavizar aspereza sem apagar definição."));
  if (air - preset.targets.bands.air > 3) issues.push(issue("low","Ar destacado","A região acima de 10 kHz está aberta além do target.","Se a intenção for suavidade, reduza shelf alto ou verifique exciters."));
  if (sibilanceRatio > preset.targets.sibilanceMax + 0.05) issues.push(issue("medium","Possível necessidade de de-esser","A energia entre 5 e 10 kHz sugere sibilância mais agressiva do que a referência.","Teste de-esser entre 6 e 8 kHz, principalmente se houver vocal ou elementos com 's' fortes."));
  if (basic.crestDb < preset.targets.crestDb - 1.5) issues.push(issue("high","Compressão / limitação forte","O crest factor ficou abaixo da meta do preset, indicando dinâmica reduzida.","Se quiser mais punch, alivie limiter/compressor ou use ataque mais lento."));
  if (reverbScore > preset.targets.reverbMax + 0.08) issues.push(issue("medium","Reverberação / wash acima do alvo","A heurística temporal aponta cauda e sustentação acima do preset interno.","Considere reduzir tempo, pré-delay ou low-cut do reverb para recuperar definição."));
  if (saturationScore > preset.targets.saturationMax + 0.08) issues.push(issue("medium","Saturação / stress harmônico","Há sinais de flat-top, energia densa e pouco respiro dinâmico.","Revise saturadores, exciters e limiter final para evitar dureza."));
  if (harshnessScore > 0.55) issues.push(issue("medium","Harshness em presença/agudos","A combinação entre presença, brilho e ar sugere aspereza perceptível em volumes mais altos.","Considere EQ dinâmica entre 2,5 e 8 kHz e revise exciters ou compressores rápidos nessa área."));
  if (maskingScore > 0.55) issues.push(issue("medium","Possível mascaramento tonal","A distribuição entre low-mid, médios e presença sugere competição de elementos e menor definição global.","Abra espaço com cortes complementares e revise camadas que disputam 250 Hz a 2 kHz."));
  if (transientScore > 0.60) issues.push(issue("low","Punch / transientes abaixo do ideal","O comportamento temporal indica ataque mais arredondado do que a meta do preset.","Teste reduzir release excessivo, aliviar limitação e preservar mais transiente em kick, caixa e voz."));
  if (basic.peakDb > preset.targets.peakDb + 0.4) issues.push(issue("medium","Headroom apertado","O pico máximo está acima da meta do preset.","Abra margem no limiter ou reduza ganho final para evitar clipping em conversões."));
  if (Math.abs(stereo.width - preset.targets.stereoWidth) > 0.20) issues.push(issue("low","Imagem estéreo fora do target","A largura estéreo difere do comportamento esperado para o preset escolhido.","Revise wideners, reverbs estéreo e compatibilidade mono."));
  if (issues.length === 0) issues.push(issue("low","Perfil estável para o preset","O áudio ficou relativamente próximo da referência interna selecionada.","Faça apenas refinamentos finos conforme a intenção artística."));

  const recommendations = issues.map((entry, index) => ({ priority: index + 1, text: entry.action }));
  const summary = buildSummary({ preset, basic, stereo, sibilanceRatio, reverbScore, saturationScore, issues, bandResults });
  const segments = buildSegments(buffer, preset);
  const health = scoreHealth(issues);

  return {
    presetLabel: preset.label,
    basic,
    stereo,
    sibilanceRatio,
    reverbScore,
    saturationScore,
    bandResults,
    spectrum,
    effectScores,
    issues,
    recommendations,
    summary,
    segments,
    health
  };
}

function renderAnalysis(analysis, preset) {
  renderMetrics(analysis);
  renderIssues(analysis.issues);
  renderEffectsList(analysis.effectScores);
  els.summaryText.textContent = analysis.summary;
  renderRecommendations(analysis.recommendations);
  renderBands(analysis.bandResults);
  renderSegments(analysis.segments);
  drawWaveform(state.audioBuffer);
  drawSpectrum(analysis.spectrum);
  renderTonalAndEffects(analysis, preset);
}

function renderTonalAndEffects(analysis, preset) {
  drawTonalChart(analysis.bandResults, preset.targets.bands);
  drawEqDetailChart(analysis.spectrum, analysis.bandResults, preset.targets.bands);
  drawEffectsChart(analysis.effectScores);
}

function renderMetrics(analysis) {
  if (!analysis) {
    els.metricPeak.textContent = "-- dBFS";
    els.metricRms.textContent = "-- dBFS";
    els.metricCrest.textContent = "-- dB";
    els.metricSibilance.textContent = "--";
    els.metricReverb.textContent = "--";
    els.metricSaturation.textContent = "--";
    els.metricStereo.textContent = "--";
    els.metricHealth.textContent = "Aguardando";
    return;
  }
  els.metricPeak.textContent = `${analysis.basic.peakDb.toFixed(1)} dBFS`;
  els.metricRms.textContent = `${analysis.basic.rmsDb.toFixed(1)} dBFS`;
  els.metricCrest.textContent = `${analysis.basic.crestDb.toFixed(1)} dB`;
  els.metricSibilance.textContent = scoreLabel(analysis.sibilanceRatio, [0.28, 0.38]);
  els.metricReverb.textContent = scoreLabel(analysis.reverbScore, [0.34, 0.54]);
  els.metricSaturation.textContent = scoreLabel(analysis.saturationScore, [0.22, 0.42]);
  els.metricStereo.textContent = `${analysis.stereo.width.toFixed(2)} · corr ${analysis.stereo.correlation.toFixed(2)}`;
  els.metricHealth.textContent = analysis.health;
}

function renderIssues(issues) {
  els.issuesList.innerHTML = issues.map((entry) => `
    <article class="issue-card">
      <div class="issue-top">
        <strong>${escapeHtml(entry.title)}</strong>
        <span class="tag ${entry.severity}">${severityLabel(entry.severity)}</span>
      </div>
      <div>${escapeHtml(entry.detail)}</div>
      <div style="margin-top:10px"><strong>Ação:</strong> ${escapeHtml(entry.action)}</div>
    </article>
  `).join("");
}

function renderEffectsList(effectScores) {
  const items = Object.entries(effectScores).map(([key, value]) => ({ key, value })).sort((a,b) => b.value - a.value);
  els.effectsList.innerHTML = items.map((item) => {
    const sev = item.value > 0.66 ? "high" : item.value > 0.4 ? "medium" : "low";
    return `
      <div class="effect-row">
        <div>
          <strong>${effectLabel(item.key)}</strong>
          <div>${effectDescription(item.key, item.value)}</div>
        </div>
        <span class="effect-pill ${sev}">${Math.round(item.value * 100)}%</span>
      </div>
    `;
  }).join("");
}

function renderRecommendations(recommendations) {
  els.recommendations.innerHTML = recommendations.map((entry) => `
    <article class="rec-card"><strong>${entry.priority}. </strong>${escapeHtml(entry.text)}</article>
  `).join("");
}

function renderBands(bands) {
  els.bandsBars.innerHTML = bands.map((band) => {
    const deltaClass = Math.abs(band.delta) < 2 ? "good" : Math.abs(band.delta) < 4 ? "warn" : "bad";
    const sign = band.delta >= 0 ? "+" : "";
    return `
      <div class="band-row">
        <strong>${escapeHtml(band.label)}</strong>
        <div class="band-track"><div class="band-fill" style="width:${Math.min(100, band.percent)}%"></div></div>
        <div class="band-target">ref ${band.target.toFixed(1)}%</div>
        <div class="band-delta ${deltaClass}">${sign}${band.delta.toFixed(1)}%</div>
      </div>
    `;
  }).join("");
}

function renderSegments(segments) {
  els.segmentsGrid.innerHTML = segments.map((segment) => `
    <article class="segment-card">
      <strong>${escapeHtml(segment.label)}</strong>
      <div class="segment-grid">
        <div><span class="section-eyebrow">Peak</span>${segment.peakDb.toFixed(1)} dBFS</div>
        <div><span class="section-eyebrow">RMS</span>${segment.rmsDb.toFixed(1)} dBFS</div>
        <div><span class="section-eyebrow">Crest</span>${segment.crestDb.toFixed(1)} dB</div>
        <div><span class="section-eyebrow">Ênfase</span>${escapeHtml(segment.emphasis)}</div>
      </div>
    </article>
  `).join("");
}

function exportReport() {
  if (!state.analysis || !state.currentFile) return;
  const a = state.analysis;
  const lines = [
    `MasterCheck`,
    `Build: ${BUILD_STAMP}`,
    `Arquivo: ${state.currentFile.name}`,
    `Preset interno: ${a.presetLabel}`,
    ``,
    `Resumo`,
    a.summary,
    ``,
    `Métricas`,
    `Peak: ${a.basic.peakDb.toFixed(2)} dBFS`,
    `RMS: ${a.basic.rmsDb.toFixed(2)} dBFS`,
    `Crest Factor: ${a.basic.crestDb.toFixed(2)} dB`,
    `Sibilância: ${a.sibilanceRatio.toFixed(3)}`,
    `Reverberação: ${a.reverbScore.toFixed(3)}`,
    `Saturação: ${a.saturationScore.toFixed(3)}`,
    `Transient/Punch: ${(a.effectScores.transient || 0).toFixed(3)}`,
    `Masking: ${(a.effectScores.masking || 0).toFixed(3)}`,
    `Harshness: ${(a.effectScores.harshness || 0).toFixed(3)}`,
    `Stereo width: ${a.stereo.width.toFixed(3)}`,
    `Correlação: ${a.stereo.correlation.toFixed(3)}`,
    ``,
    `Bandas vs preset`,
    ...a.bandResults.map((band) => `${band.label}: ${band.percent.toFixed(2)}% (ref ${band.target.toFixed(2)}%, delta ${band.delta.toFixed(2)}%)`),
    ``,
    `Problemas detectados`,
    ...a.issues.map((item, index) => `${index + 1}. [${severityLabel(item.severity)}] ${item.title} - ${item.detail} | Ação: ${item.action}`),
    ``,
    `Trechos`,
    ...a.segments.map((segment) => `${segment.label}: Peak ${segment.peakDb.toFixed(2)} dBFS | RMS ${segment.rmsDb.toFixed(2)} dBFS | Crest ${segment.crestDb.toFixed(2)} dB | Ênfase ${segment.emphasis}`)
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${stripExt(state.currentFile.name)}_MasterCheck_report.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function computeBasicMetrics(data) {
  let peak = 0;
  let sumSquares = 0;
  let clipped = 0;
  for (let i = 0; i < data.length; i++) {
    const abs = Math.abs(data[i]);
    if (abs > peak) peak = abs;
    sumSquares += data[i] * data[i];
    if (abs >= 0.999) clipped++;
  }
  const rms = Math.sqrt(sumSquares / data.length || 0);
  const peakDb = linearToDb(peak || 1e-8);
  const rmsDb = linearToDb(rms || 1e-8);
  return {
    peakLinear: peak,
    peakDb,
    rmsDb,
    crestDb: peakDb - rmsDb,
    clippedFraction: clipped / Math.max(1, data.length)
  };
}

function computeStereoMetrics(left, right) {
  const len = Math.min(left.length, right.length);
  let sumL = 0, sumR = 0, sumLL = 0, sumRR = 0, sumLR = 0, midEnergy = 0, sideEnergy = 0;
  const step = Math.max(1, Math.floor(len / 240000));
  let count = 0;
  for (let i = 0; i < len; i += step) {
    const l = left[i], r = right[i];
    sumL += l; sumR += r; sumLL += l*l; sumRR += r*r; sumLR += l*r;
    const mid = (l + r) * 0.5;
    const side = (l - r) * 0.5;
    midEnergy += mid * mid;
    sideEnergy += side * side;
    count++;
  }
  const meanL = sumL / count, meanR = sumR / count;
  const cov = sumLR / count - meanL * meanR;
  const varL = sumLL / count - meanL * meanL;
  const varR = sumRR / count - meanR * meanR;
  const correlation = cov / Math.sqrt(Math.max(1e-12, varL * varR));
  const width = sideEnergy / Math.max(1e-12, midEnergy);
  return { correlation: clamp(correlation, -1, 1), width: clamp(width, 0, 1.2) };
}

function computeAverageSpectrum(data, sampleRate, fftSize = 4096, frameCount = 48) {
  const frameStep = Math.max(fftSize, Math.floor((data.length - fftSize) / Math.max(1, frameCount - 1)));
  let frames = [];
  if (data.length <= fftSize) {
    const padded = new Float32Array(fftSize);
    padded.set(data.subarray(0, Math.min(data.length, fftSize)));
    frames = [padded];
  } else {
    for (let i = 0; i <= data.length - fftSize && frames.length < frameCount; i += frameStep) {
      frames.push(data.subarray(i, i + fftSize));
    }
  }
  const accum = new Float32Array(fftSize / 2);
  let flux = 0;
  let prev = null;
  frames.forEach((frame) => {
    const win = applyHannWindow(frame);
    const { magnitudes } = fftReal(win);
    for (let i = 0; i < accum.length; i++) accum[i] += magnitudes[i];
    const norm = normalizeArray(magnitudes);
    if (prev) {
      let frameFlux = 0;
      for (let i = 0; i < norm.length; i++) frameFlux += Math.max(0, norm[i] - prev[i]);
      flux += frameFlux / norm.length;
    }
    prev = norm;
  });
  for (let i = 0; i < accum.length; i++) accum[i] /= frames.length || 1;
  return { magnitudes: accum, sampleRate, fftSize, flux: flux / Math.max(1, frames.length - 1) };
}

function estimateReverbScore(data, sampleRate, stereoWidth, flux) {
  const envSize = 1024;
  const hop = 512;
  const env = [];
  let max = 0;
  for (let i = 0; i + envSize < data.length; i += hop) {
    let sum = 0;
    for (let j = 0; j < envSize; j++) sum += Math.abs(data[i + j]);
    const v = sum / envSize;
    env.push(v);
    if (v > max) max = v;
  }
  if (!env.length) return 0;
  const threshold = max * 0.30;
  const sustainedRatio = env.filter((v) => v >= threshold).length / env.length;
  const smoothness = 1 - clamp(flux / 0.06, 0, 1);
  return clamp01((sustainedRatio * 0.55) + (smoothness * 0.30) + (stereoWidth * 0.15));
}

function estimateSaturationScore(data, peak, crestDb, upperEnergy, lowEnergy) {
  const threshold = Math.max(0.65, peak * 0.94);
  let flat = 0;
  let clipped = 0;
  const step = Math.max(1, Math.floor(data.length / 300000));
  let count = 0;
  for (let i = 0; i < data.length; i += step) {
    const abs = Math.abs(data[i]);
    if (abs >= threshold) flat++;
    if (abs >= 0.995) clipped++;
    count++;
  }
  const flatFrac = flat / Math.max(1, count);
  const clipFrac = clipped / Math.max(1, count);
  const hfDensity = upperEnergy / Math.max(1e-12, upperEnergy + lowEnergy);
  const crestStress = clamp01((8 - crestDb) / 6);
  return clamp01((flatFrac * 5) + (clipFrac * 12) + (hfDensity * 0.25) + (crestStress * 0.35));
}

function buildSegments(buffer, preset) {
  const mono = mixToMono(buffer);
  const total = mono.length;
  const thirds = [
    { label: "Início", start: 0, end: Math.floor(total / 3) },
    { label: "Meio", start: Math.floor(total / 3), end: Math.floor(2 * total / 3) },
    { label: "Final", start: Math.floor(2 * total / 3), end: total }
  ];
  return thirds.map((part) => {
    const data = mono.subarray(part.start, part.end);
    const basic = computeBasicMetrics(data);
    const spec = computeAverageSpectrum(data, buffer.sampleRate, 2048, 18);
    const segmentsBands = BAND_META.map((band) => ({ key: band.key, energy: bandEnergy(spec.magnitudes, buffer.sampleRate, 2048, band.min, band.max) }));
    const totalEnergy = segmentsBands.reduce((s, b) => s + b.energy, 0) || 1e-12;
    segmentsBands.forEach((b) => { b.percent = b.energy / totalEnergy * 100; });
    const sorted = segmentsBands.sort((a,b) => b.percent - a.percent);
    return { label: part.label, peakDb: basic.peakDb, rmsDb: basic.rmsDb, crestDb: basic.crestDb, emphasis: emphasisLabel(sorted[0]?.key || "mid", preset) };
  });
}

function buildSummary({ preset, basic, stereo, sibilanceRatio, reverbScore, saturationScore, issues, bandResults }) {
  const tonal = bandResults.sort((a,b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0,2).map((band) => `${band.label.toLowerCase()} ${band.delta >= 0 ? "acima" : "abaixo"} do target`).join(", ");
  const dynamics = basic.crestDb < preset.targets.crestDb - 1.5 ? "mais comprimida do que o alvo" : basic.crestDb > preset.targets.crestDb + 1.5 ? "mais aberta/dinâmica do que o alvo" : "próxima do alvo dinâmico";
  const sText = sibilanceRatio > preset.targets.sibilanceMax + 0.05 ? "com possível necessidade de de-esser" : "sem sinal forte de de-esser";
  const rText = reverbScore > preset.targets.reverbMax + 0.08 ? "há wash/reverberação acima da meta" : "a ambiência está relativamente controlada";
  const satText = saturationScore > preset.targets.saturationMax + 0.08 ? "a saturação parece alta" : "a saturação parece contida";
  const stereoText = stereo.width > preset.targets.stereoWidth + 0.2 ? "o estéreo está mais aberto que o preset" : stereo.width < preset.targets.stereoWidth - 0.2 ? "o estéreo está mais fechado que o preset" : "o estéreo está perto da referência";
  return `Usando o preset interno ${preset.label}, o MasterCheck comparou o áudio com a biblioteca interna de referências e encontrou ${tonal || "bandas próximas da referência"}. A dinâmica ficou ${dynamics}, ${sText}, ${rText} e ${satText}. Na imagem estéreo, ${stereoText}. O objetivo é reduzir a dependência de faixa A/B externa e acelerar a leitura do áudio com presets internos. Priorize primeiro: ${issues.slice(0, 2).map((item) => item.title.toLowerCase()).join(" e ")}.`;
}

function scoreHealth(issues) {
  const value = issues.reduce((sum, item) => sum + (item.severity === "high" ? 3 : item.severity === "medium" ? 2 : 1), 0);
  if (value <= 4) return "Boa";
  if (value <= 7) return "Atenção";
  return "Crítica";
}

function estimateTransientScore(flux, crestDb, targetCrest) {
  const lowFlux = 1 - clamp01(flux / 0.045);
  const crestPenalty = clamp01((targetCrest - crestDb) / 4);
  return clamp01((lowFlux * 0.55) + (crestPenalty * 0.45));
}
function estimateHarshnessScore(presence, high, air, targetBands) {
  const p = Math.max(0, presence - (targetBands.presence || 0));
  const h = Math.max(0, high - (targetBands.high || 0));
  const a = Math.max(0, air - (targetBands.air || 0));
  return clamp01((p * 0.05) + (h * 0.08) + (a * 0.06));
}
function estimateMaskingScore(lowMid, mid, presence, targetBands) {
  const lm = Math.max(0, lowMid - (targetBands.lowMid || 0));
  const mids = Math.max(0, mid - (targetBands.mid || 0));
  const lostPresence = Math.max(0, (targetBands.presence || 0) - presence);
  return clamp01((lm * 0.06) + (mids * 0.03) + (lostPresence * 0.04));
}
function issue(severity, title, detail, action) { return { severity, title, detail, action }; }
function getBandPercent(bands, key) { return bands.find((band) => band.key === key)?.percent || 0; }
function severityLabel(severity) { return severity === "high" ? "Alta" : severity === "medium" ? "Média" : "Baixa"; }
function emphasisLabel(key) { return ({ sub: "subgrave", low: "grave", lowMid: "médio-grave", mid: "médios", presence: "presença", high: "brilho", air: "ar" })[key] || "equilíbrio"; }
function effectLabel(key) { return ({ equalizacao: "Equalização", compressao: "Compressão / Limiter", transient: "Transient / Punch", masking: "Masking", harshness: "Harshness", deEsser: "De-esser", reverberacao: "Reverberação", saturacao: "Saturação", stereo: "Imagem estéreo", limiter: "Stress de limiter", clipping: "Risco de clipping" })[key] || key; }
function effectDescription(key, value) {
  const level = value > 0.66 ? "alto" : value > 0.4 ? "moderado" : "baixo";
  const descriptions = {
    equalizacao: `desvio ${level} frente ao preset interno`,
    compressao: `pressão dinâmica ${level}`,
    transient: `perda ${level} de punch/transiente`,
    masking: `competição tonal ${level} entre faixas`,
    harshness: `aspereza ${level} em presença/agudos`,
    deEsser: `necessidade ${level} de controle de sibilância`,
    reverberacao: `indício ${level} de wash/cauda`,
    saturacao: `indício ${level} de stress harmônico`,
    stereo: `desvio ${level} do target estéreo`,
    limiter: `pressão ${level} no estágio final`,
    clipping: `risco ${level} de clipping`
  };
  return descriptions[key] || level;
}
function scoreLabel(value, thresholds) { return value > thresholds[1] ? "Alto" : value > thresholds[0] ? "Médio" : "Baixo"; }
function normalizeBandTargets(targets) {
  const sum = BAND_KEYS.reduce((acc, key) => acc + (targets[key] || 0), 0) || 1;
  BAND_KEYS.forEach((key) => { targets[key] = (targets[key] || 0) / sum * 100; });
}
function toNum(value, fallback) { const n = parseFloat(value); return Number.isFinite(n) ? n : fallback; }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function clamp01(value) { return clamp(value, 0, 1); }
function linearToDb(value) { return 20 * Math.log10(Math.max(value, 1e-8)); }
function mixToMono(buffer) {
  const channels = buffer.numberOfChannels;
  const length = buffer.length;
  const mono = new Float32Array(length);
  for (let ch = 0; ch < channels; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) mono[i] += data[i] / channels;
  }
  return mono;
}
function bandEnergy(magnitudes, sampleRate, fftSize, minHz, maxHz) {
  const nyquist = sampleRate / 2;
  const start = Math.max(1, Math.floor(minHz / nyquist * magnitudes.length));
  const end = Math.min(magnitudes.length - 1, Math.ceil(maxHz / nyquist * magnitudes.length));
  let sum = 0;
  for (let i = start; i <= end; i++) sum += magnitudes[i] * magnitudes[i];
  return sum;
}
function normalizeArray(array) {
  const max = Math.max(...array, 1e-12);
  const out = new Float32Array(array.length);
  for (let i = 0; i < array.length; i++) out[i] = array[i] / max;
  return out;
}
function applyHannWindow(data) {
  const out = new Float32Array(data.length);
  const last = data.length - 1;
  for (let i = 0; i < data.length; i++) out[i] = data[i] * (0.5 * (1 - Math.cos((2 * Math.PI * i) / last)));
  return out;
}
function fftReal(input) {
  const n = input.length;
  const re = new Float64Array(n);
  const im = new Float64Array(n);
  for (let i = 0; i < n; i++) re[i] = input[i];
  let j = 0;
  for (let i = 1; i < n; i++) {
    let bit = n >> 1;
    while (j & bit) { j ^= bit; bit >>= 1; }
    j ^= bit;
    if (i < j) { const tr = re[i]; re[i] = re[j]; re[j] = tr; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len;
    const wlenCos = Math.cos(ang);
    const wlenSin = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let wCos = 1, wSin = 0;
      for (let k = 0; k < len / 2; k++) {
        const uRe = re[i + k], uIm = im[i + k];
        const vRe = re[i + k + len / 2] * wCos - im[i + k + len / 2] * wSin;
        const vIm = re[i + k + len / 2] * wSin + im[i + k + len / 2] * wCos;
        re[i + k] = uRe + vRe; im[i + k] = uIm + vIm;
        re[i + k + len / 2] = uRe - vRe; im[i + k + len / 2] = uIm - vIm;
        const nextCos = wCos * wlenCos - wSin * wlenSin;
        wSin = wCos * wlenSin + wSin * wlenCos;
        wCos = nextCos;
      }
    }
  }
  const mags = new Float32Array(n / 2);
  for (let i = 0; i < n / 2; i++) mags[i] = Math.sqrt(re[i] * re[i] + im[i] * im[i]);
  return { magnitudes: mags };
}
function formatDuration(seconds) { const m = Math.floor(seconds / 60); const s = Math.floor(seconds % 60); return `${m}:${String(s).padStart(2, "0")}`; }
function stripExt(name) { return name.replace(/\.[^.]+$/, ""); }
function slugify(text) { return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "preset"; }
function escapeHtml(text) { return String(text).replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
function escapeHtmlAttr(text) { return escapeHtml(text); }

function initCanvasPlaceholders() {
  drawCanvasMessage(els.waveCanvas, "Waveform");
  drawCanvasMessage(els.spectrumCanvas, "Espectro");
  drawCanvasMessage(els.tonalCanvas, "Curva tonal vs preset");
  drawCanvasMessage(els.eqDetailCanvas, "Mapa de frequência vs referência");
  drawCanvasMessage(els.effectsCanvas, "Mapa de efeitos / indícios");
}

function setupCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(300, Math.floor(rect.width * ratio));
  const height = Math.max(180, Math.floor(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
  return { ctx, width, height, ratio };
}

function drawCanvasMessage(canvas, title) {
  const { ctx, width, height } = setupCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "rgba(122,116,255,0.18)");
  grad.addColorStop(1, "rgba(102,214,255,0.06)");
  ctx.fillStyle = "rgba(2,8,15,0.8)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.strokeRect(14, 14, width - 28, height - 28);
  ctx.fillStyle = "rgba(236,244,255,0.92)";
  ctx.font = `${Math.max(18, height * 0.06)}px Inter, sans-serif`;
  ctx.fillText(title, 26, 42);
  ctx.fillStyle = "rgba(155,177,207,0.92)";
  ctx.font = `${Math.max(12, height * 0.038)}px Inter, sans-serif`;
  ctx.fillText("Os gráficos são atualizados após a análise do áudio.", 26, 70);
}

function drawWaveform(buffer) {
  const { ctx, width, height } = setupCanvas(els.waveCanvas);
  const mono = mixToMono(buffer);
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "rgba(2,8,15,0.9)";
  ctx.fillRect(0,0,width,height);
  const grad = ctx.createLinearGradient(0,0,width,0);
  grad.addColorStop(0,"rgba(122,116,255,0.75)");
  grad.addColorStop(1,"rgba(102,214,255,0.92)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const step = Math.ceil(mono.length / width);
  const midY = height / 2;
  for (let x = 0; x < width; x++) {
    let min = 1, max = -1;
    const start = x * step;
    for (let i = 0; i < step && start + i < mono.length; i++) {
      const v = mono[start + i];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    ctx.moveTo(x, midY + min * midY * 0.9);
    ctx.lineTo(x, midY + max * midY * 0.9);
  }
  ctx.stroke();
}

function drawSpectrum(spectrum) {
  const { ctx, width, height } = setupCanvas(els.spectrumCanvas);
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "rgba(2,8,15,0.9)";
  ctx.fillRect(0,0,width,height);
  const mags = spectrum.magnitudes;
  const smoothed = [];
  const bins = 180;
  for (let i = 0; i < bins; i++) {
    const start = Math.floor((i / bins) * mags.length);
    const end = Math.floor(((i + 1) / bins) * mags.length);
    let sum = 0;
    for (let j = start; j < end; j++) sum += mags[j];
    smoothed.push(linearToDb(sum / Math.max(1, end - start) + 1e-8));
  }
  const minDb = -90, maxDb = Math.max(-10, ...smoothed);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 5; i++) { const y = 20 + i * (height - 40) / 4; ctx.beginPath(); ctx.moveTo(14, y); ctx.lineTo(width - 14, y); ctx.stroke(); }
  const grad = ctx.createLinearGradient(0,0,width,0);
  grad.addColorStop(0,"rgba(122,116,255,0.95)");
  grad.addColorStop(1,"rgba(102,214,255,0.95)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  smoothed.forEach((value, index) => {
    const x = 14 + index / (smoothed.length - 1) * (width - 28);
    const y = height - 22 - ((value - minDb) / (maxDb - minDb || 1)) * (height - 44);
    if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function drawTonalChart(bands, targetBands) {
  const { ctx, width, height } = setupCanvas(els.tonalCanvas);
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "rgba(2,8,15,0.92)";
  ctx.fillRect(0,0,width,height);
  const margin = { left: 50, right: 20, top: 22, bottom: 48 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const maxY = Math.max(32, ...bands.map((b) => Math.max(b.percent, b.target)));
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.fillStyle = "rgba(155,177,207,0.92)";
  ctx.font = "12px Inter, sans-serif";
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + i * innerH / 4;
    ctx.beginPath(); ctx.moveTo(margin.left, y); ctx.lineTo(width - margin.right, y); ctx.stroke();
    const val = (maxY - i * maxY / 4).toFixed(0) + "%";
    ctx.fillText(val, 10, y + 4);
  }
  const pointsMeasured = [];
  const pointsTarget = [];
  bands.forEach((band, index) => {
    const x = margin.left + index / (bands.length - 1) * innerW;
    const yM = margin.top + innerH - (band.percent / maxY) * innerH;
    const yT = margin.top + innerH - ((targetBands[band.key] || 0) / maxY) * innerH;
    pointsMeasured.push([x, yM]);
    pointsTarget.push([x, yT]);
    ctx.fillStyle = "rgba(155,177,207,0.92)";
    ctx.fillText(band.label, x - 22, height - 18);
  });
  drawPolyline(ctx, pointsTarget, "rgba(255,216,116,0.95)", 2, [6,6]);
  drawPolyline(ctx, pointsMeasured, "rgba(102,214,255,0.98)", 3);
  pointsMeasured.forEach(([x,y]) => { ctx.fillStyle = "rgba(102,214,255,0.98)"; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill(); });
  pointsTarget.forEach(([x,y]) => { ctx.fillStyle = "rgba(255,216,116,0.98)"; ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2); ctx.fill(); });
}


function drawEqDetailChart(spectrum, bands, targetBands) {
  const { ctx, width, height } = setupCanvas(els.eqDetailCanvas);
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "rgba(2,8,15,0.92)";
  ctx.fillRect(0,0,width,height);
  const margin = { left: 54, right: 18, top: 20, bottom: 40 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const mags = spectrum.magnitudes;
  const bins = 180;
  const pointsMeasured = [];
  const valuesMeasured = [];
  const pointsTarget = [];
  const freqs = [20,40,60,100,160,250,400,630,1000,1600,2500,4000,6300,10000,16000,20000];
  for (let i = 0; i < bins; i++) {
    const freq = 20 * Math.pow(1000, i / (bins - 1));
    const idx = Math.max(1, Math.min(mags.length - 1, Math.floor((freq / (spectrum.sampleRate / 2)) * mags.length)));
    valuesMeasured.push(linearToDb(mags[idx] + 1e-8));
  }
  const minDb = Math.min(...valuesMeasured);
  const maxDb = Math.max(...valuesMeasured);
  const normMeasured = valuesMeasured.map(v => ((v - minDb) / Math.max(1e-6, maxDb - minDb)) * 100);
  function targetAtFreq(freq) {
    const key = BAND_META.find(b => freq >= b.min && freq < b.max)?.key || 'air';
    return targetBands[key] || 0;
  }
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.fillStyle = "rgba(155,177,207,0.92)";
  ctx.font = "12px Inter, sans-serif";
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + (innerH * i / 4);
    ctx.beginPath(); ctx.moveTo(margin.left, y); ctx.lineTo(width - margin.right, y); ctx.stroke();
  }
  freqs.forEach(freq => {
    const x = margin.left + (Math.log10(freq) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20)) * innerW;
    ctx.beginPath(); ctx.moveTo(x, margin.top); ctx.lineTo(x, margin.top + innerH); ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.stroke();
    ctx.fillStyle = "rgba(155,177,207,0.92)";
    ctx.fillText(freq >= 1000 ? `${(freq/1000).toFixed(freq===1000?0:1)}k` : `${freq}`, x - 10, height - 12);
  });
  for (let i = 0; i < bins; i++) {
    const freq = 20 * Math.pow(1000, i / (bins - 1));
    const x = margin.left + (Math.log10(freq) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20)) * innerW;
    const yM = margin.top + innerH - (normMeasured[i] / 100) * innerH;
    const yT = margin.top + innerH - (targetAtFreq(freq) / 35) * innerH;
    pointsMeasured.push([x, yM]);
    pointsTarget.push([x, yT]);
  }
  drawPolyline(ctx, pointsTarget, "rgba(255,216,116,0.95)", 2, [8,5]);
  drawPolyline(ctx, pointsMeasured, "rgba(102,214,255,0.98)", 2.5);
}

function drawEffectsChart(effectScores) {
  const { ctx, width, height } = setupCanvas(els.effectsCanvas);
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "rgba(2,8,15,0.92)";
  ctx.fillRect(0,0,width,height);
  const entries = Object.entries(effectScores);
  const margin = { left: 36, right: 20, top: 20, bottom: 52 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const barW = innerW / entries.length * 0.6;
  entries.forEach(([key, value], index) => {
    const x = margin.left + index * (innerW / entries.length) + ((innerW / entries.length) - barW) / 2;
    const h = value * innerH;
    const y = margin.top + innerH - h;
    const grad = ctx.createLinearGradient(0, y, 0, y + h);
    grad.addColorStop(0, value > 0.66 ? "rgba(255,126,152,0.95)" : value > 0.4 ? "rgba(255,216,116,0.95)" : "rgba(102,244,184,0.95)");
    grad.addColorStop(1, "rgba(102,214,255,0.75)");
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, barW, h, 12, true, false);
    ctx.fillStyle = "rgba(236,244,255,0.92)";
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText(`${Math.round(value * 100)}%`, x, y - 8);
    ctx.fillStyle = "rgba(155,177,207,0.92)";
    ctx.save();
    ctx.translate(x + barW / 2, height - 18);
    ctx.rotate(-0.45);
    ctx.fillText(effectLabel(key), -34, 0);
    ctx.restore();
  });
}

function drawPolyline(ctx, points, color, width, dash = []) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  points.forEach(([x, y], index) => { if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
  ctx.stroke();
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

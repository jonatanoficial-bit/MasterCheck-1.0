# MasterCheck - Build 2026-03-21 15-21-00

Upgrade completo da fase 2 do projeto, agora com identidade visual oficial aplicada, logo integrado ao site e ícone do aplicativo configurado.

## O que esta build já faz
- importa áudio local (WAV / MP3, conforme suporte do navegador)
- exibe player embutido
- mostra waveform do arquivo
- estima espectro por FFT local
- calcula métricas base:
  - Peak
  - RMS
  - Crest Factor
  - Sibilância estimada
  - Estado estéreo básico
- aplica regras iniciais de diagnóstico para:
  - médios-graves embolados
  - aspereza em agudos
  - sibilância
  - dinâmica reduzida
  - headroom apertado
  - subgrave em evidência
  - atenção em compatibilidade mono
- gera resumo textual automático
- exibe build visível dentro da interface
- usa a logo MasterCheck em destaque
- configura a imagem como ícone do app/site

## Estrutura
- `index.html` → interface principal
- `style.css` → identidade visual e layout
- `app.js` → lógica de upload, visualização e análise
- `assets/mastercheck-logo.png` → logo oficial aplicada ao projeto

## Como rodar
1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Carregue um arquivo de áudio.
4. Clique em **Analisar agora**.

## Próxima fase sugerida
- exportação de relatório
- leitura por janelas temporais
- refinamento de classificação tonal
- comparação com referência
- empacotar como app desktop no futuro

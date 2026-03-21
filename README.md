# Mix Analyzer - Build 2026-03-21 14:56:42

Primeira build do projeto, criada como MVP visual e funcional para análise local de áudio no navegador.

## O que esta build já faz
- Importa áudio local (WAV / MP3, conforme suporte do navegador)
- Exibe player embutido
- Mostra waveform do arquivo
- Estima espectro por FFT local
- Calcula métricas base:
  - Peak
  - RMS
  - Crest Factor
  - Sibilância estimada
  - Estado estéreo básico
- Aplica regras iniciais de diagnóstico para:
  - médios-graves embolados
  - aspereza em agudos
  - sibilância
  - dinâmica reduzida
  - headroom apertado
  - subgrave em evidência
  - atenção em compatibilidade mono
- Gera resumo textual automático
- Mostra build visível dentro da interface

## Como rodar
1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Carregue um arquivo de áudio.
4. Clique em **Analisar agora**.

## Estrutura
- `index.html` → interface
- `style.css` → visual
- `app.js` → lógica de upload, visualização e análise

## Próximos upgrades sugeridos
- medição de LUFS aproximada
- análise por janelas ao longo do tempo
- comparação com faixa de referência
- filtros e relatórios mais detalhados
- exportação de relatório
- empacotar como app desktop no futuro

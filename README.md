# MasterCheck

Build: 2026-03-23 16-24-00

## O que esta build entrega

Fase 6 com foco no diferencial: referências internas mais completas, detectores expandidos e gráfico avançado de equalização.

- logo MasterCheck aplicada grande no site e como ícone
- build visível na interface
- biblioteca interna de presets de referência
- editor local para ensinar novas referências ao app sem faixa externa
- análise de waveform, espectro e curva tonal vs preset
- gráficos de equalização e painel de efeitos/indícios
- exportação de relatório em TXT
- análise por trechos (início, meio e final)

## Como usar

1. Abra index.html no navegador.
2. Escolha um preset interno.
3. Carregue um WAV ou MP3.
4. Clique em **Analisar agora**.
5. Se quiser ensinar uma nova referência ao app, use a seção **Preset Studio** e salve um preset customizado.
6. Para exportar o texto da análise, clique em **Exportar relatório**.

## Observação técnica

Nesta fase, compressão, de-esser, reverberação e saturação são estimados por heurísticas locais. O foco é construir a base do produto com referências internas e gráficos úteis, para evoluir os detectores nas próximas builds.


## Evolução desta fase

- novos presets internos: gospel, broadcast, cinematic e vocal bright
- gráfico avançado de equalização por frequência vs preset
- detectores expandidos: harshness, masking e transient/punch
- lógica reforçada para construir uma biblioteca interna de referência sem exigir faixa externa do usuário

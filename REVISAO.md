# Revisão de entrega — 29/10/2026

## Implementado

- Sete profissionais com as fotos, nomes, cargos e descrições fornecidos, na ordem Jéssica, Carlos, Jaqueline, Isabela, Ana Julia, Isadora e Raul.
- Fotos originais recortadas ao redor da moldura, com os rostos preservados, em WebP e JPEG.
- Cartões com foto, nome, função e registro visíveis. Descrições completas em Sobre o profissional, sem corte de texto ou barra de rolagem interna.
- Carrossel com três cartões no desktop largo, dois no tablet e um no celular. Transição por transform, arraste com resistência nas extremidades, botões, indicadores e teclado. Sem reprodução automática; movimento reduzido respeitado.
- Gestos não interceptam cliques nos resumos das biografias. Cartões fora da área visível usam aria-hidden e inert. Abertura de uma biografia fecha as demais.
- Marcadores pequenos de Especialistas, Serviços, Depoimentos e Contato restaurados acima dos títulos.
- Títulos com detalhes serifados/dourados; Como trabalhamos com destaque moderado e números de etapas refinados.
- Contatos padronizados em uma grade, mantendo ícones. WhatsApp com destaque sutil, sem painel separado. Todos os itens têm o mesmo fundo e padrão de tamanho.
- CNPJ 61.057.494/0001-35 e Jéssica Galbiatti — Contadora, CRC 357758-SP no rodapé e na política. OAB/SP 500.498 no cartão de Ana Julia. Dados copiados conforme fornecidos, sem consulta a cadastros externos.
- CNPJ adicionado ao JSON-LD e hash correspondente da CSP atualizado. Sitemap datado da edição.
- Mantidos os 17 serviços, quatro depoimentos, formulário removido, gráfico oculto no celular, contatos e domínio principal.

## Conferências realizadas

- Desktop: três cartões visíveis, intervalo inicial 1–3 de 7 e final 5–7 de 7; botão próximo desativado no fim.
- Arraste por mouse: avanço do intervalo 1–3 para 2–4 de 7.
- Biografia de Jéssica conferida completa. Abertura de Carlos fecha Jéssica. Biografia de Raul conferida completa.
- Home/End no carrossel e resumo de biografia por Enter, preservando a interação nativa dos controles internos.
- Celulares em janelas de 390 e 320 pixels: um cartão; navegação até 7 de 7; sete indicadores sem transbordamento horizontal; descrições completas.
- Cartões fora da tela sem acesso ao foco e biografia fechada ao sair da área visível.
- Contatos em coluna única no celular, com cinco itens e sem transbordamento. No desktop, mesmo fundo e altura de 112 pixels para os cinco itens.
- Menu móvel fecha após seleção. Retorno ao topo verificado com scroll igual a zero no desktop e no celular.
- Tablet de 820 pixels: dois cartões, intervalo inicial 1–2 de 7.
- Política em janela estreita: link de retorno visível, CNPJ e CRC associados corretamente no texto.
- Sem o script do site: biografia de Jéssica aberta pelo controle nativo e retorno ao topo confirmado com rolagem zero.
- Conferência final de HTML, caminhos, IDs, ARIA, sintaxe JavaScript, renderização CSS, dados estruturados, CSP e pacote ZIP.
- Comparação automática com o ZIP anterior: os 17 serviços, os quatro depoimentos e os metadados principais de SEO estão preservados; as sete biografias correspondem integralmente ao texto aprovado.

## Limites

Não houve publicação no domínio, envio de mensagens, auditoria formal WCAG, medição Lighthouse ou teste em aparelhos físicos. A prévia não aplica os cabeçalhos HTTP do Firebase; HTTPS, cache, CSP e URLs limpas devem ser conferidos após o deploy. Não foram acessados DNS, Search Console ou cadastros de registros profissionais.

Antes da divulgação ampla, permanecem a revisão apropriada da política, a confirmação de escopos editoriais dos serviços e a validação das autorizações/redação dos depoimentos.

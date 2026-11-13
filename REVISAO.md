# Manutenção e validação

Este documento reúne pontos de atenção para futuras alterações. A lista abaixo é um roteiro de verificação, não um registro de testes executados nesta revisão.

## Verificação da interface

- Conferir menu, links e ausência de transbordamento em celular, tablet e desktop.
- Percorrer o carrossel com botões, arraste e teclado, incluindo Home e End.
- Verificar o foco e a disponibilidade dos cartões ao avançar e retornar.
- Abrir e fechar biografias e descrições de serviços.
- Verificar a preferência por movimento reduzido e o acesso ao conteúdo sem JavaScript.
- Conferir as páginas de privacidade e de erro.

## Cuidados ao editar

- Preservar os identificadores de seção usados pela navegação.
- Manter o catálogo de serviços no JSON-LD coerente com o conteúdo visível.
- Recalcular o hash do JSON-LD na Content Security Policy em `firebase.json` quando esse bloco mudar.
- Atualizar os parâmetros de versão das referências de CSS e JavaScript quando necessário para renovação do cache.
- Conferir caminhos de imagens, metadados de compartilhamento e sitemap após alterações.
- O indicador de atendimento usa horário e dia da semana; não consulta feriados nem disponibilidade em tempo real.

## Hospedagem

O arquivo `firebase.json` define URLs limpas, cache e cabeçalhos HTTP. Esses comportamentos precisam ser verificados na hospedagem; abrir o HTML localmente não reproduz essa configuração.

Uma publicação exige acesso autorizado ao projeto de hospedagem. Credenciais, tokens e arquivos de conta de serviço não devem ser adicionados ao repositório.

## Limites

Não há resultados de Lighthouse, certificação WCAG ou testes em aparelhos físicos documentados neste repositório. Antes de alterar conteúdo institucional ou reutilizar materiais, confirmar sua atualização e as autorizações com os responsáveis.

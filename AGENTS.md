# Orientações de manutenção

- A cada atualização, adicionar um relatório curto em `CHANGELOG.md`, em português, com data, alterações, verificações realmente executadas e pendências relevantes.
- Executar `node scripts/verify.mjs` e `git diff --check` antes de publicar alterações.
- Manter o README apropriado para portfólio, com informações verificáveis, sem credenciais ou dados operacionais desnecessários.
- Não declarar testes visuais, auditorias ou métricas que não tenham sido realizados.
- Informar ao usuário o resultado da publicação e qualquer limitação de validação.

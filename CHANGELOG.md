# Histórico de atualizações

Cada atualização deve registrar o que mudou, as verificações realizadas e eventuais pendências. Datas no horário de Brasília.

## 2026-11-13 — Organização profissional e verificações

**Alterações:** documentação para portfólio com tecnologias, funcionalidades, decisões técnicas e execução local; revisão das notas de manutenção; verificador sem dependências externas; fluxo de GitHub Actions; proteção adicional no `.gitignore`; orientação persistente para registrar as próximas atualizações.

**Verificações realizadas:** arquivos e âncoras locais das três páginas, IDs duplicados, configurações JSON, JSON-LD e correspondência de seu hash com a CSP, sintaxe do JavaScript e busca por alguns padrões conhecidos de credenciais nos arquivos versionados. Verificação de espaços com `git diff --check`.

**Site em produção:** página principal, privacidade, robots.txt e sitemap responderam HTTP 200 por HTTPS. A página principal retornou CSP, HSTS e X-Content-Type-Options. Não foi necessário alterar o conteúdo do site nem executar um deploy do Firebase nesta atualização.

**Limitações e pendências:** não foram executados testes visuais em navegador, Lighthouse ou auditoria formal de acessibilidade. A busca por padrões não constitui auditoria completa de segredos. O repositório estava privado na consulta; acesso público depende da decisão do responsável. O fluxo remoto passou no GitHub Actions: https://github.com/RAUL-AUGUSTO/site-galbiatti/actions/runs/43497452965 (commit 43aa6b5). Dados institucionais, materiais do site e versões anteriores permanecem no histórico.

## 2026-11-13 — Apresentação inicial de portfólio

**Alterações:** reescrita do README e do documento de revisão, removendo da documentação listas de profissionais, registros cadastrais e instruções operacionais desnecessárias.

**Verificações realizadas:** revisão dos arquivos de documentação e `git diff --check`.

**Publicação:** commit `3e9a151` enviado à branch `main` do GitHub.

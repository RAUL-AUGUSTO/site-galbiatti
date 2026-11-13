# Galbiatti Contabilidade Consultiva

Site institucional estático em HTML, CSS e JavaScript. Não precisa de instalação de pacotes nem de build.

- Domínio: https://galbiatticontabilidade.com.br
- Firebase: `galbiatti-contabilidade`
- CNPJ informado: 61.057.494/0001-35
- Contadora: Jéssica Galbiatti — CRC 357758-SP

## Publicar

1. Guarde a pasta anterior como backup.
2. Extraia este ZIP em uma pasta nova.
3. Abra o terminal na pasta `galbiatti-contabilidade-site`, onde está `firebase.json`.
4. Se necessário, execute `firebase login` com a conta que administra o projeto.
5. Publique:

```sh
firebase deploy --only hosting --project galbiatti-contabilidade
```

Não precisa executar `firebase init`. O `.firebaserc` também aponta para o projeto correto. O deploy atualiza o domínio já associado ao Hosting. Este pacote não altera DNS, verificações do Google ou associação de domínio. Não remova os registros A/TXT existentes no Registro.br.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Conteúdo, equipe, serviços, depoimentos, contatos e JSON-LD |
| `privacidade.html` | Política disponível em `/privacidade` no Firebase |
| `404.html` | Página de endereço inexistente |
| `css/style.css` | Layout, identidade visual e comportamento responsivo |
| `js/main.js` | Menu, aba ativa, carrossel, horário e retorno ao topo |
| `assets/` | Marca, favicon, fotos e imagem de compartilhamento |
| `firebase.json` | URLs limpas, cache e cabeçalhos de segurança |
| `sitemap.xml` e `robots.txt` | Descoberta das páginas pelos buscadores |

## Navegação e apresentação

Ordem do menu: Início, Especialistas, Serviços, Depoimentos e Contato. Os IDs `inicio`, `especialistas`, `servicos`, `depoimentos` e `contato` identificam os destinos. Cada seção usa `data-nav` para indicar a aba ativa durante a rolagem. Mantenha esses identificadores ao editar os textos.

Os marcadores de localização ficam acima dos títulos, com tipografia pequena. Os títulos combinam a fonte principal e detalhes serifados em dourado. A seção Como trabalhamos preserva texto direto, com números e detalhes dourados.

O gráfico da abertura permanece oculto até 780 pixels. O formulário continua removido. O contato usa uma grade única com cinco itens, sem painel separado para o WhatsApp. Os links abrem WhatsApp, e-mail, Google Maps e Instagram; mensagens só são enviadas após confirmação no aplicativo.

## Equipe

| Ordem | Nome | Cargo | Arquivo-base da foto |
| --- | --- | --- | --- |
| 1 | Jéssica Galbiatti | Contadora — CRC 357758-SP | `equipe-revisada-jessica` |
| 2 | Carlos Ferreira | COO Comercial | `equipe-revisada-carlos` |
| 3 | Jaqueline Galbiatti | Administradora | `equipe-contorno-jaqueline` |
| 4 | Isabela dos Santos | Atendimento | `equipe-contorno-isabela` |
| 5 | Ana Julia Vitoriano França | Advogada — OAB/SP 500.498 | `equipe-revisada-anajulia` |
| 6 | Isadora Forlini | Gestão de Redes Sociais | `equipe-revisada-isadora` |

As descrições completas fornecidas estão no HTML, em `details.expert-about`. Nome e função são exibidos de início; a biografia abre por Sobre o profissional. Não há corte de texto nem rolagem interna. A abertura de uma biografia fecha a outra. Ao sair da área visível do carrossel, a biografia é fechada e o cartão deixa de receber foco.

O carrossel mostra três profissionais a partir de 1100 pixels, dois entre 700 e 1099 e um abaixo de 700. Aceita deslize, arraste e teclado. Em telas largas com mouse, também há setas laterais. Os traços indicam a posição atual e o carrossel não avança automaticamente. Com foco na região, setas avançam/retornam e Home/End vão ao começo/fim. As transições respeitam a preferência de movimento reduzido.

Os retratos ocupam a parte superior dos cartões e usam o azul-marinho do site como fundo. Foram feitos recortes e ajustes de enquadramento nas fotos originais, sem gerar novos retratos. Os arquivos são `.webp`. Use um novo nome ou uma versão no endereço se precisar invalidar o cache de imagens.

Sem JavaScript, as fotos e biografias continuam no HTML. A equipe pode ser percorrida pela rolagem horizontal nativa e os controles de biografia continuam funcionando.

## Serviços e depoimentos

Os 17 serviços seguem os quatro grupos do documento. As descrições usam `details`/`summary`, funcionando também sem JavaScript. Ao modificar um serviço, atualize o título/descrição visíveis e o catálogo `hasOfferCatalog` no JSON-LD.

Os cinco depoimentos estão completos em grade, com recortes das imagens fornecidas. A imagem de Carlos Barbisan é identificada como ambiente. Não há estrelas, nota média ou alegação de avaliações verificadas do Google. O relato de Alex continua sem valor financeiro. Valide a redação e as autorizações de uso de nomes/imagens antes de publicar.

## Dados do escritório e privacidade

CNPJ e CRC foram inseridos conforme os dados fornecidos. O CRC está associado à Jéssica, sem ser apresentado como registro da empresa. O OAB/SP de Ana Julia aparece somente em seu cartão profissional. Os registros não foram consultados em bases externas.

A política explica os contatos diretos e permanece vinculada no rodapé. Não há analytics, pixel publicitário, formulário ou backend de contato. Firebase e Google Fonts permanecem descritos como fornecedores de hospedagem e fontes. A revisão profissional da política continua recomendada antes de ampla divulgação.

O status de atendimento usa somente dia da semana e horário de Brasília, atualizado a cada minuto. Não consulta feriados ou disponibilidade em tempo real.

## SEO e manutenção

Canonical, título SEO, descrição, domínio, compartilhamento, favicon e robots foram preservados. O JSON-LD recebeu o CNPJ informado e mantém o catálogo de serviços. O sitemap foi atualizado na data desta edição. A equipe mantém `data-nosnippet` para não fornecer trechos de biografias à descrição da busca. O Google precisa rastrear novamente; não há prazo ou posição garantidos.

Após editar CSS/JS, atualize `?v=` nas referências HTML. Imagens têm cache de 30 dias. O HTML usa revalidação.

A CSP permite JavaScript local e identifica o JSON-LD por hash SHA-256. Se editar esse bloco, recalcule o hash em `script-src` do `firebase.json`. A política foi atualizada junto da inclusão do CNPJ. Não desative a política inteira para liberar um recurso novo.

HTTPS, cabeçalhos, cache e URLs limpas devem ser conferidos no domínio após o deploy: a prévia local não aplica a configuração HTTP do Firebase.

As verificações e os limites desta entrega estão em `REVISAO.md`.

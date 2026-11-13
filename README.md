# Galbiatti Contabilidade — Site institucional

Projeto de front-end para apresentar os serviços, a equipe e os canais de contato de um escritório de contabilidade. Desenvolvido com HTML, CSS e JavaScript, com foco em navegação responsiva e organização do conteúdo.

**[Acessar o site](https://galbiatticontabilidade.com.br)**

![Identidade visual do projeto](assets/og-image.jpg)

## Tecnologias

- HTML5 semântico.
- CSS3 para layout responsivo e identidade visual.
- JavaScript sem frameworks para as interações.
- Firebase Hosting para hospedagem e configuração de cabeçalhos HTTP.

O projeto não depende de instalação de pacotes ou de uma etapa de build.

## Funcionalidades

- Menu adaptado a dispositivos móveis e indicação da seção ativa.
- Carrossel da equipe com botões, arraste, gestos e navegação por teclado.
- Biografias e descrições de serviços expansíveis com `details` e `summary`.
- Links diretos para os canais de atendimento.
- Páginas de privacidade e de endereço não encontrado.

## Decisões técnicas

- **Acessibilidade:** controles com atributos ARIA, gerenciamento de foco nos cartões fora da área visível e respeito à preferência por movimento reduzido.
- **Melhoria progressiva:** descrições expansíveis usam elementos nativos do HTML; o conteúdo permanece disponível sem JavaScript.
- **Imagens:** uso de WebP nos retratos e de formatos adequados para ícones e compartilhamento.
- **SEO:** metadados, URL canônica, dados estruturados em JSON-LD, sitemap e robots.txt.
- **Hospedagem:** configuração de cache por tipo de arquivo e cabeçalhos como Content Security Policy e X-Content-Type-Options.

Essas decisões estão implementadas no código; não representam certificação de acessibilidade ou resultados de auditoria de desempenho.

## Executar localmente

```sh
git clone https://github.com/RAUL-AUGUSTO/site-galbiatti.git
cd site-galbiatti
```

Abra `index.html` no navegador ou use um servidor estático de sua preferência. Para a navegação direta pelos arquivos, abra `privacidade.html` e `404.html` pelos respectivos nomes.

URLs sem extensão e cabeçalhos HTTP dependem da hospedagem e não são reproduzidos ao abrir os arquivos diretamente.

## Estrutura

```text
site-galbiatti/
├── assets/             # Imagens, marca e ícones
├── css/                # Estilos e ajustes responsivos
├── js/main.js          # Interações da interface
├── index.html          # Página principal
├── privacidade.html    # Política de privacidade
├── 404.html            # Página de erro
├── firebase.json       # Configuração de hospedagem
├── robots.txt          # Orientações para rastreadores
└── sitemap.xml         # Mapa das páginas
```

## Contexto de portfólio

O repositório apresenta a implementação do site para avaliação técnica. A marca, as fotografias, os depoimentos e os textos institucionais pertencem aos respectivos titulares; sua presença neste projeto não concede autorização de reutilização.

As notas para manutenção e validação estão em [REVISAO.md](REVISAO.md).

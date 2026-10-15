# Como criar o site de uma barbearia nova

Este projeto é um modelo. Todo o conteúdo do negócio (nome, contatos, textos, serviços,
preços, fotos e cores) fica em um único arquivo: **`src/conteudo.ts`**. O resto do código
não precisa ser tocado.

## O que você precisa ter instalado

- [Node.js](https://nodejs.org) (versão 20 ou mais nova)
- Um editor de código, como o VS Code (ele avisa na hora se faltar algum campo)

## Passo a passo

### 1. Copie a pasta

Copie a pasta `corte-fino` inteira e dê um nome novo, por exemplo `barbearia-do-ze`.
Na cópia, apague as pastas `node_modules`, `dist` e `.git`, se existirem, para começar limpo.

Depois, dentro da pasta nova, instale as dependências:

```bash
npm install
```

### 2. Edite o `src/conteudo.ts`

Abra `src/conteudo.ts` e troque as informações, seção por seção. O arquivo está todo
comentado. Os blocos principais são:

| Bloco | O que tem |
| --- | --- |
| `negocio` | nome, logo, slogan, cidade, bairro, ano, endereço, mapa, telefone, WhatsApp, Instagram |
| `horarios` / `diasFechados` | dias e horários de funcionamento |
| `seo` | título da aba do navegador e descrição para o Google |
| `cabecalho`, `topo`, `casa`, `ritual`, `agenda`, `rodape` | textos de cada seção |
| `servicos` | serviços com nome, descrição, preço, duração, itens incluídos e foto |
| `pacote` | pacote em destaque (opcional) |
| `depoimentos` | depoimentos de clientes (opcional) |
| `perguntas` | perguntas frequentes |
| `midia` | vídeo e imagem de capa do topo |
| `cores` | cores principais do tema |

Alguns cuidados:

- **WhatsApp**: só números, com 55 + DDD + número. Exemplo: `"5511912345678"`.
- **Preços**: só o número, sem "R$". Exemplo: `preco: 85`.
- **Título com destaque**: o campo `destaque` sai em itálico dourado no fim da frase.
  Se não quiser destaque, apague a linha `destaque`.
- **Seções opcionais**: para esconder uma seção, deixe-a vazia:
  - sem depoimentos: `itens: []` dentro de `depoimentos` (o link "Clientes" do menu some junto);
  - sem pacote em destaque: `pacote: null`;
  - sem números de destaque no topo: `numeros: []`;
  - sem aviso de demonstração: `avisoDemonstracao: ""`.
- **Mapa**: cole o link do Google Maps em `linkMapa` para o endereço no rodapé virar link.
- **Cores**: use o formato `oklch(...)` ou hex (`#c9a46c`). Os brilhos e sombras douradas
  e o efeito de "ouro escovado" são calculados a partir do `dourado`.

Se faltar algum campo obrigatório ou houver erro de digitação no nome de um campo, o
editor sublinha em vermelho e o `npm run build` mostra onde está o problema.

### 3. Troque as fotos e o vídeo em `public/`

- **Vídeo do topo**: substitua `public/videos/hero.mp4`. Prefira um vídeo curto (até uns
  10 segundos), sem áudio, em 720p e com menos de 5 MB, para o site carregar rápido.
- **Imagem de capa**: substitua `public/videos/hero-poster.jpg` por uma foto do primeiro
  quadro do vídeo. Ela aparece enquanto o vídeo carrega e para quem desativou animações.
- **Fotos das seções**: coloque os arquivos em uma pasta como `public/fotos/` e use o
  caminho a partir da barra no `conteudo.ts`. Exemplo: `public/fotos/salao.jpg` vira
  `"/fotos/salao.jpg"`. Também dá para usar endereços da internet (`https://...`).
- **Ícone da aba (favicon)**: troque `public/favicon.svg` e `public/apple-touch-icon.png`
  (180×180) pelo ícone da barbearia nova. O atual é um monograma "B" dourado.

Se usar outros nomes de arquivo para o vídeo ou a capa, atualize o bloco `midia` do
`conteudo.ts`.

### 4. Mude o nome no `wrangler.jsonc`

Abra `wrangler.jsonc` e troque o `name` por um nome único para o cliente, só com letras
minúsculas, números e hífens:

```jsonc
"name": "barbearia-do-ze",
```

Esse nome define o endereço do site na Cloudflare (por exemplo,
`barbearia-do-ze.<sua-conta>.workers.dev`).

### 5. Teste no seu computador

```bash
npm run dev
```

Abra o endereço que aparecer (normalmente http://localhost:5173) e confira o site no
computador e no celular (no navegador, use o modo de dispositivo móvel). As edições no
`conteudo.ts` aparecem na hora. Se mudar o `seo` (título da aba), recarregue a página.

Antes de publicar, confirme que o build passa sem erros:

```bash
npm run build
```

### 6. Publique

O site é publicado na Cloudflare a partir da pasta `dist`, gerada pelo `npm run build`.

```bash
npm run build
npx wrangler deploy
```

Na primeira vez, o `wrangler` pede para entrar na sua conta da Cloudflare. No fim ele
mostra o endereço do site publicado.

Se o projeto estiver ligado a um repositório no GitHub com deploy automático na
Cloudflare, basta fazer commit e push.

## Ajustes finos (opcional)

Os tons escuros de fundo (degradês, cards e rodapé) e as fontes ficam em `src/index.css`.
Normalmente não é preciso mexer neles: as cores do bloco `cores` já mudam o dourado, os
verdes e o grafite em todo o site.

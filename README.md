# scratch-js
Biblioteca de adaptação em JavaSscript para o MIT Scratch (https://scratch.mit.edu).

## Tutorial rápido

1. Criar um arquivo *script.js* com o seguinte conteúdo:

```javascript
Stage.setSize(800, 400);
Stage.setColor("rgb(127, 255, 127)");

const cat = new Sprite("./sprites/cat.png");
cat.setSize(100, 100);
cat.setPosition(100, 100);

function handleStageStart() {
  cat.onKeyPressed(Key.ARROW_LEFT, function () {
    cat.x = cat.x - 10;
  });
  cat.onKeyPressed(Key.ARROW_RIGHT, function () {
    cat.x = cat.x + 10;
  });
}

Stage.addSprite(cat);
Stage.onStart(handleStageStart);
```

2. Importar o script no arquivo *index.html*, logo após a importação da biblioteca do Scratch (`<script src="scratch.js"></script>`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./scratch.css">
  <title>Document</title>
</head>
<body>
  <canvas id="stage"></canvas>
  <script src="scratch.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

3. Abrir o *index.html* no navegador e testar pressiionando as teclas *seta esquerda*  e *seta direita*.


## Referência


### Stage

Representa o stage do Scratch, onde são adicionados os sprites.

#### onStart (block)

Define o bloco que será chamado assim que o Stage está pronto para começar a rodar.

- block: Função sem parâmetro e retornando nada.

#### setSize(width, height)

Define o tamanho do Stage.

- width: Valor numérico definindo a largura do Stage.
- height: Valor numérico definindo a altura do Stage.

#### setColor(color)

Define a cor de fundo do Stage.

- color: String definindo a cor em RGB. Usa o padrão CSS para cores.

#### addSprite(sprite)

Adiciona um Sprite ao Stage.

- sprite: Instância do tipo Sprite.

---

### Sprite

Representa um sprite do Scratch, que pode ser adicionado ao Stage.


#### *constructor*(imagePath)

Cria um novo sprite e define sua imagem.

- imagePath: URL do arquivo de imagem do Sprite.

#### width

Valor numérico da largura do Sprite.

#### height

Valor numérico da altura do Sprite.

#### setSize(width, height)

Define o tamanho do Sprite.

- width: Valor numérico da largura do Sprite.
- height: Valor numérico da altura do Sprite.

#### x

Valor numérico da posição x do sprite no stage.

#### y

Valor numérico da posição y do sprite no stage.

#### setPosition(x, y)

Define a posição do Sprite.

- x: Valor numérico da posição x do sprite no stage.
- y: Valor numérico da posição y do sprite no stage.

#### onClick(block)

Define o bloco a ser chamado quando o sprite foi clicado.

- bloco: Função sem parâmetro e retornando nada.

#### onkeyPressed(code, block)

Define o bloco a ser chamado quando uma tecla for pressionada.

- code: Código da telca pressionada (ver *Key*).
- bloco: Função sem parâmetro e retornando nada.

---

### Key

Define os códigos das teclas que podem ser pressionadas no jogo.

#### SPACE

Código da tecla espaço.

#### ARROW_LEFT

Código da tecla seta esquerda.

#### ARROW_RIGHT

Código da tecla seta direita.
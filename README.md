# Desafio Final 9 - Gympoint

Código referente a entrega do desafio final 9 do Bootcamp GoStack - Gympoint.

## Telas da aplicação

### Mobile

![Mobile1](https://github.com/filipebsmaia/gympoint/blob/master/imgs/mobile1.png)

### Web

![Web1](https://github.com/filipebsmaia/gympoint/blob/master/imgs/web1.png)
![Web2](https://github.com/filipebsmaia/gympoint/blob/master/imgs/web2.png)
![Web3](https://github.com/filipebsmaia/gympoint/blob/master/imgs/web3.png)
![Web4](https://github.com/filipebsmaia/gympoint/blob/master/imgs/web4.png)
![Web5](https://github.com/filipebsmaia/gympoint/blob/master/imgs/web5_2.png)

## Inicializar aplicação

Instalando as dependências:

```
$ yarn
```

_or_

```
$ npm i
```

### Backend

database:

```
$ yarn sequelize db:migrate
```

```
$ yarn sequelize db:seed:all
```

_or_

```
$ npm run sequelize db:migrate
```

```
$ npm run sequelize db:seed:all
```

server:

```
$ yarn dev
```

_or_

```
$ npm run dev
```

queues:

```
$ yarn queue
```

_or_

```
$ npm run queue
```

### Frontend

```
$ yarn start
```

_or_

```
$ npm run start
```

### Mobile

```
$ yarn android
$ yarn start
```

_or_

```
$ npm run android
$ npm run start
```

### Configurações locais

- No código mobile é necessário trocar o IP presente nos arquivos [services/api.js](https://github.com/filipebsmaia/gympoint/blob/master/mobile/src/services/api.js/) pelo da máquina que está rodando o backend.
- No código frontend é necessário trocar o IP presente nos arquivos [services/api.js](https://github.com/filipebsmaia/gympoint/blob/master/frontend/src/services/api.js/) pelo da máquina que está rodando o backend (caso não seja a mesma).

#### Caso deseje utilizar o reactotron para ver os dados altere o ip do mesmos nas seguintes configurações:

- Frontend: [config/ReactotronConfig.js](https://github.com/filipebsmaia/gympoint/blob/master/frontend/src/config/ReactotronConfig.js/)
- Mobile: [config/ReactotronConfig.js](https://github.com/filipebsmaia/gympoint/blob/master/mobile/src/config/ReactotronConfig.js/)

## Plataforma do aplicativo mobile

Por não possuir um Macbook o código mobile foi desenvolvido apenas para Android.

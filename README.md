# Desafio Final 9 - Gympoint

Código referente a entrega do desafio final 9 do Bootcamp GoStack - Gympoint.

## Inicializar aplicação

### Backend

- database:

  - yarn sequelize db:migrate
  - yarn sequelize db:seed:all

- server: yarn dev
- queues: yarn queue

### Frontend

- yarn start

### Mobile

- yarn android
- yarn start

No código mobile é necessário trocar o IP presente nos arquivos [services/api.js](https://github.com/filipebsmaia/gympoint/blob/master/mobile/src/services/api.js/) pelo da máquina que está rodando o backend.
No código frontend é necessário trocar o IP presente nos arquivos [services/api.js](https://github.com/filipebsmaia/gympoint/blob/master/frontend/src/services/api.js/) pelo da máquina que está rodando o backend (caso não seja a mesma).
Caso deseje utilizar o reactotron para ver os dados altere o ip do mesmos nas seguintes configurações:
Frontend: [config/ReactotronConfig.js](https://github.com/filipebsmaia/gympoint/blob/master/frontend/src/config/ReactotronConfig.js/)
Mobile: [config/ReactotronConfig.js](https://github.com/filipebsmaia/gympoint/blob/master/mobile/src/config/ReactotronConfig.js/)

## Plataforma do aplicativo mobile

Por não possuir um Macbook o código mobile foi desenvolvido apênas para Android.

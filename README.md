api internet Bank

Obs: É necessario baixar a aplicaçao e iniciar localmente

iniciar aplicao 
npm install _ -> para baixar node_modules da aplicacao

npm start -> para iniciar a aplicaçao

o MongoDb está armazenado no Atlas

a Api está acessando o banco que está no repositorio MongoDBAtlas.

rotas criadas

autenticação de Login:
obs: Api
 senha de login: 6 caracteres,
 token de validacao: 4 caracteres

rotas:
##############################################################
POST:
http://localhost:3000/conta/cadastro -> cadastro de uma unica conta

POST:
http://localhost:3000/conta/cadastroLote -> cadastro todas as contas de uma vez

para cadastrar o documento seed do banco

###############################################################

Login e autenticaçao
###############################################################
POST:
http://localhost:3000/autorizacao/  -> tela login

obs: a rota login como respota retornara um hash para serem utilizada no header do chamando
na tela de validacao.
############################################################### 

POST:
http://localhost:3000/autorizacao/validacao -> tela validacao

obs: a rota validcao como respota retornar um novo hash que irá ser utilizado em toda aplicaçao
com prazo de expiracao de um dia, e assim que expirar tem que deslogar e retorna para tela de login
###############################################################

Transferências

POST:
http://localhost:3000/transferencias/cadastro -> rota para cadastrar novas tranferências

Obs: os paramentros com final _env desta rota são os dados do usuario que efetua a transferências

Obs: os paramentros com final _receb desta rota são os dados do usuario que recebe a transferências

################################################################


Obs: no header tem que ser passado x-access-token com o token da aplicacao e content-type: application/json

IMPORTANTE:
Obs : no diretorio back tem um arquivos chamado Postman parar ser 
importado para o Postman lá terá toda a documentaçao dos parametros a serem passado e suas rotas tanto no corpo quanto na url


Qualquer duvida estarei a disposiçao..



# __AI Teacher__
<br />
## Introdução

Essa aplicação com base Flask e ReactJS tem por finalidade mostrar um novo meio de interação com o aprendizado.
Uma plataforma de cursos online totalmente interativa por voz e design intuitivo, qual permite uma ambientação aprimorada do usuário no meio virtual.
Através de Deep Learning, essa aplicação consiste em dar dicas para o usuário aprimorar seus conhecimentos, não só com sugestões, mas também criando novos métodos avaliativos de acordo com o perfil do usuário.

*This application based on Flask and ReactJS aims to show a new method of interaction with learning.
A fully interactive online course platform by voice and intuitive design, which allows for an enhanced user environment in the virtual environment.
With Deep Learning, this application consists of giving tips for the user to improve their knowledge, not only with suggestions, but also creating new evaluation methods according to the user profile.*

<br />
<br />
<br />

## Setup
Segue lista de passos necessários para realizar o setup da aplicação.

__Info: Antes de iniciar o SETUP abaixo, lembre-se de ter instalado na sua máquina Python 3, Node.JS e PostgreSQL
(tenha dois bancos registrados na sua máquina chamados ai_teacher e ai_teacher_test)__

1. ` git clone .... `
2. ` cd "AI Teacher" `
3. ` cd back `
4. `pip install -r requirements.txt`
5. `cd ..`
6. `cd front`
7. `npm install`

<br />
<br />
<br />

## Inicializar

Segue lista de passos necessários para realizar o setup da aplicação.

__Terminal 1__
1. `cd back`
2. `flask run`

__Terminal 2__
1. `cd front`
2. `npm start`


<br />
<br />
<br />

## Testes

Segue lista de passos necessários para visualizar os testes do sistema.

1. `cd back`
2. `pytest --color=yes -v --disable-warnings`

Aplicativo de estacionamento com Api em Nodejs, MongoDB e Vuejs

<h1>WPark Estacionamento</h1>

<h3>Licença:</h3>
<ul>
    <li>Este projeto é quase 100% livre para ser utilizado da forma como quiser ou para aprimoramentos.</li>
    <li>A única coisa que peço é que se mantenha o rodapé do site com os devidos créditos e link para o meu github, no restante, pode ser utilizado em qualquer lugar e feito quaisquer alterações.</li>
</ul>

<h3>Objetivos:</h3>
<ul>
    <li>O meu objetivo neste projeto foi aprimorar cada vez mais meus estudos com Nodejs e Vuejs.</li>
    <li>Buscar desafios do mundo real.</li>
    <li>Contribuir com aplicativo totalmente opensource para a comunidade caso alguém queira utilizar ou aprimorar futuramente.</li>
</ul>

<h3>Requisitos:</h3>
<ul>
    <li>Botão para adicionar veículos ao pátio</li>
    <li>Filtros por carros ativos/encerrados e ainda um campo para filtrar por placa.</li>
    <li>Mostrar quanto tempo se passou e qual valor a ser pago por cada cliente para retirar o veículo do pátio.</li>
    <li>Mostrar um histórico dos carros que estão no pátio e já saíram dele.</li>
    <li>Opção de configuração de valores para serem ajustados pelo administrador.</li>
    <li>Botão para impressão do histórico.</li>
</ul>

<h3>Técnologias:</h3>

<h5>BackEnd com Node. Pacotes:</h5>
<ul>
    <li>Express para criar servidor e escutar em uma porta.</li>
    <li>Cors para deixar api pública e então ser acessada de qualquer lugar.</li>
    <li>Mongoose para conexão com banco de dados MongoDB na núvem.</li>
    <li>Require-dir para centralizar e carregar todos os arquivos de uma determinada pasta.</li>
    <li>Nodemon para live reload.</li>
</ul>

<h5>FrontEnd com Vue js. Pacotes:</h5>
<ul>
    <li>Axios para fazer requisições do front para a api no BackEnd.</li>
    <li>Bootstrap para utilizar a biblioteca gráfica e agilizar o processo de construção de interfaces.</li>
    <li>Vee Validate para validar os campos de input no formato desejado.</li>
    <li>Vue Router para navegação em SPA (single page application)</li>
</ul>

<h3>Instalação e Utilização:</h3>
<h5>Será necessário instalar os seguintes programas e pacotes para funcionamento do aplicativo:</h5>
<ul>
    <li>
        <a href="https://nodejs.org/">Node js</a>
    </li>
    <li>
        <a href="https://www.mongodb.com/">Criar uma conta no MongoDB</a>
    </li>
    <li>Passar uma string de conexão para o backEnd com a conta do MongoDB.<br/>
        mongoose.connect('mongodb+srv://<usuario>:<senha>@home-jfxqp.gcp.mongodb.net/wpark?retryWrites=true', { useNewUrlParser: true });
    </li>
    <li>
        Depois de instalar tudo e colocar a string de conexão no arquivo server.js da api. Exclua as pastas node_modules e o arquivo package-lock.json da api e da página e o depois entre na raiz de cada uma delas e roda o comando npm i para reinstalar os módulo.
    </li>
    <li>
        Após isso, entre na raiz do servidor e rode o comando npm run dev. Siga o mesmo passo na pasta da página então estará funcionando o servidor de front e back e poderá utilizar o aplicativo.
    </li>
    <li>
        Qualquer dúvida ou suporte que precisar, pode entrar em contato comigo através do facebook<a href="https://m.facebook.com/willian.bello.963"> Willian Bello</a>.
</ul>

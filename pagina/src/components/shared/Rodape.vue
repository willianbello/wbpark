<template>
    <div class="rodape">
        <footer class="container">
            <a href="https://github.com/willianbello" class="m-auto link" target="_blank">Willian Bello 2019 - Todos os direitos reservados</a>
        </footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .rodape{
        font-size: 13px;
        position: fixed;
        bottom: 0;
        background-color: rgb(235, 235, 235);
        width: 100%;
        box-shadow: 1px 0px 1px black;
        padding: 3px 0;
        transition: 0.3s;
    }
    .rodape:hover, a:hover{
        background-color: rgb(224, 224, 224);
        color: rgb(0, 0, 0);
    }

    .link{
        color: rgb(131, 131, 131);
        text-decoration: none;
        transition: 0.3s;
    }
</style>
//Função para fazer a alteração de formulario para cadastro
function mostrar_cadastro(id) {
    const todasAsPaginas = document.querySelectorAll('.container > .cadastro_produtos, .container > .cadastro_pessoas');
    todasAsPaginas.forEach(pagina => {
        pagina.style.display = 'none';
    });
    document.querySelector('.container > .' + id).style.display = 'block';
}


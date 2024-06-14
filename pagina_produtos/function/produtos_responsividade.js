// Função para responsividade do menu da página inicial

function show_menu(){
    let menu = document.querySelector('.menu');
    if (menu.classList.contains('open')){
        menu.classList.remove('open');
        document.querySelector('.icon').src="pagina_produtos/img/menu_white_36dp.svg";
    }
    else{
        menu.classList.add('open');
        document.querySelector('.icon').src="pagina_produtos/img/close_white_36dp.svg";
    }
}
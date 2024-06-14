function login() {
    // Identificação das constantes necessárias para efetuar a criação do FormData e também efetua o chamado 
    // do formulário de login do arquivo HTML
    const login = document.getElementById("login_form");
    const formData = new FormData(login);
    
    // Envio dos dados usando o API Fetch
    fetch('http://localhost/projeto_semestral/exercicio_login/php/process.php',{
        method: 'POST',
        body: formData
    })

    // Resposta em JSON caso não seja possível enviar o formulário
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao enviar o formulário');
        }
        return response.json();
    })

    // Verificação se a inserção de dados foi realizada
    .then(data => {
        console.log(data);
        if(data.sucesso){

            alert(data.mensagem);
            fetch('http://localhost/projeto_semestral/index.html')
                .then(response => response.text())
                .then(data => {
                    window.location = 'http://localhost/projeto_semestral/index.html';
                    document.getElementById('login_botao').innerHTML = data;
                });
        } else {
            alert(data.mensagem);
        }
    })
    
    // Registro de erro caso não seja possível enviar o formulário
    .catch(error => {
        console.error('Erro: ', error);
        alert('Não foi possível enviar o formulário.');
    });
}


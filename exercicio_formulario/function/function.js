function finalizar_compra(local_arquivo){
    const cadastro = document.getElementById("cadastro_box");

    // Configuração para evitar que quando o botão seja acionado a ocorra o recarregamento da página, dessa forma 
    // possibilita a execução do restante do código
    cadastro.addEventListener("submit", async (e) => {
        e.preventDefault(e); 
        
        // Identificação das constantes necessarias para o cadastro dos dados do cliente 
        const nome = document.getElementById('nome_input').value;
        const sobrenome = document.getElementById('sobrenome_input').value;
        const email = document.getElementById('email_input').value;
        const senha = document.getElementById('senha_input').value;
        const confirmarSenha = document.getElementById('confirmar_senha_input').value;
        const data_nasc = document.getElementById('data_nasc').value;
        const hoje = new Date();
        const nascimento = new Date(data_nasc);
        const idade = hoje.getFullYear() - nascimento.getFullYear();

        // Confirmação do tamanho da senha
        if(senha.length < 10 ){
            alert('Senha Fraca. Digite uma senha forte')
            return
        }
        // Confirmação se as senhas são iguais
        if (senha !== confirmarSenha) {
            alert('As senhas não conferem!');
            return;
        }
        // Confirmação da idade dos usuários
        if(idade < 18){
            alert('Usuário deve ter mais do que 18 anos.')
            return
        }
        
        // Criação do FormData e inserção de valores das variaveis no FormData para enviar para o servidor
        const formData = new FormData(); 
        formData.append("nome_input", nome);
        formData.append("sobrenome_input", sobrenome);
        formData.append("email_input", email);
        formData.append("senha_input", senha);
        formData.append("data_nasc", data_nasc)

        console.log(formData);

        // Envio dos dados usando o API Fetch
        fetch(local_arquivo, {
            method: 'POST',
            body: formData
        })

        // Resposta em JSON caso não seja possível enviar o formulário
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o formulário');
            }
            return response.json();
        })

        // Verificação se a inseção de dados foi realizada
        .then(data => {
            console.log(data);
            if(data.sucesso){
                alert(data.mensagem);
                window.location = '../exercicio_login/index.html' 
            
            }
            else{
                alert(data.mensagem)
            }
        })

        // Registro de erro caso não seja possível enviar o formulário
        .catch(error => {
            console.error('Erro: ', error); 
            alert('Não foi possível enviar o formulário.');
        });
    });


}

function salvar() {
    finalizar_compra('http://localhost/projeto_semestral/exercicio_formulario/php/process.php');
    document.addEventListener('DOMContentLoaded', salvar);
}
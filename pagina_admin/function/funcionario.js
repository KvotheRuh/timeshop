function cadastrar_atualizar_funcionario(local_arquivo){
    const cadastro = document.getElementById("cadastro");

    // Configuração para evitar que quando o botão seja acionado a ocorra o recarregamento da página, dessa forma 
    // possibilita a execução do restante do código
    cadastro.addEventListener("submit", async (e) => {
        e.preventDefault(e); 
        
        // Identificação das constantes necessarias para o cadastro dos dados do cliente 
        const nome = document.getElementById('nome_funcionario').value;
        const email = document.getElementById('email_funcionario').value;
        const senha = document.getElementById('senha_funcionario').value;
        const confirmarSenha = document.getElementById('confirmar_senha_input').value;

        // Confirmação se as senhas são iguais
        if (senha !== confirmarSenha) {
            alert('As senhas não conferem!');
            return;
        }

        
        // Criação do FormData e inserção de valores das variaveis no FormData para enviar para o servidor
        const formData = new FormData(); 
        formData.append("nome_funcionario", nome);
        formData.append("email_funcionario", email);
        formData.append("senha_funcionario", senha)

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


function adicionar_pessoa() {
    cadastrar_atualizar_funcionario('http://localhost/projeto_semestral/pagina_admin/php/insert_pessoa.php');
    document.addEventListener('DOMContentLoaded', adicionar_pessoa);
}

function update_pessoa() {
    cadastrar_atualizar_funcionario('http://localhost/projeto_semestral/pagina_admin/php/update_pessoa.php');
    document.addEventListener('DOMContentLoaded', update_pessoa);
}

function excluir_pessoa() {
    const cadastro = document.getElementById("cadastro");

    // Configuração para evitar que quando o botão seja acionado a ocorra o recarregamento da página, dessa forma 
    // possibilita a execução do restante do código
    cadastro.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        // Identificação das constantes necessarias para o cadastro dos dados do cliente 
        const nome = document.getElementById('nome_funcionario').value;
        const email = document.getElementById('email_funcionario').value;
        const senha = document.getElementById('senha_funcionario').value;
        const confirmarSenha = document.getElementById('confirmar_senha_input').value;

    

        
        // Criação do FormData e inserção de valores das variaveis no FormData para enviar para o servidor
        const formData = new FormData(); 
        formData.append("nome_funcionario", nome);
        formData.append("email_funcionario", email);
        formData.append("senha_funcionario", senha)


        console.log(formData);

        // Envio dos dados usando o API Fetch
        fetch('http://localhost/projeto_semestral/pagina_admin/php/delete_pessoa.php', {
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
    document.addEventListener('DOMContentLoaded', excluir_pessoa);
}

// Evento para efetuar a ação da função salvar quando o conteudo da página for completamente carregado
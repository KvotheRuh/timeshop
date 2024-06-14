function cadastrar_atualizar_produtos(local_arquivo){
    const cadastro = document.getElementById("cadastro_produtos");

    // Configuração para evitar que quando o botão seja acionado a ocorra o recarregamento da página, dessa forma 
    // possibilita a execução do restante do código
    cadastro.addEventListener("submit", async (e) => {
        e.preventDefault(e); 
        
        // Identificação das constantes necessarias para o cadastro dos dados do cliente 
        const nome = document.getElementById('nome_produto').value;
        const descricao = document.getElementById('descricao_produto').value;
        const valor = document.getElementById('valor_produto').value;
        const quantidade = document.getElementById('quantidade_produto').value;
        const data_cadastro = document.getElementById('data_insert').value;

    
        // Criação do FormData e inserção de valores das variaveis no FormData para enviar para o servidor
        const formData = new FormData();
        formData.append("nome_produto", nome);
        formData.append("descricao_produto", descricao);
        formData.append("valor_produto", valor);
        formData.append("quantidade_produto", quantidade);
        formData.append("data_nasc", data_cadastro)

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
            console.error('Erro ', error); 
            alert('Não foi possível enviar o formulário.');
        });
    });


}


function adicionar() {
    cadastrar_atualizar_produtos('http://localhost/projeto_semestral/pagina_admin/php/insert.php');
    document.addEventListener('DOMContentLoaded', adicionar);
}

function update() {
    cadastrar_atualizar_produtos('http://localhost/projeto_semestral/pagina_admin/php/update.php');
    document.addEventListener('DOMContentLoaded', update);
}

function excluir() {
    const cadastro = document.getElementById("cadastro_produtos");

    // Configuração para evitar que quando o botão seja acionado a ocorra o recarregamento da página, dessa forma 
    // possibilita a execução do restante do código
    cadastro.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        // Identificação das constantes necessarias para o cadastro dos dados do cliente 
        const nome = document.getElementById('nome_produto').value;
        const descricao = document.getElementById('descricao_produto').value;
        const valor = document.getElementById('valor_produto').value;
        const quantidade = document.getElementById('quantidade_produto').value;
        const data_cadastro = document.getElementById('data_insert').value;

    

        
        // Criação do FormData e inserção de valores das variaveis no FormData para enviar para o servidor
        const formData = new FormData(); 
        formData.append("imagem_produto", imagem);
        formData.append("nome_produto", nome);
        formData.append("descricao_produto", descricao);
        formData.append("valor_produto", valor);
        formData.append("quantidade_produto", quantidade);
        formData.append("data_nasc", data_cadastro)


        console.log(formData);

        // Envio dos dados usando o API Fetch
        fetch('http://localhost/projeto_semestral/pagina_admin/php/delete.php', {
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
    document.addEventListener('DOMContentLoaded', excluir);
}

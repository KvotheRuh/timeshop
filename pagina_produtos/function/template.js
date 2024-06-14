document.addEventListener("DOMContentLoaded", () => {
    const produtos_cards = document.getElementById("produtos");
    const obter_produtos = async() => {
        try {
            // Recebe a resposta do servidor e adiciona os dados da tabela no array data.
            const resposta = await fetch('http://localhost/projeto_semestral/pagina_produtos/php/select.php');
            const data = await resposta.json();
            // Faz a varredura por cada objeto que foi inserido dentro da data.
            data.forEach(produto => {
                // String para inserir os dados do servidor nos cards
                const cards = 
                    `
                    <section class="produto">
                        <div class="icon_produtos"><img src="pagina_produtos/img/${produto.imagem}" alt="${produto.nome}"></div>
                        <h3>${produto.nome}</h3>
                        <p>${produto.descricao}</p>
                        <p>R$${produto.valor}</p>
                        <button><a href="#">Adicionar ao Carrinho</a></button>
                    </section>
                    `;
                // Adiciona os cards dos produtos.
                produtos_cards.innerHTML += cards;
            });
        } catch (error) {
            console.error("Erro ao acessar os dados do banco.");
            alert("Erro ao acessar os dados do banco.");
        }
    }
    // Chamada da função
    obter_produtos();
});

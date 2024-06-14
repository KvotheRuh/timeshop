document.addEventListener("DOMContentLoaded", () => {
    const carrinho_cards = document.getElementById("carrinho");
    const carrinho_produtos = async() => {
        try{
            // Recebe a resposta do serividor e adiciona os dados da tabela no array data.
            const resposta = await fetch('http://localhost/projeto_semestral/pagina_carrinho/php/carrinho_banco.php');
            const data = await resposta.json();
            // Faz a varredura por cada objeto que foi inserido dentro da data.
            data.forEach(carrinho=> {
                // String para inserir os dados do servidor nos cards
                const cards = 
                    `
                    <div class="itens">
                        <div class="icon_produtos"><img src="../pagina_produtos/img/${carrinho.imagem}" alt="${carrinho.nome}"></div>
                        <h3>${carrinho.nome}</h3>
                        <p>R$${carrinho.valor}</p>
                        <button button type="submit" onclick="remover()"class="remover_item"><a href="#">Remover</a></button>
                        <div id="linha"></div>
                    </div>
                    `;
                // Adiciona os card dos aplicativos.
                carrinho_cards.innerHTML += cards;
                
                
            });
        }
        catch(error){
            console.error("Erro ao acessar os dados do banco.")
            alert("Erro ao acessar os dados do banco.")
        }
    }

    window.remover = async (id_produto) => {
        try {
            const formData = new FormData();
            formData.append("id_produto", id_produto);

            const resposta = await fetch('http://localhost/projeto_semestral/pagina_carrinho/php/remover_produtos.php', {
                method: 'POST',
                body: formData
            });

            const resultado = await resposta.json();
            if (resultado.sucesso) {
                alert(resultado.mensagem);
                // Remover o item do DOM
                document.getElementById(`item-${id_produto}`).remove();
            } else {
                alert(resultado.mensagem);
            }
        } catch (error) {
            console.error("Erro ao remover o item.", error);
            alert("Erro ao remover o item.");
        }
    }

    // Chamado da função
    carrinho_produtos();
});



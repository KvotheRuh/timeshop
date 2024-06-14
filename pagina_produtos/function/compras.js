async function adicionarProdutoAoCarrinho() {
    const clienteLogado = await verificarLogin();
    if (clienteLogado) {
        const idProduto = await selecionarIDProduto();
        const idCliente = await selecionarIDCliente();
        if (idProduto && idCliente) {
            adicionarAoCarrinho(idProduto, idCliente);
        } else {
            alert('Erro ao adicionar produto ao carrinho.');
        }
    } else {
        window.location = '../caminho/para/pagina_de_login.html';
    }
}

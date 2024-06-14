<?php
// Cabeçalhos para evitar o CORS
header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Dados do servidor no MySQL
$host = "localhost";
$port = "3307"; 
$usuario = "root";
$senha = "";
$banco = "loja";

// Conexão com o banco de dados
$conexao = new mysqli($host, $usuario, $senha, $banco, $port);

// Verifica se a conexão foi bem-sucedida
if ($conexao->connect_error) {
    die("Falha ao conectar ao banco de dados: " . $conexao->connect_error);
}

// Verificação se o ID do produto foi enviado
if (isset($_POST['id_produto'])) {
    $id_produto = $conexao->real_escape_string($_POST['id_produto']);

    // Verificação se o produto existe no carrinho
    $sql_select = "SELECT id_produto FROM carrinho WHERE id_produto = '$id_produto'";
    $result = $conexao->query($sql_select);

    if ($result->num_rows > 0) {
        // Deletar o produto do carrinho
        $sql_delete_carrinho = "DELETE FROM carrinho WHERE id_produto = '$id_produto'";

        if ($conexao->query($sql_delete_carrinho) === TRUE) {
            $alerta = array("sucesso" => true, "mensagem" => "Produto removido do carrinho com sucesso.");
        } else {
            $alerta = array("sucesso" => false, "mensagem" => "Erro ao remover o produto do carrinho: " . $conexao->error);
        }
    } else {
        $alerta = array("sucesso" => false, "mensagem" => "Produto não encontrado no carrinho.");
    }
} else {
    $alerta = array("sucesso" => false, "mensagem" => "ID do produto não fornecido.");
}

// Fechamento da conexão
$conexao->close();

// Envio da resposta em JSON
echo json_encode($alerta);
?>


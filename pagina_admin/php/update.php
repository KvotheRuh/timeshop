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

// Obtenção dos valores por meio do POST
$nome = $_POST['nome_produto'];
$descricao = $_POST['descricao_produto'];
$valor = $_POST['valor_produto'];
$quantidade = $_POST['quantidade_produto'];
$data_cadastro = $_POST['data_insert'];

// Cadastra as informações do produto
$sql = "UPDATE cadastro_form.cliente SET nome = '$nome' AND descricao = '$descricao' AND valor = '$valor' AND quantidade = '$quantidade' AND data_cadastro = '$data_cadastro'";

// Executa a consulta SQL
if ($conexao->query($sql) === TRUE) {
    // Remova a resposta JSON
} else {
    // Remova a resposta JSON
}

// Encerra a conexão com o banco de dados
$conexao->close();
?>


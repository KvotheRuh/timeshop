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

// Seleção dos dados da tabela
$sql = "SELECT * FROM loja.produtos";
$resultado = $conexao->query($sql);
$lista_produtos = [];


// Laço de repetição para efetuar a leitura dos dados da tabela e a adição dos dados em uma lista
while($row = $resultado->fetch_assoc()){
    $row['imagem'] = str_replace('C:/xampp/htdocs/', 'http://localhost/', $row['imagem']);
    $lista_produtos[] = $row;
}


// Encerra a conexão com o banco de dados
echo json_encode($lista_produtos);
$conexao->close();

?>
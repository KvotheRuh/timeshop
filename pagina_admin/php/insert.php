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
$nome_imagem = $_FILES['imagem_produto']['name']; // Nome da imagem
$nome = $_POST['nome_produto'];
$descricao = $_POST['descricao_produto'];
$valor = $_POST['valor_produto'];
$quantidade = $_POST['quantidade_produto'];
$data_cadastro = $_POST['data_insert'];


$nomeOriginal = $_FILES['imagem_produto']['name'];
$extensao = pathinfo($nomeOriginal, PATHINFO_EXTENSION); 
$nome_sem_extensao = pathinfo($nomeOriginal, PATHINFO_FILENAME);

// Move o arquivo para a pasta desejada
$destino = '../pagina_produtos/img' . $nome_imagem; // Altere para o caminho da sua pasta
move_uploaded_file($_FILES['imagem_produto']['tmp_name'], $destino);

// Cadastra as informações do produto no banco de dados
$sql = "INSERT INTO loja.produtos (nome_imagem, nome, descricao, valor, quantidade, data_cadastro) 
        VALUES ('$nome_sem_extensao.$extensao', '$nome', '$descricao', '$valor', '$quantidade', '$data_cadastro')";

// Confirmação da inserção dos dados no banco de dados
if ($conexao->query($sql) === TRUE) {
    $alerta = array("sucesso" => true, "mensagem" => "Cadastro efetuado com sucesso!\nVocê será redirecionado para página de login.");
    echo json_encode($alerta);
} else {
    $alerta = array("sucesso" => false, "mensagem" => "Erro efetuar o cadastro: " . $conexao->error);
    echo json_encode($alerta);
}

// Encerra a conexão com o banco de dados
$conexao->close();
?>

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

// Confirmação da existencia da variável e se ela não e nula, essa confirmação é efetuada por meio da função isset
if(isset($_POST['usuario_input']) && isset($_POST['senha_input'])){

    // Retorno do comprimento de uma string e dessa forma confirma se houve o foi digitado o e-mail e a senha, por meio do uso 
    // da função strlen
    if(strlen($nome_usuario = $_POST['usuario_input']) == 0) {
        $alerta = array("sucesso" => false, "mensagem" => "Insira o seu nome");
        echo json_encode($alerta); //Envio da mensagem por JSON
    }
    else if(strlen($_POST['senha_input']) == 0){
        $alerta = array("sucesso" => false, "mensagem" => "Insira a senha");
        echo json_encode($alerta);
    }
    else {
        //Evita o uso de caracteres especiais com o intuito de efetuar a conexão sem permissão
        $nome_usuario = $conexao -> real_escape_string($_POST['usuario_input']);
        $senha = $conexao -> real_escape_string($_POST['senha_input']);

        // Seleção das colunas na tabela cliente
        $codigo_sql = "SELECT * FROM loja.usuario WHERE email = '$nome_usuario' AND senha = '$senha'";
        $sql_query = $conexao -> query($codigo_sql) or die("Não foi possível executar o codigo: " . $conexao -> connect_error); 

        $quantidade_consulta = $sql_query -> num_rows;

        // Verificação da existencia do e-mail e da senha no banco de dados
        if($quantidade_consulta == 1){
            $usuario = $sql_query -> fetch_assoc();
            if(!isset($_SESSION)){
                session_start();
            }
               
            $_SESSION['codigo'] = $usuario['codigo'];
            $_SESSION['nome'] = $usuario['nome'];
            $alerta = array("sucesso" => true, "mensagem" => "Login realizado com sucesso.");
            echo json_encode($alerta);

        }

        else{
            $alerta = array("sucesso" => false, "mensagem" => "Não foi possível logar.\nO usuário ou a senha estão incorretos. ");
            echo json_encode($alerta);
         
        }
         }
    
}

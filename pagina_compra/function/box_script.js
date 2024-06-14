function formas_pagamento() {
    const metodo_pagamento = document.querySelector('input[name="metodo_pagamento"]:checked').value;

    // Esconder todas as boxes de pagamento
    document.getElementById('input_credito').style.display = 'none';
    document.getElementById('boleto_box').style.display = 'none';
    document.getElementById('pix_box').style.display = 'none';

    // Mostrar a box de pagamento correspondente
    if (metodo_pagamento === 'cartao_credito') {
        document.getElementById('input_credito').style.display = 'block';
    } else if (metodo_pagamento === 'boleto') {
        document.getElementById('boleto_box').style.display = 'block';
    } else if (metodo_pagamento === 'pix') {
        document.getElementById('pix_box').style.display = 'block';
    }
}

// Exibir as inputs box correspondentes ao cartão de crédito quando a página é carregada
window.onload = function() {
    document.getElementById('input_credito').style.display = 'block';
};




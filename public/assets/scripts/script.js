const fileInput = document.getElementById('img');
const preview = document.getElementById('previa');

// Atualiza o nome do arquivo e mostra a pré-visualização
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file) {
    // Atualiza o nome do arquivo

    // Cria um FileReader para ler o arquivo
    const reader = new FileReader();
    reader.onload = function(e) {
      // Define o src da imagem de pré-visualização
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);  // Lê o arquivo como uma URL de dados (base64)
  } else {

    preview.src = '';
    preview.style.display = 'none';
  }
});
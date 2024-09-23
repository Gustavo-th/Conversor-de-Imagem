const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configura o Multer para armazenar o arquivo temporariamente
const upload = multer({ dest: 'uploads/' });
app.use(express.static(path.join(__dirname, '../../index.html')));
// Rota para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// Rota para fazer upload e converter a imagem
app.post('/upload', upload.single('image'), async (req, res) => {
  const formato = req.body.format;
  const inputPath = req.file.path;
  const outputPath = `uploads/convertida.${formato}`;

  try {
    // Converte a imagem usando Sharp
    await sharp(inputPath)
      .toFormat(formato)
      .toFile(outputPath);

    // Envia a imagem convertida como resposta
    res.download(outputPath, `imagem-convertida.${formato}`, (err) => {
      if (err) {
        console.error('Erro ao enviar o arquivo:', err);
      }

      // Remove os arquivos temporários após o download
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error('Erro ao processar a imagem:', err);
    res.status(500).send('Erro ao processar a imagem.');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

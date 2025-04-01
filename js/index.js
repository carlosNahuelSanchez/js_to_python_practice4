const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Petición: ${req.url}`);

    if (req.method === 'POST' && req.url === '/sumar') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { matriz1, matriz2 } = JSON.parse(body);

            const matrizResultado = matriz1.map((fila, i) =>
                fila.map((val, j) => val + matriz2[i][j])
            );

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ matrizResultado }));
        });

    } else {
        let filePath = req.url === '/' ? 'public/index.html' : `public${req.url}`;
        filePath = path.join(__dirname, filePath);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }
});

const PORT = 4500;
server.listen(PORT, '0.0.0.0', () => {  
    console.log(`Servidor iniciado en puerto ${PORT}`);
});

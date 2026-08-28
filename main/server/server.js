const http = require('http');

const server = http.createServer((request, response) => {

    // CORS
    response.setHeader(
        'Access-Control-Allow-Origin',
        'http://127.0.0.1:5500'
    );

    response.setHeader(
        'Access-Control-Allow-Methods',
        'POST, OPTIONS'
    );

    response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    // Preflight request
    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    // POST /api/shorten
    if (
        request.method === 'POST' &&
        request.url === '/api/shorten'
    ) {

        let body = '';

        request.on('data', chunk => {
            body += chunk;
        });

        request.on('end', async () => {

            console.log('Data received:', body);

            const data = JSON.parse(body);

            const url = data.url;

            console.log('URL received:', url);

            try {

                const cleanURIResponse = await fetch(
                    'https://cleanuri.com/api/v1/shorten',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `url=${encodeURIComponent(url)}`
                    }
                );

                if (!cleanURIResponse.ok) {
                    throw new Error(
                        `CleanURI returned HTTP ${cleanURIResponse.status}`
                    );
                    
                }

                const result = await cleanURIResponse.json();

                console.log('CleanURI response:', result);

                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                response.end(
                    JSON.stringify(result)
                );

            } catch (error) {

                console.error('CleanURI error:', error);

                response.writeHead(500, {
                    'Content-Type': 'application/json'
                });

                response.end(
                    JSON.stringify({
                        error: 'Unable to shorten URL'
                    })
                );
            }
        });

        return;

    }

    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    response.end('Route not found');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up on ${PORT}`);
});
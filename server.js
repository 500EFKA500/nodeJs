//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// СЕРВЕР
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//node модули
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// наши модули
const helper = require('./utils/helper');
const fileManager = require('./utils/fileManager');

let notes = fileManager.loadData();

const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    // API
    if(url === '/' && method === 'GET' ){
        const html = await fs.readFile(path.join(__dirname, "index.html"), "utf-8");
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    }

    return;
});

server.listen(3002, () => {
    console.log("Сервер запущен http://localhost:3002");
});
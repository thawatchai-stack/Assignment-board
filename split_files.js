const fs = require('fs');
const path = require('path');

function processFile(filename, cssName, jsName) {
    console.log(`Processing ${filename}...`);
    const filePath = path.join(__dirname, filename);
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract style
    const styleRegex = /<style>([\s\S]*?)<\/style>/i;
    const styleMatch = content.match(styleRegex);
    if (styleMatch) {
        fs.writeFileSync(path.join(__dirname, cssName), styleMatch[1].trim());
        content = content.replace(styleRegex, `<link rel="stylesheet" href="${cssName}">`);
        console.log(`Extracted CSS to ${cssName}`);
    }

    // Extract script (first module script is the main one usually)
    const scriptRegex = /<script type="module">([\s\S]*?)<\/script>/i;
    const scriptMatch = content.match(scriptRegex);
    if (scriptMatch) {
        fs.writeFileSync(path.join(__dirname, jsName), scriptMatch[1].trim());
        content = content.replace(scriptRegex, `<script type="module" src="${jsName}"></script>`);
        console.log(`Extracted JS to ${jsName}`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`${filename} updated successfully.`);
}

processFile('admin.html', 'admin.css', 'admin.js');
processFile('index.html', 'app.css', 'app.js');

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (match) {
    fs.writeFileSync('check.js', match[1]);
    console.log('check.js written');
} else {
    console.log('No script found');
}

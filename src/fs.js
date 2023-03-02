const fs = require('fs');

function writeFile(file,text){
    fs.writeFile(file, text, (err) => {
        if (err) console.log(err);
    });
}
module.exports = {writeFile}
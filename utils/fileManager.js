const fs = require("fs");
const path = 'note.json'

const saveData = (notes) => {
    jsonData = JSON.stringify(notes);
    fs.writeFileSync(path, jsonData);
    console.log("заметки сохранены!")
};

const loadData = () => {
    try{
        const jsonData = fs.readFileSync(path, 'utf-8');
        return JSON.parse(jsonData);
    }
    catch(error){
        return [];
    }
};

module.exports = {saveData, loadData}
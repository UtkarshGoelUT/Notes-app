const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find(note => note.title === title);
    debugger
    if (duplicate) {
        console.log(chalk.red.inverse('Note already present'));
        return;
    }
    const data = {
        title,
        body
    }
    notes.push(data);
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note added"));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const data = notes.filter(note => note.title !== title);
    if (notes.length === data.length) {
        console.log(chalk.red.inverse('Note not present'));
    }
    else {
        saveNotes(data);
        console.log(chalk.green.inverse('Note removed'));
    }
}

const listNotes = () => {
    const data = loadNotes();
    data.forEach(note => {
        console.log(chalk.blue(note.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const data = notes.find(note => note.title === title);
    if (data) {
        console.log(chalk.white.inverse('YOUR NOTE'));
        console.log(chalk.green.bold(data.title));
        console.log(chalk.blue(data.body));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

module.exports =
{
    addNote,
    removeNote,
    listNotes,
    readNote
}
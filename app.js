const Notes = require('./notes');
const yargs = require('yargs');
const chalk = require('chalk');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: chalk.green('This will add the note'),
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body for note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        Notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: chalk.red('This will remove note'),
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        Notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: "This will list notes",
    handler: () => {
        console.log(chalk.green.bold('LISTING NOTES'));
        Notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: "This will read note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("READING", argv.title);
        Notes.readNote(argv.title);
    }
});

yargs.parse();
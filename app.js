const yargs = require("yargs");
const chalk = require("chalk");
const { listNotes, addNote, removeNote, readNote } = require("./notes");

//Using yargs to log command line args. This is the version of our app, that we want to display in CMD line
yargs.version("1.0.0");

// Create add command, when you do this. when you call node app add. it will automatically call the handler for it
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    // Saving the note in notes.json
    console.log(chalk.greenBright(`Adding a new note : ${argv.title}`));
    addNote(argv.title, argv.body);
  }
});

// Similarly create remove command
yargs.command({
  command: "remove",
  describe: "Remove an existing note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    // Removing the existing note from notes.json
    console.log(chalk.yellowBright(`Removing the existing note : ${argv.title}`));
    removeNote(argv.title);
  }
});

// Challenge - Create list and read command. List to list all the notes
// Read to read a particular note
yargs.command({
  command: "list",
  describe: "List all the notes",
  handler: () => {
    // Getting back all the notes
    listNotes();
  }
});

// Read Notes
yargs.command({
  command: "read",
  describe: "Read one note",
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: "string"
    }
  }, 
  handler: argv => {
    console.log(chalk.magentaBright("Fetching Note...."));
    readNote(argv.title);
  }
});


yargs.parse();

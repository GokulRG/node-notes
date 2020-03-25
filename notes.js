const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
	console.log(chalk.greenBright('Fetching all the notes...'));
	const existingNotes = loadNotes();

	if (existingNotes && existingNotes.length > 0) {
		existingNotes.forEach((note) => console.log(chalk.magentaBright.inverse(`Title : ${note.title}`)));
	} else {
		console.log(chalk.redBright.inverse("Sorry, I didn't find any notes to display"));
	}
};

const addNote = (title, body) => {
	if (!title || !body) {
		console.log(chalk.redBright.inverse('Error while adding note. Invalid fields'));
		return;
	}

	// Get existing notes
	const existingNotes = loadNotes();

	// Don't use filter here because filter will look through all the notes regardless of whether it
	// finds one or many.. but in our case, we will only find one..because the whole point of this is
	// to not save duplicate notes
	// const duplicateNotes = existingNotes.filter(note => note.title === title);

	const duplicateNote = existingNotes.find((note) => note.title === title);

	if (!duplicateNote) {
		// Create new note
		const note = {};
		note.title = title;

		note.body = body;

		// Add new note to the existing notes
		existingNotes.push(note);

		//Write file and overwrite it
		saveNotes(existingNotes);

		console.log(chalk.greenBright.inverse(`Note : ${title} saved successfully`));
	} else {
		console.log(chalk.redBright.inverse('Unable to add note because of duplicate title'));
	}
};

readNote = (title) => {
  if (!title) {
    console.log(chalk.redBright.inverse('Error while fetching note. Invalid title'));
    return;
  }

  const notesJSON = loadNotes();
  debugger;
  const ourNote = notesJSON.find(note => note.title === title);

  if (ourNote) {
    console.log(chalk.cyanBright.inverse(`${ourNote.title}`));
    console.log(chalk.cyanBright.inverse('----------------------------'));
    console.log(chalk.cyanBright.inverse(`${ourNote.body}`));
  } else {
    console.log(chalk.redBright.inverse('Sorry, No note found with the given title!'));
  }
}

removeNote = (title) => {
	if (!title) {
		console.log(chalk.redBright.inverse('Error while removing note. Invalid title'));
		return;
	}

	const notesJSON = loadNotes();
	// Filtering out the inverse condition so we only get the notes that don't have the provided title
	const filteredNotes = notesJSON.filter((note) => note.title !== title);

	if (filteredNotes.length === notesJSON.length) {
		console.log(chalk.redBright.inverse('No existing note matched with the title, no note removed!'));
		return;
	}

	// Saving the notes back again
	saveNotes(filteredNotes);

	console.log(chalk.greenBright.inverse(`Note : ${title} removed successfully`));
};

loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataString = dataBuffer.toString();
		return JSON.parse(dataString);
	} catch (err) {
		return [];
	}
};

saveNotes = (notes) => {
	fs.writeFileSync('notes.json', JSON.stringify(notes));
};

module.exports = {
	listNotes,
	addNote,
  removeNote,
  readNote
};

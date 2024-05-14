let notes = [{
    id : 1,
    title : "My first Notes",
    timestamp : Date.now(),
    contents : " this is teh first ever note being added into a notes  app."
},{
    id : 2,
    title : "My second notes",
    timestamp: Date.now(),
    contents : "Yo this is another note."
}
];

function getNotes(searchTerm){
    if(!searchTerm){
        return notes;
    }
    else {
        return notes.filter(note => note.title.includes(searchTerm)||note.contents.includes(searchTerm));
    }
}
exports.getNotes = getNotes;

function getNote(id){
    const note = notes.find(note => note.id === id); 
    return note;
}
exports.getNote = getNote;

function deleteNote(id){
    notes = notes.filter(note => note.id !== id);
}
exports.deleteNote = deleteNote;

function addNote(note){
    notes.push({
        id : notes.length + 1,
        title : note.title,
        contents : note.contents,
        timestamp : Date.now()
    });

    //or simply use notes.push({
    //     ...note,
    //     id:notes.length+1,
    //     timestamp:Date.now()
    // })
    return getNote(notes.length);
}
exports.addNote = addNote;

//590125678
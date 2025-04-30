import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

type noteType = {
    createdAt: string,
    updatedAt: string,
    title: string,
    password: string,
    description?: string,
    oldVersions: noteType[],
    id: string,
    isFavourite?: boolean,
    isSaved?: boolean,
    isArchived?: boolean,
}

type initialState = {
    notes: noteType[],
}

type createNoteType = {
    title: string,
    password: string,
    description?: string,
    isFavourite?: boolean,
    isSaved?: boolean,
    isArchived?: boolean,
}

const initialState: initialState = {
    notes: [],
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNote: (state, action: PayloadAction<createNoteType>) => {
            state.notes.push({
                ...action.payload,
                createdAt: `${new Date()}`,
                updatedAt: `${new Date()}`,
                id: uuidv4(),
                oldVersions: [],
            });
        },
        updateNote: (state, action: PayloadAction<{ id: string, note: createNoteType }>) => {
            const noteIndex = state.notes.findIndex(note => note.id === action.payload.id);
            if (noteIndex !== -1) {
                const existingNote = state.notes[noteIndex];
                const updatedNote = {
                    ...existingNote,
                    ...action.payload.note,
                    updatedAt: `${new Date()}`,
                    oldVersions: [
                        ...existingNote.oldVersions,
                        { ...existingNote }  // Save previous version
                    ]
                };
                state.notes[noteIndex] = updatedNote;
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    }
})

export const { setNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice;
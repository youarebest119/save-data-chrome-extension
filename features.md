# 📦 Features

## ✅ Current Build Features #Apr 30

### 📄 Pages
- Home

### 🔐 Access
- User can access the application by entering a key.
- User can change their access key by entering the current key and a new key.

### ⚙️ Settings
- User can export all data (current version only).

### 📝 New Note
- User can add a new note by entering a title and password in the accordion on the homepage.

### 📚 Notes
Each note contains the following fields:
- `title`
- `password`
- `createdAt`
- `updatedAt`
- `oldVersions`
- `id`

In the UI, users can:
- View all notes
- View note titles
- Reveal passwords by clicking the eye icon
- Copy passwords without revealing them by clicking the copy icon
- Access more options via the three-dot menu:
  - Edit the note
  - Delete the note (with confirmation popup)
  - View the last updated date
- Search notes by:
  - ID
  - Title
  - Created At
  - Updated At
  - Password
- Scroll through the list of notes as needed

---

## 🚀 Future Features

### 📤 Export Enhancements
- Export data including old versions
- Export a single note with its old versions
- Export only selected fields

### 🧩 Notes Enhancements
- Save a note
- Archive a note
- Access old versions of a note
- Mark a note as favourite
- Filter notes to show only favourites

### 🗂️ Data Import
- Allow users to import notes by dropping an XML file that uses the same structure as the app

### 🔄 Routes
- Get only favourite notes
- Get only saved notes
- Get only archived notes

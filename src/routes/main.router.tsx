import { Navigate, Route, Routes } from "react-router-dom";

import { NotesPage } from "../features/notes/pages/notes/notes.page";
import { NoteDetail } from "../features/notes/pages/note-detail/note-detail";
import { CrudNotePage } from "../features/notes/pages/crud-note/crud-note.page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/note/:id" element={<NoteDetail />} />
      <Route path="/note-crud/:operation" element={<CrudNotePage />} />
      <Route path="/main" element={<Navigate to="/notes" />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";

import { FilePage } from "../features/notes/pages/folder/folder.page";
import { NoteDetail } from "../features/notes/pages/note-detail/note-detail";
import { CrudNotePage } from "../features/notes/pages/crud-note/crud-note.page";
import { ConfirmEmailPage } from "../features/notes/pages/confirm-email/confirm-email.page";

import { MAIN_REOTES } from "./_routes-names";

export function MainRouter() {
  return (
    <Routes>
      <Route path={MAIN_REOTES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
      <Route path={MAIN_REOTES.NOTES} element={<FilePage />} />
      <Route path={MAIN_REOTES.NOTE_DETAIL} element={<NoteDetail />} />
      <Route path={MAIN_REOTES.NOTE_CRUD} element={<CrudNotePage />} />
      <Route path="/main" element={<Navigate to={MAIN_REOTES.NOTES} />} />
    </Routes>
  );
}

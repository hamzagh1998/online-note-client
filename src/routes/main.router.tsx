import { Navigate, Route, Routes } from "react-router-dom";

import { CurrentContentPage } from "../features/content-management/pages/content-hub/current-content.page";
import { NoteDetail } from "../features/content-management/pages/note-detail/note-detail.page";
import { CreateEditNotePage } from "../features/content-management/pages/crud-note/create-edit-note.page";
import { ConfirmEmailPage } from "../features/content-management/pages/confirm-email/confirm-email.page";

import { MAIN_REOTES } from "./_routes-paths";

export function MainRouter() {
  return (
    <Routes>
      <Route path={MAIN_REOTES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
      <Route path={MAIN_REOTES.NOTES} element={<CurrentContentPage />} />
      <Route path={MAIN_REOTES.NOTE_DETAIL} element={<NoteDetail />} />
      <Route path={MAIN_REOTES.NOTE_CRUD} element={<CreateEditNotePage />} />
      <Route path="/main" element={<Navigate to={MAIN_REOTES.NOTES} />} />
    </Routes>
  );
}

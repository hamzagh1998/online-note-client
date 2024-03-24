import { Navigate, Route, Routes } from "react-router-dom";

import { CurrentContentPage } from "../features/content-management/pages/content-hub/current-content.page";
import { NoteDetail } from "../features/content-management/pages/note-detail/note-detail.page";
import { CreateEditNotePage } from "../features/content-management/pages/crud-note/create-edit-note.page";
import { ConfirmEmailPage } from "../features/content-management/pages/confirm-email/confirm-email.page";

import { MAIN_ROUTES } from "./_routes-paths";

export function MainRouter() {
  return (
    <Routes>
      <Route path={MAIN_ROUTES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
      <Route path={MAIN_ROUTES.NOTES} element={<CurrentContentPage />} />
      <Route path={MAIN_ROUTES.NOTE_DETAIL + "/:id"} element={<NoteDetail />} />
      <Route path={MAIN_ROUTES.NOTE_CRUD} element={<CreateEditNotePage />} />
      <Route path="/main" element={<Navigate to={MAIN_ROUTES.NOTES} />} />
    </Routes>
  );
}

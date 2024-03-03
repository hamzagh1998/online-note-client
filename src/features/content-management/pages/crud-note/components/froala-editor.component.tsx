import { useEffect } from "react";
import { useSelector } from "react-redux";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorInstance from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

import { RootState } from "../../../../../redux/store";

import { useCreateNote } from "../hooks/use-create-note";

import { useUploadToFirebaseStorage } from "../../hooks/use-upload-to-firebase-storage";
import { ToastComponent } from "../../../../../common/components/toast/toast.component";
import { NoteRequest } from "../../../slices/api/content/api.types";

import { Note } from "../../types";

type Props = {
  height: number;
  note: Note;
  files: Array<{ url: string; fileSizeMB: number }>;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setFiles: React.Dispatch<
    React.SetStateAction<Array<{ url: string; fileSizeMB: number }>>
  >;
};

export function FroalaComponent({
  height,
  note,
  files,
  setNote,
  setFiles,
}: Props) {
  const userData = useSelector((store: RootState) => store.auth.userData);
  const { currentFolder } = useSelector((store: RootState) => store.profile);

  const { payload, firebasError, uploadFileToFbStorage } =
    useUploadToFirebaseStorage();
  const { success, onCreateNote, error } = useCreateNote();

  useEffect(() => {
    if (!payload) return;
    setFiles((prevState) => [
      ...prevState,
      { url: payload.ressourceLink, fileSizeMB: payload.fileSizeMB },
    ]);
  }, [payload]);

  async function handleFileUpload(
    editor: FroalaEditorInstance,
    files: FileList,
    type: string
  ) {
    const file = files[0];
    const downloadURL = await uploadFileToFbStorage(
      file,
      userData?.email || "Unknown",
      currentFolder.id
    );

    if (downloadURL) {
      const element = editor[type].get();
      editor[type].insert(downloadURL, null, null, element);
    }
    return false; // Prevent Froala from handling the upload
  }

  const config = {
    height: height,
    events: {
      // Event triggered when a file is uploaded
      "file.beforeUpload": function (files: FileList) {
        return handleFileUpload(this, files, "file");
      },

      // Event triggered when a file is uploaded
      "image.beforeUpload": function (files: FileList) {
        return handleFileUpload(this, files, "image");
      },
    },
    fileMaxSize: 1024 * 1024 * 3,
  };

  const createNoteHandler = () => {
    setNote({
      ...note,
      title: { ...note.title, error: null },
      content: { ...note.content, error: null },
    });
    if (!note.title.value.length)
      return setNote({
        ...note,
        title: { ...note.title, error: "Please enter your note title" },
      });
    if (!note.content.value.length)
      return setNote({
        ...note,
        content: { ...note.content, error: "Please enter your note content" },
      });
    const payload: NoteRequest = {
      title: note.title.value,
      content: note.title.value,
      parentDirectory: currentFolder.id,
      ressourceLinks: files,
    };
    onCreateNote(payload);
  };

  return (
    <div>
      <FroalaEditorComponent
        tag="textarea"
        config={config}
        onModelChange={(content: string) => {
          setNote((prevNote) => ({
            ...prevNote,
            content: {
              ...prevNote.content,
              value: content,
            },
          }));
        }}
      />
      <div className="flex justify-end items-center gap-4 w-full mt-4">
        <div className="flex justify-center items-center rounded-xl w-36 py-2 bg-skin-button-base text-skin-inverted font-bold cursor-pointer hover:opacity-90">
          Cancel
        </div>
        <div
          className="flex justify-center items-center rounded-xl w-36 py-2 bg-skin-button-accent text-white font-bold cursor-pointer hover:opacity-90"
          onClick={createNoteHandler}
        >
          Save
        </div>
      </div>
      {firebasError ? (
        <ToastComponent type="error" message={firebasError} />
      ) : null}
      {error ? <ToastComponent type="error" message={error} /> : null}
      {success ? (
        <ToastComponent type="success" message="Note created successfully" />
      ) : null}
    </div>
  );
}

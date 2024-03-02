import { useSelector } from "react-redux";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorInstance from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

import { RootState } from "../../../../../redux/store";

import { useUploadToFirebaseStorage } from "../../content-hub/hooks/use-upload-to-firebase-storage";
import { useEffect } from "react";
import { ToastComponent } from "../../../../../common/components/toast/toast.component";

type Props = {
  height: number;
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setFilesLinks: React.Dispatch<React.SetStateAction<string[]>>;
};

type Note = {
  title: {
    value: string;
    placeholder: string;
    error: null;
  };
  content: {
    value: string;
    placeholder: string;
    error: null;
  };
};

export function FroalaComponent({
  height,
  note,
  setNote,
  setFilesLinks,
}: Props) {
  const userData = useSelector((store: RootState) => store.auth.userData);
  const { currentFolder } = useSelector((store: RootState) => store.profile);

  const { payload, firebasError, uploadFileToFbStorage } =
    useUploadToFirebaseStorage();

  useEffect(() => {
    if (!payload) return;
    setFilesLinks((prevState) => [...prevState, payload.ressourceLink]);
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
      {firebasError ? (
        <ToastComponent type="error" message={firebasError} />
      ) : null}
    </div>
  );
}

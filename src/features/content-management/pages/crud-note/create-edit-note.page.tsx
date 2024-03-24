import { useState, useEffect, useMemo } from "react";
import { FroalaComponent } from "./components/froala-editor.component";
import { CustomInput } from "../../../../common/components/inputs/custom-input";
import { Note } from "../types";

export function CreateEditNotePage() {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  const [note, setNote] = useState<Note>({
    title: { value: "", placeholder: "Enter the note title", error: null },
    content: { value: "", placeholder: "Enter the note content", error: null },
  });
  const [files, setFiles] = useState<
    Array<{ url: string; fileSizeMB: number }>
  >([]);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const editorHeight = useMemo(
    () =>
      pageHeight > 600 ? (pageHeight * 70) / 100 : (pageHeight * 45) / 100,
    [pageHeight]
  );

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full h-full py-12 px-10 max-sm:p-0">
        <CustomInput
          value={note.title.value}
          setValue={(value: string) =>
            setNote({
              ...note,
              title: {
                ...note.title,
                value,
              },
            })
          }
          error={note.title.error}
          placeholder={note.title.placeholder}
        />
        <br />
        <FroalaComponent
          height={editorHeight}
          note={note}
          files={files}
          setNote={setNote}
          setFiles={setFiles}
        />
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import { FroalaComponent } from "./components/froala-editor.component";
import { CustomInput } from "../../../../common/components/inputs/custom-input";

export function CreateEditNotePage() {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  const [note, setNote] = useState({
    title: { value: "", placeholder: "Enter the note title", error: null },
    content: { value: "", placeholder: "Enter the note content", error: null },
  });
  const [filesLinks, setFilesLinks] = useState<string[]>([]);

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
      pageHeight > 600 ? (pageHeight * 75) / 100 : (pageHeight * 50) / 100,
    [pageHeight]
  );

  console.log(note);

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
          setNote={setNote}
          setFilesLinks={setFilesLinks}
        />
      </div>
    </div>
  );
}

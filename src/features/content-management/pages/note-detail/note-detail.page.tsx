import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLazyNoteDetailQuery } from "../../slices/api/content/notes.service";

import { SpinnerIndicatorsComponent } from "../../../../common/components/activities-indicators/spinner-indicators.component";
import { ToastComponent } from "../../../../common/components/toast/toast.component";

type Note = {
  title: string;
  content: string;
  fileSize: string;
  createdAt: string;
  isShared: boolean;
  isFavorite: boolean;
};

export function NoteDetail() {
  const { id } = useParams();

  const [getNoteDetail] = useLazyNoteDetailQuery();

  const [note, setNote] = useState<Note>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onGetNoteDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getNoteDetail(id);
      setNote(res.data.detail);
    } catch (error) {
      setError("Error happen while fetching note detail!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    onGetNoteDetail(id);
  }, []);

  return (
    <div>
      {isLoading || !note ? (
        <SpinnerIndicatorsComponent />
      ) : (
        <div className="w-full h-full px-20 py-12 max-sm:px-4">
          <p className="font-bold text-4xl mb-4">{note.title}</p>
          <div
            className="w-full min-h-screen overflow-x-hidden h-fit whitespace-normal"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      )}
      {error ? <ToastComponent type="error" message={error} /> : null}
    </div>
  );
}

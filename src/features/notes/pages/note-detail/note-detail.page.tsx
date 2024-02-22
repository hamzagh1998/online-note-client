import { useParams } from "react-router-dom";

export function NoteDetail() {
  const { id } = useParams();

  return <div>note-detail: {id}</div>;
}

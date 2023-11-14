import { useParams } from "react-router-dom";

type Operation = "create" | "update";

export function CrudNotePage() {
  const { operation } = useParams<{ operation: Operation }>();
  return <div>crud-note.page, {operation}</div>;
}

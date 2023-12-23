import { signOut } from "firebase/auth";

import { auth } from "../../../../libs/firebase";

export function NotesPage() {
  const onSignOut = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen overflow-x-hidden">
      <button onClick={onSignOut}>Logout</button>
    </div>
  );
}

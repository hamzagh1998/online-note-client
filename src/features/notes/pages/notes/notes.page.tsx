import { signOut } from "firebase/auth";

import { auth } from "../../../../libs/firebase";

import { HeaderComponent } from "../../../../common/components/header/header.component";

import { useInfoQuery } from "../../slices/api/profile/profile.service";

export function NotesPage() {
  const { isLoading } = useInfoQuery({});

  const onSignOut = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
      alert("Ooops, Unexpected error!");
    }
  };

  return (
    <div className="h-screen overflow-x-hidden">
      <HeaderComponent isLoading={isLoading} />
      <br />
      <button onClick={onSignOut}>Logout</button>
    </div>
  );
}

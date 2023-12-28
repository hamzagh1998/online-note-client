import { HeaderComponent } from "../../../../common/components/header/header.component";

import { useInfoQuery } from "../../slices/api/profile/profile.service";

export function NotesPage() {
  const { isLoading } = useInfoQuery({});

  return (
    <div className="h-screen overflow-x-hidden">
      <HeaderComponent isLoading={isLoading} />
      <br />
    </div>
  );
}

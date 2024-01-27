import { useNavigate } from "react-router-dom";

import { Header as AppHeader } from "../../../components/Headers";
import { Text } from "../../../components/Text";
import { ChevronLeft } from "../../../icons/ChevronLeft";

export function Header() {
  const navigate = useNavigate();
  return (
    <AppHeader>
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-0 left-0 top-0 flex items-center"
      >
        <div className="pr-4" />
        <ChevronLeft className="shrink-0" />
      </button>
      <Text>Details</Text>
    </AppHeader>
  );
}

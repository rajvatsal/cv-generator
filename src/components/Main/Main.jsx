import { Settings } from "../Settings/Settings.jsx";
import { Previewer } from "../Previewer/Previewer.jsx";

export function Main() {
  return(
    <main>
      <div id="main__content">
        <Settings />
        <Previewer />
      </div>
    </main>
  );
}

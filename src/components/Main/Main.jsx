import "./Main.scss";

import { Controls } from "../Controls/Controls.jsx";
import { Previewer } from "../Previewer/Previewer.jsx";

export function Main() {
  return(
    <main>
      <div className="main__content">
        <Controls />
        <Previewer />
      </div>
    </main>
  );
}

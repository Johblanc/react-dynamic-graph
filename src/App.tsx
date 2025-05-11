import "./App.css";
import { AllContexts } from "./Context/AllContexts";
import { Page001 } from "./Page001";

export function App() {
  return (
    <div className="App">
      <AllContexts>
        <Page001 />
      </AllContexts>
    </div>
  );
}

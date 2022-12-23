import Main from "./Main";
import { ContextProvider } from "./src/context/context";

export default function App() {
  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
}

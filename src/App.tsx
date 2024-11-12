import StoicContainer from "./containers/StoicContainer/StoicContainer";
import QuoteContextProvider from "./context/quote/provider";
import { ThemeProvider } from "./context/theme/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="stoic-ui-theme">
      <QuoteContextProvider>
        <StoicContainer />
      </QuoteContextProvider>
    </ThemeProvider>
  );
}

export default App;

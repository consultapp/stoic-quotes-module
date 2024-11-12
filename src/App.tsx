import { ThemeProvider } from "./components/theme/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="stoic-ui-theme">
      <>QQQ</>
    </ThemeProvider>
  );
}

export default App;

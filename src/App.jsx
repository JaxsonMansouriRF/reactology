import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './utils/Context/ThemeContext.jsx';

function App() {
  return (
    <>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </>
  );
}

export default App;

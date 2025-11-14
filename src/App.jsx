import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './utils/Context/ThemeContext.jsx';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout.jsx';

function App() {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <Dashboard />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;

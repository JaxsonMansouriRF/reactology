import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './utils/Context/ThemeContext.jsx';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout.jsx';
import Events from './pages/Events.jsx';

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*  Child routes*/}
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/attendees'} element={<div>Attendees</div>} />
            <Route path={'/events/:eventId'} element={<Events />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

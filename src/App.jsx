import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './pages/Dashboard';

const MyComponent = ({ children }) => {
  return (
      <div clas>
        {children}
      </div>
  )
}


function App() {
  return (
    <>
      <Dashboard />

      <MyComponent >
        <p>This is a child paragraph inside MyComponent.</p>
      </MyComponent>
    </>
  )
}

export default App

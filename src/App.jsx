import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import AccessibleForm from './components/AccessibleForm.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AccessibleForm />
    </>
  );
}

export default App;

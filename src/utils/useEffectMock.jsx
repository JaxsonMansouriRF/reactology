import react, { useEffect } from 'react';

const [email, setEmail] = useState('');

useEffect(() => {
  setInterval();
  return () => {
    clearInterval();
  };
}, [email, password, password2]);

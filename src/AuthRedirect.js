import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext'; // Adjust the import path according to your file structure

const AuthRedirect = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

export default AuthRedirect;

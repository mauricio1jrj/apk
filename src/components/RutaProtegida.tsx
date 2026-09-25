import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface RutaProtegidaProps {
  children: ReactNode;
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({
  children
}) => {
  const token = localStorage.getItem('api_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RutaProtegida;
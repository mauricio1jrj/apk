import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  );

  const cerrarSesion = () => {
    localStorage.removeItem('api_token');
    localStorage.removeItem('usuario');
    navigate('/', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FACTURAPP</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Bienvenido {usuario.nombre}</h1>

        <p>Rol: {usuario.rol}</p>

        <IonButton
          expand="block"
          onClick={() => navigate('/clientes')}
        >
          Clientes
        </IonButton>

      <IonButton
        expand="block"
        onClick={() => navigate('/productos')}
      >
        Productos
      </IonButton>
      
      <IonButton
        expand="block"
        onClick={() => navigate('/facturas')}
      >
        Facturas
      </IonButton>

      <IonButton
        expand="block"
        onClick={() => navigate('/detalles')}
      >
        Detalles de Facturas
      </IonButton>

      <IonButton
        expand="block"
        onClick={() => navigate('/vendedores')}
      >
        Vendedores
      </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
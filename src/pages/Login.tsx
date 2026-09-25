import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    setMensaje('Iniciando sesión...');

    try {
      const respuesta = await fetch(
        'http://localhost:5001/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(
          datos.message || 'Correo o contraseña incorrectos'
        );
        return;
      }

      localStorage.setItem(
        'api_token',
        datos.access_token
      );

      localStorage.setItem(
        'usuario',
        JSON.stringify(datos.usuario)
      );

      console.log(
        'Respuesta del backend:',
        JSON.stringify(datos, null, 2)
      );

      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      setMensaje(
        'No se pudo conectar con el backend'
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FACTURAPP</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div
          style={{
            maxWidth: '400px',
            margin: '80px auto'
          }}
        >
          <h1>Iniciar sesión</h1>

          <IonItem>
            <IonInput
              label="Correo"
              labelPlacement="stacked"
              type="email"
              value={email}
              onIonInput={(e) =>
                setEmail(e.detail.value ?? '')
              }
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Contraseña"
              labelPlacement="stacked"
              type="password"
              value={password}
              onIonInput={(e) =>
                setPassword(e.detail.value ?? '')
              }
            />
          </IonItem>

          <IonButton
            expand="block"
            className="ion-margin-top"
            onClick={iniciarSesion}
          >
            Iniciar sesión
          </IonButton>

          {mensaje && (
            <IonText color="danger">
              <p>{mensaje}</p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
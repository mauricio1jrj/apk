import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react';

import {
  IonReactRouter
} from '@ionic/react-router';

import {
  Route
} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Vendedores from './pages/Vendedores';
import Facturas from './pages/Facturas';
import Detalles from './pages/Detalles';

import RutaProtegida
  from './components/RutaProtegida';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/home"
            element={
              <RutaProtegida>
                <Home />
              </RutaProtegida>
            }
          />

          <Route
            path="/clientes"
            element={
              <RutaProtegida>
                <Clientes />
              </RutaProtegida>
            }
          />

          <Route
            path="/productos"
            element={
              <RutaProtegida>
                <Productos />
              </RutaProtegida>
            }
          />

          <Route
            path="/vendedores"
            element={
              <RutaProtegida>
                <Vendedores />
              </RutaProtegida>
            }
          />

          <Route
            path="/facturas"
            element={
              <RutaProtegida>
                <Facturas />
              </RutaProtegida>
            }
          />

          <Route
            path="/detalles"
            element={
              <RutaProtegida>
                <Detalles />
              </RutaProtegida>
            }
          />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
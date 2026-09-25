import { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState(
    'Cargando productos...'
  );

  const cargarProductos = async (page: number) => {
    const token = localStorage.getItem('api_token');

    try {
      setMensaje('Cargando productos...');

      const respuesta = await fetch(
        `http://localhost:5001/productos/?page=${page}&per_page=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(
          datos.message || 'No se pudieron cargar'
        );
        return;
      }

      setProductos(datos.data || []);
      setPagina(datos.meta?.page || page);
      setTotalPaginas(
        datos.meta?.total_pages || 1
      );
      setTotal(datos.meta?.total || 0);
      setMensaje('');

      console.log(
        'Productos:',
        JSON.stringify(datos, null, 2)
      );
    } catch (error) {
      console.error('Error:', error);
      setMensaje(
        'No se pudo conectar con el backend'
      );
    }
  };

  useEffect(() => {
    cargarProductos(pagina);
  }, [pagina]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Lista de productos</h2>

        <p>
          Total de productos: {total}
        </p>

        {mensaje && <p>{mensaje}</p>}

        <IonList>
          {productos.map((producto) => (
            <IonItem key={producto.id}>
              <IonLabel>
                <h2>{producto.nombre}</h2>
                <p>
                  Código: {producto.codigo}
                </p>
                <p>
                  Precio: $ {producto.precio}
                </p>
                <p>
                  Stock: {producto.stock}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          <IonButton
            disabled={pagina <= 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </IonButton>

          <IonButton fill="clear">
            Página {pagina} de {totalPaginas}
          </IonButton>

          <IonButton
            disabled={pagina >= totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Productos;

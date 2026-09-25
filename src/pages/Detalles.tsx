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

const Detalles: React.FC = () => {
  const [detalles, setDetalles] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState(
    'Cargando detalles...'
  );

  const cargarDetalles = async (page: number) => {
    const token = localStorage.getItem('api_token');

    try {
      setMensaje('Cargando detalles...');

      const respuesta = await fetch(
        `http://localhost:5001/detalle_facturas/` +
        `?page=${page}&per_page=5`,
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

      setDetalles(datos.data || []);
      setPagina(datos.meta?.page || page);
      setTotalPaginas(
        datos.meta?.total_pages || 1
      );
      setTotal(datos.meta?.total || 0);
      setMensaje('');

      console.log(
        'Detalles:',
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
    cargarDetalles(pagina);
  }, [pagina]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles de Facturas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Lista de detalles</h2>

        <p>
          Total de detalles: {total}
        </p>

        {mensaje && <p>{mensaje}</p>}

        <IonList>
          {detalles.map((detalle) => (
            <IonItem key={detalle.id}>
              <IonLabel>
                <h2>
                  Detalle #{detalle.id}
                </h2>

                <p>
                  Factura: {detalle.factura_id}
                </p>

                <p>
                  Producto: {detalle.producto_id}
                </p>

                <p>
                  Cantidad: {detalle.cantidad}
                </p>

                <p>
                  Precio unitario:
                  $ {detalle.precio_unitario}
                </p>

                <p>
                  Total:
                  $ {detalle.total}
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

export default Detalles;
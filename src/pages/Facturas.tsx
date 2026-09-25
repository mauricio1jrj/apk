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

const Facturas: React.FC = () => {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState(
    'Cargando facturas...'
  );

  const cargarFacturas = async (page: number) => {
    const token = localStorage.getItem('api_token');

    try {
      setMensaje('Cargando facturas...');

      const respuesta = await fetch(
        `http://localhost:5001/facturas/?page=${page}&per_page=5`,
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

      setFacturas(datos.data || []);
      setPagina(datos.meta?.page || page);
      setTotalPaginas(
        datos.meta?.total_pages || 1
      );
      setTotal(datos.meta?.total || 0);
      setMensaje('');

      console.log(
        'Facturas:',
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
    cargarFacturas(pagina);
  }, [pagina]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Facturas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Lista de facturas</h2>

        <p>
          Total de facturas: {total}
        </p>

        {mensaje && <p>{mensaje}</p>}

        <IonList>
          {facturas.map((factura) => (
            <IonItem key={factura.id}>
              <IonLabel>
                <h2>
                  Factura {factura.numero_factura}
                </h2>

                <p>
                  Cliente: {factura.cliente_id}
                </p>

                <p>
                  Vendedor: {factura.vendedor_id}
                </p>

                <p>
                  Fecha: {factura.fecha_emision}
                </p>

                <p>
                  Total: $ {factura.total}
                </p>

                {factura.productos &&
                  factura.productos.length > 0 && (
                    <p>
                      Productos:{' '}
                      {factura.productos.length}
                    </p>
                  )}
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

export default Facturas;
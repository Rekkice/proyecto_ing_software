import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonButton } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import './MenuHeader.css'; // Asegúrate de crear este archivo para los estilos

const MenuHeader: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState('publicaciones'); // Estado inicial

  useEffect(() => {
    if (location.pathname.includes('grupos')) {
      setActive('grupos');
    } else if (location.pathname.includes('publicaciones')) {
      setActive('publicaciones');
    } else if (location.pathname.includes('eventos')) {
      setActive('eventos');
    }
  }, [location.pathname]);

  const gruposClick = () => {
    history.push('/grupos');
  };

  const publicacionesClick = () => {
    history.push('/publicaciones');
  };

  const eventosClick = () => {
    history.push('/eventos');
  };

  return (
    <IonHeader>
      <IonToolbar className="barraS">
        <IonButton 
          fill="clear" 
          onClick={gruposClick} 
          color="dark" 
          className={active === 'grupos' ? 'active' : 'inactive'}
        >
          <strong>Grupos</strong>
        </IonButton>
        
        <IonButton 
          fill="clear" 
          onClick={publicacionesClick} 
          color="dark" 
          className={active === 'publicaciones' ? 'active' : 'inactive'}
        >
          <strong>Publicaciones</strong>
        </IonButton>
        <IonButton 
          fill="clear" 
          onClick={eventosClick} 
          color="dark" 
          className={active === 'eventos' ? 'active' : 'inactive'}
        >
          <strong>Eventos</strong>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default MenuHeader;

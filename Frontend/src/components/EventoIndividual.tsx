import { IonButton } from '@ionic/react';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import './EventoIndividual.css'

interface ContainerProps {
  nameContent: string;
  location: string;
  fecha: string;
  imagen: string;
}

const EventoIndividual: React.FC<ContainerProps> = ({nameContent, location, fecha, imagen}) => {
  return (
  <div className="container-event">
    <img src={imagen}></img>
    <div className="container-content">
      <div className="container-text">
        <strong>{nameContent}</strong>
        <p className='container-ubicacion'>{location}</p>
        <strong className="container-fecha">{fecha}</strong>
      </div>
      <IonButton className='container-button'>Unirse al evento</IonButton>
    </div>
  </div>
  );
};

export default EventoIndividual;
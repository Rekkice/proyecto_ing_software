import './Publicacion.css';
import { IonAvatar, IonItem, IonLabel, IonIcon, IonBadge, IonInput, IonButton} from '@ionic/react';
import { heart } from 'ionicons/icons';
import { API_URL } from "../pocketbase";
import { pb } from "../pocketbase";

interface ContainerProps {
  name: string;
  group: string;
  price: string;
  description: string;
  //comments: string;
  image: string
  id: string
  vendedorId: string
}

const Publicacion: React.FC<ContainerProps> = ({name, group, price, description, image, id, vendedorId}) => {
  const imageURL = `${API_URL}api/files/publicaciones/${id}/${image}`;
  const isOwn = (pb.authStore.model.id == vendedorId ? null : false)
  const eliminarPublicacion = () => {
    pb.collection('publicaciones').delete(id)
  }
  return (
  <>
    <IonItem button={true} className="containerFlex">
      <div className="container">
        <IonAvatar aria-hidden="true" slot="start">
          <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>
        
        <div className="usuario">
          
          <IonLabel>
            <strong>{name}</strong> en {group}
          </IonLabel>
          <p>{description}</p>
          <img src={imageURL} className="formatoimg"></img>
          <strong className="precio">
            <p className="precio">${price} clp </p>
          </strong>
          
          <div className='icon'>
            <IonIcon icon={heart} size="large"> 
            </IonIcon>
            <strong >Me gusta </strong>
            
            <IonBadge color="secondary" className='comments'>0</IonBadge>
            <strong> Comentarios</strong>
          </div>
          {isOwn ?? <IonButton color="danger" onClick={() => eliminarPublicacion()}>Eliminar</IonButton>}
        </div>
      </div>
    </IonItem>
  </>
  );
};

export default Publicacion;
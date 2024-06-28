import './Contactos.css';
import { IonAvatar, IonItemOption, IonItemSliding, IonItemOptions, IonItem, IonLabel, IonList, IonIcon} from '@ionic/react';
import { trash, share, pin } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface ContainerProps {
  contact: string;
  history: any;
  id: string;
}

const Contactos: React.FC<ContainerProps> = ({contact, history, id}) => {
  const handleClick = () => {
    history.push(`/chat/${id}`);
  };
  
  return (
  <>
    <IonItemSliding onClick={handleClick}>
      <IonItem button={true} >
        <IonAvatar aria-hidden="true" slot="start">
          <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>
        <IonLabel>{contact}</IonLabel>
      </IonItem>
      <IonItemOptions slot="end">
        <IonItemOption color="warning">
          <IonIcon slot="icon-only" icon={pin}></IonIcon>
        </IonItemOption>
        <IonItemOption color="tertiary">
          <IonIcon slot="icon-only" icon={share}></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" expandable={true}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  </>
  );
};

export default Contactos;
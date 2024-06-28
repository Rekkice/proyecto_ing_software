import './NotificacionesState.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton,IonNavLink, IonRouterLink, IonItem, IonCheckbox, IonInput, IonLabel, IonText ,IonSearchbar, IonList, IonNote, IonIcon} from '@ionic/react';
import '../theme/variables.css';
import { chevronForward, listCircle } from 'ionicons/icons';

interface ContainerProps {
  state: string;
  info: string;
  fecha: string;
  visto: boolean;
}

const NotificacionesState: React.FC<ContainerProps> = ({state, info, fecha, visto}) => {
  return (
  <>
    <IonItem button={true} detail={false}>
      <div className="unread-indicator-wrapper" slot="start">
        {visto ? <div className="unread-indicator"></div> : null}
      </div>
      <IonLabel>
        <strong>{state}</strong>
        <IonNote color="medium" className="ion-text-wrap">
        {info}
        </IonNote>
      </IonLabel>
      <div className="metadata-end-wrapper" slot="end">
        <IonNote color="medium">{fecha}</IonNote>
        <IonIcon color="medium" icon={chevronForward}></IonIcon>
      </div>
    </IonItem>
  </>
  );
};

export default NotificacionesState;
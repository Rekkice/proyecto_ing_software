import './ExploreContainer.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton} from '@ionic/react';

interface ContainerProps { }

const FormatPage: React.FC<ContainerProps> = () => {
  return (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle>Page Two</IonTitle>
    </IonToolbar>
  </IonHeader>
  );
};

export default FormatPage;

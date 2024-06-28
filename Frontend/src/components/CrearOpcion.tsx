import { IonIcon, IonButton, useIonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonInput, IonItem} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import React, { useState, useRef } from 'react';
import { add } from 'ionicons/icons';
import './CrearOpcion.css'

interface ContainerProps {
  form: (dismiss: (data?: string | null | undefined | number, role?: string) => void) => React.ReactNode;
  titulo: string;
}

const CrearOpcion: React.FC<ContainerProps> = ({form, titulo}) => {
  const Modal = ({ dismiss }: { dismiss: (data?: string | null | undefined | number, role?: string) => void }) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => dismiss(null, 'cancel')}>
                Cancelar
              </IonButton>
            </IonButtons>
            <IonTitle>{titulo}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            {form(dismiss)}
          </IonItem>
        </IonContent>
      </IonPage>
    );
  };
  
  const [present, dismiss] = useIonModal(Modal, {
    dismiss: (data: string, role: string) => dismiss(data, role),
  });
  
  const [message, setMessage] = useState('This modal example uses the modalController to present and dismiss modals.');

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }
  return (
    <IonButton shape="round" className="container-crear" onClick={() => openModal() }>
      <IonIcon slot="icon-only" icon={add}></IonIcon>
    </IonButton>
  );
};

export default CrearOpcion;
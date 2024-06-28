import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList} from '@ionic/react';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import MenuFooter from '../components/MenuFooter';
import Contactos from '../components/Contactos';
import { useState, useEffect } from "react";
import { pb } from "../pocketbase";
import './Chats.css'

const Chats = () => {
  const history = useHistory();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    pb.collection("chats").getFullList({expand: ""}).then((data) => setChats(data)).catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    console.log(chats)
  }, [chats])
  return (
    <IonPage id="Chats">
        <IonHeader>
          <IonToolbar>
            <IonTitle><strong>Chats</strong></IonTitle>
          </IonToolbar>
        </IonHeader>
      
        <IonContent fullscreen color="light">
          <IonList inset={true} className="format">
            {chats.map((chat) => <Contactos contact={chat.nombre} history={history} id={chat.id} key={chat.id} />)}
            <Contactos contact="Jorge Villarreal" history={history}/>
            <Contactos contact="Francisco Arancibia" history={history}/>
            <Contactos contact="Reinaldo Foitzick" history={history}/>
            <Contactos contact="Elias Bernales" history={history}/>
            <Contactos contact="Sebastian Yañez" history={history}/>
            <Contactos contact="Joseph Donoso" history={history}/>
          </IonList>
        </IonContent>
      <MenuFooter/>
    </IonPage>
  );
};

export default Chats;
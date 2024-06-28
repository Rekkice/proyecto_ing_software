import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonFooter, IonToolbar, IonInput, IonButton, IonIcon, IonHeader, IonButtons, IonItem, IonAvatar, IonLabel, IonBackButton } from '@ionic/react';
import { send, image, callOutline, videocamOutline, receipt } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { pb } from "../pocketbase";
import './Chat.css'; 

const Chat = () => {
  let { id } = useParams();
  const [chatDatos, setChatDatos] = useState(null)
  useEffect(() => {
    pb.collection("chats").getOne(id, {expand: "mensajes.emisor,usuarios"}).then(
      (data) => {
          console.log(data)
          setChatDatos(data)
        return
      }
    ).catch((e) => console.log(e))
    pb.collection("chats").subscribe(id, (e) => {
        setChatDatos(e.record)
    }, {expand: "mensajes.emisor,usuarios"})
  }, [])
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      //setMessages([...messages, message]);
      console.log("enviando mensaje")
      const rec = await pb.collection("mensajes").create({contenido: message, emisor: pb.authStore.model.id})
      console.log(rec)
      await pb.collection('chats').update(id, {
        'mensajes+': rec.id
      })
      setMessage('');
    }
  };
  return (
    <IonPage id="Chat">
      <IonHeader>
        <IonToolbar className='contacto-toolbar'>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonItem button={true} className="contacto">
            <IonAvatar slot="start">
              <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>{chatDatos?.nombre}</IonLabel>
          </IonItem>
          
          <IonButton slot="end" fill="clear" className="customee-button" color={'black'}>
            <IonIcon icon={callOutline} size="large"> </IonIcon>
          </IonButton>
          <IonButton slot="end" fill="clear" className="customee-button" color={'black'}>
            <IonIcon icon={videocamOutline} size="large"> </IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="chat-content">
        {chatDatos?.expand.mensajes?.map((msg) => (
          <div key={msg.id}>
              <div style={{ textAlign: (msg.emisor == pb.authStore.model.id) ? "right" : "left" }}>{msg.expand.emisor.nombre_completo}</div>
              <div className={"chat-message " + (msg.emisor == pb.authStore.model.id ? "send" : "receive")}>
                {msg.contenido}
              </div>
          </div>
        ))}
      </IonContent>

      <IonFooter className='container-footer'>
        <div className="container-chat">
          <IonToolbar className="container-bar">
            <IonInput
              value={message}
              placeholder="Message..."
              onIonChange={e => setMessage(e.detail.value!)}
              clearInput
              color={"black"}
            />
            <IonButton slot="end" fill="clear" className="customee-button" color={'black'} onClick={handleSendMessage}>
              <IonIcon icon={send} />
            </IonButton>
            <IonButton slot="end" fill="clear" className="customee-button" color={'black'}>
              <IonIcon icon={image} />
            </IonButton>
          </IonToolbar>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;

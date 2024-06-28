import { IonContent, IonPage, IonList, RefresherEventDetail, IonRefresher, IonRefresherContent} from '@ionic/react';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import Button from '../components/Button';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import Grupo from '../components/Grupo';
import './Grupos.css'
import { pb } from "../pocketbase";
import { useState, useEffect } from "react";

const gruposDisponibles = (gruposUsuario: any[] | null, grupos: any[] | null) => {
  if (!gruposUsuario || !grupos) return []
  const idsToExclude = new Set(gruposUsuario.map(item => item.id));
  const filteredList = grupos.filter(item => !idsToExclude.has(item.id));

  return filteredList;
}

const updateGroupData = (setGruposUsuario, setGrupos) => {
  pb.collection('usuarios').getOne(pb.authStore.model.id, {
        expand: 'grupos',
  }).then(
    (data) => {
        setGruposUsuario(data.expand?.grupos)
      return
    }
  ).catch((e) => console.log(e))
  
  pb.collection('grupos').getFullList().then(
    (data) => {
        setGrupos(data)
      return
    }
  ).catch((e) => console.log(e))
}

const Grupos = () => {
  const [gruposUsuario, setGruposUsuario] = useState(null);
  const [grupos, setGrupos] = useState(null);
  useEffect(() => {
    updateGroupData(setGruposUsuario, setGrupos) 
    pb.collection("usuarios").subscribe(pb.authStore.model.id, (e) => {
        console.log("grupos nuevos:")
        console.log(e.record.expand.grupos)
        setGruposUsuario(e.record.expand.grupos)
    }, {expand: "grupos"})
  }, [])
  
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    event.detail.complete();
  }

  useEffect(() => {
  }, [])
  return (
    <IonPage id='Grupos'>
      <MenuHeader/>

      <IonContent fullscreen color="light">
        
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
  
        <h1><strong>Grupos actuales</strong></h1>
        <IonList inset={true} className="format">
          {gruposUsuario?.map(record => (
            <Grupo key={record.id} name={record.nombre} id={record.id}/>
          ))}
  
        </IonList>

        <h2><strong>Grupos cercanos</strong></h2>
        <IonList inset={true} className="format">
          {gruposDisponibles(gruposUsuario, grupos)?.map(record => (
            <Grupo key={record.id} name={record.nombre} id={record.id}/>
          ))}
        </IonList>
      </IonContent>

      <MenuFooter/>
    </IonPage>
  );
};

export default Grupos;
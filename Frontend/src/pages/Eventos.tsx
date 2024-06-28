import { IonInput, IonSelect, IonContent, IonPage, IonRefresher, IonRefresherContent, RefresherEventDetail, IonSelectOption, IonButton } from '@ionic/react';
import { useHistory} from 'react-router-dom';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import React, { useEffect, useState } from 'react';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import CrearOpcion from '../components/CrearOpcion';
import EventoIndividual from '../components/EventoIndividual';
import './Eventos.css'

const Eventos = () => {
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    event.detail.complete();
  }

  useEffect(() => {
  }, [])

  const crearEvento = (dismiss) => (
    <form onSubmit={crearPublicacion(dismiss)}>
      <IonInput
        required
        label="Nombre del evento"
        labelPlacement="stacked"
        name="nombre_evento"
        fill="solid"
      ></IonInput>
      <IonInput
        required
        label="Lugar del evento"
        labelPlacement="stacked"
        name="lugar"
        fill="solid"
      ></IonInput>
      <IonInput
        required
        label="Fecha"
        labelPlacement="stacked"
        name="fecha"
        fill="solid"
      ></IonInput>
      <input type="file" name="imagen" accept="image/*" />
      <IonButton>Crear</IonButton>
    </form>
  )
  
  return (
    <IonPage id='Eventos'>
      <MenuHeader/>
      <IonContent fullscreen>
        
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <CrearOpcion nameContent='Crear Evento' id="eventos" inputs={[
          {
            placeholder: "Nombre del evento",
          },
          {
            placeholder: "Ubicación",
            attributes: {
              maxlength: 20,
            },
          },
          {
            placeholder: "Fecha",
          },
        ]}/>
        
        <EventoIndividual nameContent="Junta de BMX" location="Cerro Baron, Valparaiso" fecha="15 Sep - 20 Sep" imagen="../public/evento2.jpg"/>
        
        <EventoIndividual nameContent="Dibujo Cerro" location="Cerro Baron, Valparaiso" fecha="11 Sep - 18 Sep" imagen="../public/evento1.jpg"/>
        
        <EventoIndividual nameContent="Comida China" location="Plaza Centro, Viña" fecha="10 Sep - 11 Sep" imagen="../public/evento3.jpg"/>
        
      </IonContent>
      <MenuFooter/>
    </IonPage>
  );
};

export default Eventos;
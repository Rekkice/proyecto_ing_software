import { IonContent, IonPage, IonList, RefresherEventDetail, IonRefresher, IonRefresherContent, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useRef, useEffect, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import Publicacion from '../components/Publicacion';
import CrearOpcion from '../components/CrearOpcion';
import './Publicaciones.css'
import { pb } from "../pocketbase";

const updatePublicacionData = async (setPublicaciones: any) => {
  try {
    const data = await pb.collection('usuarios').getFirstListItem(`id="${pb.authStore.model.id}"`, {
      expand: 'grupos.publicaciones.vendedor',
      sort: '-updated'
    });
    console.log(data)
    //const newPub = data.expand.grupos.map((item: any) => item.expand.publicaciones).flat();
    const newPub = data.expand.grupos.reduce((acc, grupo) => {
      const publicacionesConNombreGrupo = grupo.expand?.publicaciones?.map(publicacion => ({
        ...publicacion,
        nombre_grupo: grupo.nombre,
      }));
      return acc.concat(publicacionesConNombreGrupo);
    }, []);
    console.log(newPub);
    setPublicaciones(newPub);
  } catch (e) {
    console.log(e);
  }
};


const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const [gruposUsuario, setGruposUsuario] = useState([])
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await updatePublicacionData(setPublicaciones)
    event.detail.complete();
  }

  useEffect(() => {
    updatePublicacionData(setPublicaciones) 
    pb.collection('usuarios').getOne(pb.authStore.model.id, {
          expand: 'grupos',
    }).then(
      (data) => {
          setGruposUsuario(data.expand?.grupos)
        return
      }
    ).catch((e) => console.log(e))
  }, [])

  const removeFormDataKey = (formData: FormData, keyToRemove: string): FormData => {
    const newFormData = new FormData();

    formData.forEach((value, key) => {
      if (key !== keyToRemove) {
        newFormData.append(key, value);
      }
    });

    return newFormData;
  };

  const crearPublicacion = (dismiss: any) => {
    return (e: FormEvent) => {
      e.preventDefault();
      console.log("creando grupo");

      const formData = new FormData(e.target as HTMLFormElement);
      console.log(formData)
      const grupo = formData.get("grupo")

      const newFormData = removeFormDataKey(formData, 'grupo');

      pb.collection("publicaciones").create(newFormData)
        .then(publicacion => {
          return pb.collection("grupos").update(grupo, {
            "publicaciones+": publicacion.id
          });
        })
        .then(() => {
          dismiss(null, "confirm");
        })
        .catch(error => {
          console.error("hubo un error:", error);
        });
    };
  };
  
  const crearPublicacionForm = (dismiss) => (
    <form onSubmit={crearPublicacion(dismiss)}>
      <IonInput
        required
        label="Nombre del producto"
        labelPlacement="stacked"
        name="nombre_producto"
        fill="solid"
      ></IonInput>
      <IonInput
        required
        label="Precio"
        labelPlacement="stacked"
        name="precio"
        fill="solid"
      ></IonInput>
      <input type="hidden" name="vendedor" value={pb.authStore.model.id} />
      <IonSelect label="Grupo" name="grupo" labelPlacement="fixed" placeholder="">
        {gruposUsuario.map(item => <IonSelectOption value={item.id} key={item.id}>{item.nombre}</IonSelectOption>)}
      </IonSelect>
      <input type="file" name="imagen" accept="image/*" />
      <button><IonButton>Crear</IonButton></button>
    </form>
  )
            //<Publicacion name="Leeroy Jenkins" group="Valparaiso" price="12.000" description="" comments="20" image="producto2.jpg"/>
          
            //<Publicacion name="Fernando Arancibia" group="Viña" price="25.000" description="Vendo electric makeup" comments="15" image="producto3.jpg"/>
  return (
    <IonPage id='Publicaciones'>
      <MenuHeader/>
        
      <IonContent fullscreen>
        
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <CrearOpcion titulo="Crear publicación" form={crearPublicacionForm} />
        
        <IonList inset={true}>
          <div className='publicacion-container'>
            {publicaciones?.map(record => {if (record) return (
              <Publicacion key={record.id} id={record.id} name={record.expand.vendedor.nombre_completo} group={record.nombre_grupo} price={record.precio} description={record.nombre_producto} image={record.imagen} vendedorId={record.vendedor}/>
            )})}
          </div>
        </IonList>
        
      </IonContent>
      <MenuFooter/>
    </IonPage>
  );
};

export default Publicaciones;

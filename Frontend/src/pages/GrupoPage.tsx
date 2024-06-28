import { IonContent, IonPage, IonList} from '@ionic/react';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import Grupo from '../components/Grupo';
import './GrupoPage.css'
import { pb } from "../pocketbase";
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

const gruposDisponibles = (gruposUsuario: any[] | null, grupos: any[] | null) => {
  if (!gruposUsuario || !grupos) return []
  const idsToExclude = new Set(gruposUsuario.map(item => item.id));
  const filteredList = grupos.filter(item => !idsToExclude.has(item.id));

  return filteredList;
}

const GrupoPage = () => {
  let { groupId } = useParams();
  
  const history = useHistory();
  const [grupo, setGrupo] = useState(null);
  useEffect(() => {
    pb.collection('grupos').getFirstListItem(`id="${groupId}"`).then(
      (data) => {
          setGrupo(data)
        return
      }
    ).catch((e) => console.log(e))
  }, [])
  
  const userIsInGroup = () => {
    if (!grupo) return false
    return new Set(pb.authStore.model.grupos).has(grupo.id)
  }

  const unirse = async () => {
    await pb.collection('usuarios').update(pb.authStore.model.id, {
      'grupos+': grupo.id
    })
    history.push("/grupos")
  }
                                           
  const dejar = async () => {
    await pb.collection('usuarios').update(pb.authStore.model.id, {
      'grupos-': grupo.id
    })
    history.push("/grupos")
  }
  
  return (
    <IonPage id='Grupo'>
      <MenuHeader/>

      <IonContent fullscreen color="light">

        <h1><strong>{grupo?.nombre}</strong></h1>
        {userIsInGroup() ? (
          <button onClick={dejar}>Dejar grupo</button>
        ) : (
          <button onClick={unirse}>Unirse a grupo</button>
        )}
        
      </IonContent>

      <MenuFooter/>
    </IonPage>
  );
};

export default GrupoPage;
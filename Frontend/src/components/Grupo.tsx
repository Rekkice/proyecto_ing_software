import './Grupo.css';
import {IonItem, IonLabel, IonIcon} from '@ionic/react';

import {ellipse } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface ContainerProps {
  name: string;
  id: string;
}

function hashStringToNumber(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // para que sea número positivo
}

const getColor = (id: string) => {
    const colores = ["danger", "tertiary", "success", "warning"]
    const hash = hashStringToNumber(id);
    const index = hash % colores.length;
    return colores[index];
}
const Grupo: React.FC<ContainerProps> = ({name, id}) => {
  const history = useHistory();

  return (
  <>
    <IonItem button={true} onClick={() => history.push("/grupo/" + id)}>
      <IonIcon color={getColor(id)} slot="start" icon={ellipse} size="large"></IonIcon>
      <IonLabel>{name}</IonLabel>
    </IonItem>
  </>
  );
};

export default Grupo;
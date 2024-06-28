import { IonContent, IonPage} from '@ionic/react';
import { useHistory } from 'react-router-dom';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import MenuHeader from '../components/MenuHeader';
import './Menu.css';
import '../theme/variables.css';

const Eventos: React.FC = () => {
  const history = useHistory();

  const handleNavigation = (path: any) => {
      history.push(path);
  };

  return (
    <IonPage id='Menu'>
      <MenuHeader/>
      <IonContent fullscreen >
        <div className="menu-container">
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Eventos;


//<span className="d-flex justify-content-end"><a href="temperaturaCelsius.html"><img src="../public/temperatura.png" alt=""/></a></span>
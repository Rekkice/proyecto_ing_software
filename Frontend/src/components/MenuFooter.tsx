import './MenuFooter.css';
import { IonIcon, IonButton, IonToolbar, IonFooter} from '@ionic/react';

import '../theme/variables.css';
import { useHistory } from 'react-router-dom';
import { radio, home, personCircle} from 'ionicons/icons';

const MenuFooter: React.FC = () => {

    const history = useHistory();

    const homeClick = () => {

        history.push('/publicaciones');
    };

    const chatClick = () => {

        history.push('/chats');
    };

    const eventosClick = () => {
        history.push('/eventos');
    }; 
    
    return (
    <>
        <IonFooter>
            <IonToolbar className="container-footer">
                
                <IonButton className="custom" onClick={homeClick} fill="clear" color={'black'}>
                    <IonIcon icon={home}/>
                </IonButton>
                
                <IonButton className="custom" onClick={chatClick} fill="clear" color={'black'}>
                    <IonIcon icon={personCircle}/>
                </IonButton>
                
                <IonButton className="custom" onClick={eventosClick} fill="clear" color={'black'}>
                    <IonIcon icon={radio}/>
                </IonButton>
        
            </IonToolbar >
        </IonFooter>
    </>
  );
};

export default MenuFooter;
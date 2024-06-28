import './Header.css';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton} from '@ionic/react';
import '../theme/variables.css';

interface ContainerProps {
  title: string;
}

const Header: React.FC<ContainerProps> = ({title}) => {
  return (
  <>
    <IonHeader>
      <IonToolbar className='barraS'>
        <IonButtons slot="start">
        <IonBackButton />
        </IonButtons>
        <IonTitle className="title press-start" >{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  </>
  );
};

export default Header;
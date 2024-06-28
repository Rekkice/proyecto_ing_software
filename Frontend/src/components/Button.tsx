import './Button.css';
import {IonButton} from '@ionic/react';
import '../theme/variables.css';

interface ContainerProps {
  title: string;
  onClickFunction: (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void;
  typeButton: "submit" | "reset" | "button";
}

const Button: React.FC<ContainerProps> = ({title, onClickFunction, typeButton}) => {

  const handleClick = (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    onClickFunction(event);
  };

  return (
  <>
    <IonButton
        color={"dark"}
        className="ion-margin-top custom-button"
        type={typeButton}
        expand="block"
        ion-button="block"
        
        >
        {title}
    </IonButton>
      
  </>
  );
};

export default Button;
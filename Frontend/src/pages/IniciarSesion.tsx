import { IonContent, IonPage, IonInput, useIonAlert} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button'
import './IniciarSesion.css';
import '../theme/variables.css';
import { pb } from '../pocketbase'
//import {useForm} from 'react-hook-form';
//npm install react-hook-form

const IniciarSesion: React.FC = () => {

  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const registerClick = () => {
    
    history.push('/registrarse');
  };

  const passwordClick = () => {
    history.push('/password');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;

    //Nombre de usuario
    if(!validUsernameI()){
      formValid = false;
    }

    //Password de usuario
    if(!validPasswordI()){
      formValid = false;
    }


    if (formValid){
      try {
        await login()
        history.push('/publicaciones');
      } catch(e) {
        presentAlert({
          header: 'Ocurrió un error iniciando sesión',
          subHeader: 'Compruebe el usuario y la contraseña, y vuelva a intentarlo',
          buttons: ['Cerrar'],
        })
      }
    }
  }
  //const expRegxStrPassword = "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
  const expRegxStrPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const expRegxStrUserName =/^[a-zA-Z][a-zA-Z0-9-_\. ]{3,15}$/;
  //const expRegxStrRut = "^[0-9]+[-|‐]{1}[0-9kK]{1}$"

  const [fieldUsernameI, setUsernameI] = useState({value:'', className: '', errorText: '_'});
  const [fieldPasswordI, setPasswordI] = useState({value:'', className: '', errorText: '_'});

  const login = async () => await pb.collection('usuarios').authWithPassword(fieldUsernameI.value, fieldPasswordI.value);

  const validUsernameI = () => {
    const usernameValueI = fieldUsernameI.value;

    if(usernameValueI.length == 0){
      setUsernameI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre es obligatorio"
      }));
    return false;
    }

    if(usernameValueI.length < 3){
      setUsernameI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe tener al menos 3 caracteres"
      }));
      return false;
    }

    if(usernameValueI.length > 15){
      setUsernameI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe tener máximo 15 caracteres"
      }));
      return false;
    }

    if(!expRegxStrUserName.test(usernameValueI)){
      setUsernameI(prevState => ({
        ...prevState,// -> value: string; className: string; errorText: string;
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe contener solo letras y/o números"
      }));
      return false;
    }

    return true;
  }

  const validPasswordI = () =>{
    const passwordValueI = fieldPasswordI.value;
    if (passwordValueI.length == 0){
      setPasswordI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña es obligatoria"
      }));
      return false;
    }

    if (passwordValueI.length < 8){
      setPasswordI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener al menos 8 caracteres"
      }));
      return false;
    }

    if (passwordValueI.length > 20){
      setPasswordI(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener máximo 20 caracteres"
      }));
      return false;
    }

    if(!expRegxStrPassword.test(passwordValueI)){
      setPasswordI(prevState => ({
        ...prevState,// -> value: string; className: string; errorText: string;
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número o carácter especial"
      }));
      return false;
    }
    
    return true;
  }

  return (
    <IonPage id="IniciarSesion">
      <Header title="Iniciar Sesión"/>
      <IonContent fullscreen>
        <div className="image-container">
          <img src="../public/burbujas.png" alt="burbu" />
        </div>

        <p className="press-start welcome"><strong>burbu</strong></p>

        <form className="ion-padding" onSubmit={handleSubmit} noValidate>
          <IonInput 
            id="fieldUserName" 
            type="text"
            label="Nombre de usuario" 
            labelPlacement="floating" 
            fill="outline" 
            placeholder="Ingrese su nombre de usuario" 
            value= {fieldUsernameI.value}
            errorText= {fieldUsernameI.errorText}
            className= {fieldUsernameI.className}
            maxlength={15}
            onIonChange={validUsernameI}
            onIonInput={e => {
              const newValue = e.detail.value || '';
              const newClassName = "";
              const newErrorText = "_";
              setUsernameI({value: newValue, className: newClassName, errorText: newErrorText});
            }}
            //pattern= {expRegxStrUserName}
          ></IonInput>

          <IonInput 
            id="fieldPassword" 
            type="password"
            label="Contraseña" 
            labelPlacement="floating" 
            fill="outline" 
            placeholder="Ingrese su contraseña" 
            value={fieldPasswordI.value}
            errorText={fieldPasswordI.errorText}
            className={fieldPasswordI.className}
            maxlength={20}
            counter={true}
            onIonChange={validPasswordI}
            onIonInput={e => {
              const newValue = e.detail.value || '';
              const newClassName = "";
              const newErrorText = "_";
              setPasswordI({value: newValue, className: newClassName, errorText: newErrorText});
            }}
            //<IonIcon slot="icon-only" name={eye} aria-hidden="true"></IonIcon>
          >
          </IonInput>
          
          <p><a onClick={passwordClick}><strong>¿Has olvidado tu contraseña?</strong></a></p>
          
          <Button title="Continuar" onClickFunction={()=> {}} typeButton="submit"/>

          <p>¿Todavía no tienes una cuenta? <a className="ion-color-dark" onClick={registerClick}><strong>Registrate</strong></a></p>
        </form>

      </IonContent>
    </IonPage>
  );
};

export default IniciarSesion;
//<Button title="Continuar" onClick={menuClick} typeButton="submit"/>
//<onButton color="dark" onClick={menuClick} className="button">Continuar</IonButton>
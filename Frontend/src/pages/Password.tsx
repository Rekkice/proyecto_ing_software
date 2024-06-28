import {IonContent, IonPage, IonInput} from "@ionic/react";
import Header from "../components/Header";
import Button from "../components/Button"
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import "./Password.css";

const Password: React.FC = () => {
  const expRegxStrPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const history = useHistory();

  const [fieldEmail, setEmail] = useState({value:'', className: '', errorText: '_'}); //Email
  const [fieldNewPassword, setNewPassword] = useState({value:'', className: '', errorText: '_'}); //Nueva Password
  const [fieldConfirmPassword, setConfirmPassword] = useState({value:'', className: '', errorText: '_'}); //Confirmar Password
  const [fieldCode, setCode] = useState({value:'', className: '', errorText: '_'}); //Codigo

  const [isConfirmPasswordDisabled, setConfirmPasswordDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;

    //Email
    if(!validEmail()){
      formValid = false;
    }

    //Nueva Password
    if(!validNewPassword()){
      formValid = false;
    }

    //Confirmar Password
    if(!validConfirmPassword()){
      formValid = false;
    }

    //Codigo
    if(!validCode()){
      formValid = false;
    }
  }

  const validEmail = () => {
    const emailValue = fieldEmail.value;
    if(emailValue.length == 0){
      setEmail(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El email es obligatorio"
      }));
      return false;
    }    
    return true;
  }

  const validNewPassword = () => {
    const newPasswordValue = fieldNewPassword.value;
    if(newPasswordValue.length == 0){
      setNewPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La contraseña es obligatoria"
      }));
      return false;
    }    
    if(newPasswordValue.length > 20){
      setNewPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener máximo 20 caracteres"
      }));
      return false;
    }    
    if(newPasswordValue.length < 8){
      setNewPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener al menos 8 caracteres"
      }));
      return false;
    } 
    if(!expRegxStrPassword.test(newPasswordValue)){
      setNewPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número o carácter especial"
      }));
      return false;
    }  
    return true;
  }

  const validConfirmPassword = () => {
    const confirmPasswordValue = fieldConfirmPassword.value;
    const newPasswordValue = fieldNewPassword.value;
    if (confirmPasswordValue.length == 0){
      setConfirmPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La confirmación de contraseña es obligatoria"
      }));
      return false;
    }
    if (confirmPasswordValue != newPasswordValue){
      setConfirmPassword(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "La contraseña ingresada no coincide con la nueva contraseña"
      }));
      return false;
    }
    return true;
  }

  const validCode = () => {
    const newCode = fieldCode.value;
    if(newCode.length == 0){
      setCode(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El código de confirmación es obligatorio"
      }));
      return false;
    }    
    if(newCode.length > 5){
      setCode(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El código de confirmación debe tener máximo 5 caracteres"
      }));
      return false;
    }    
    if(newCode.length < 3){
      setCode(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El código de confirmación debe tener al menos 3 caracteres"
      }));
      return false;
    }
    return true;
  }

  return (
    <IonPage id="Password">
      <Header title="Cambiar Clave"></Header>

      <IonContent fullscreen>
        <div className="image-container">
          <img src="../public/burbujas.png" alt="burbu" />
        </div>
        
        <form className="ion-padding" onSubmit={handleSubmit} noValidate>
          <IonInput 
              id="fieldEmail"
              value={fieldEmail.value}
              className={fieldEmail.className} //ion-invalid ion-touched
              label="Email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Ingrese su correo electrónico"
              errorText={fieldEmail.errorText}
              type="email" 
              onIonChange ={validEmail}
              onIonInput={e => {
                const newValue = e.detail.value || '';
                const newClassName = "";
                const newErrorText = "_";
                setEmail({ value: newValue, className: newClassName, errorText: newErrorText });
              }}
            >
          </IonInput>

          <IonInput
            id="fieldNewPassword"
            value={fieldNewPassword.value}
              className={fieldNewPassword.className} //ion-invalid ion-touched
              label="Nueva Contraseña"
              labelPlacement="floating"
              fill="outline"
              placeholder="Ingrese su nueva contraseña"
              errorText={fieldNewPassword.errorText}
              type="password" 
              maxlength={20}
              counter={true}
              onIonChange ={validNewPassword}
              onIonInput={e => {
                const newValue = e.detail.value || '';
                const newClassName = "";
                const newErrorText = "_";
                setNewPassword({ value: newValue, className: newClassName, errorText: newErrorText });
                setConfirmPasswordDisabled(newValue.length == 0);
              }}
          ></IonInput>

          <IonInput
            id="fieldConfirmPassword"
            value={fieldConfirmPassword.value}
              className={fieldConfirmPassword.className} //ion-invalid ion-touched
              label="Confirmar Contraseña"
              labelPlacement="floating"
              fill="outline"
              placeholder="Vuelva a ingresar su nueva contraseña"
              errorText={fieldConfirmPassword.errorText}
              type="password"
              maxlength={20}
              counter={true} 
              onIonChange ={validConfirmPassword}
              onIonInput={e => {
                const newValue = e.detail.value || '';
                const newClassName = "";
                const newErrorText = "_";
                setConfirmPassword({ value: newValue, className: newClassName, errorText: newErrorText });
              }}
              disabled={isConfirmPasswordDisabled}
          ></IonInput>

          <IonInput
            id="fieldCode"
            value={fieldCode.value}
            className={fieldCode.className} //ion-invalid ion-touched
            label="Código de confirmación"
            labelPlacement="floating"
            fill="outline"
            placeholder="Ingrese su código de confirmación"
            errorText={fieldCode.errorText}
            type="number"
            minlength={3}
            maxlength={5}
            counter={true} 
            onIonChange ={validCode}
            onIonInput={e => {
              const newValue = e.detail.value || '';
              const newClassName = "";
              const newErrorText = "_";
              setCode({ value: newValue, className: newClassName, errorText: newErrorText });
            }}
          ></IonInput>

          <p>
            <a href="#">
              <strong>Pedir código de confirmación</strong>
            </a>
          </p>
        <Button title="Continuar" onClickFunction={()=>{}} typeButton="submit"/>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Password;
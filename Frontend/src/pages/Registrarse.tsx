import { IonContent, IonPage, IonSelect, IonSelectOption, IonLabel, IonItem, IonInput, IonText} from '@ionic/react';
import Header from '../components/Header';
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Registrarse.css';
import '../theme/variables.css';

const Registrarse: React.FC = () => {
  const history = useHistory();
  const termsAndServicesClick = () => {
    history.push('/terminos-de-servicio');
  };

  const expRegxStrUserName = /^[a-zA-Z][a-zA-Z0-9-_\. ]{3,15}$/;
  const expRegxStrPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const expRegxStrRut = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/
  
  const [fieldUsername, setUsername] = useState({value:'', className: '', errorText: '_'}); //Username
  const [fieldRut, setRut] = useState({value:'', className: '', errorText: '_'}); //Rut
  const [fieldEmail, setEmail] = useState({value:'', className: '', errorText: '_'}); //Email
  const [fieldPassword, setPassword] = useState({value:'', className: '', errorText: '_'}); //Password
  const [fieldConfirmPassword, setConfirmPassword] = useState({value:'', className: '', errorText: '_'}); //Confirmar Password
  const [fieldRegion, setRegion] = useState({value:'', className:'', errorText: ''}); //Regiones
  const [fieldComuna, setComuna] = useState({value:'', className:'', errorText: ''}); //Comunas
  const [listaRegiones, setRegiones] = useState([{region: '', comunas: []}]); //Regiones opciones
  const [regSel, setRegSel] = useState([]); //Comunas opciones

  const [isConfirmPasswordDisabled, setConfirmPasswordDisabled] = useState(true);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;

    //Nombre de usuario
    if(!validUsername()){
      formValid = false;
    }

    //Rut
    if(!validRut()){
      formValid = false;
    }
    
    //Email
    if(!validEmail()){
      formValid = false;
    }

    //Email
    if(!validRegion()){
      formValid = false;
    }

    //Email
    if(!validComuna()){
      formValid = false;
    }
    
    //Contraseña
    if(!validPassword()){
      formValid = false;
    }

    //Confirmar Password
    if(!validConfirmPassword()){
      formValid = false;
    }
  }

  const validUsername = () => {
    const usernameValue = fieldUsername.value;
    
    if(usernameValue.length == 0){
      setUsername(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre es obligatorio"
      }));
      return false;
    }
    
    if(usernameValue.length < 3){
      setUsername(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe tener al menos 3 caracteres"
      }));
      return false;
    }
    
    if(usernameValue.length > 15){
      setUsername(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe tener máximo 15 caracteres"
      }));
      return false;
    }
    
    if(!expRegxStrUserName.test(usernameValue)){
      setUsername(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El nombre debe contener solo letras y/o números"
      }));
      return false;
    }
    
    return true;
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

  const validRut = () => {
    const RutValue = fieldRut.value;

    if(RutValue.length == 0){
      setRut(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "El rut es obligatorio"
      }));
    return false;
    }

    if(!expRegxStrRut.test(RutValue)){
      setRut(prevState => ({
        ...prevState,
        className: "ion-invalid ion-touched",
        errorText: "El rut ingresado debe ser válido (sin puntos y con guión)"
      }));
      return false;
    }

    return true;
  }

  const validRegion = () => {
    const RegionValue = fieldRegion.value;
    if(RegionValue.length == 0){
      setRegion(prevState => ({
        ...prevState,
        className: "display-true",
        errorText: "La región es un campo obligatorio"
      }));
      return false;
    }    
    return true;
  }

  const validComuna = () => {
    const ComunaValue = fieldComuna.value;
    if(ComunaValue.length == 0){
      setComuna(prevState => ({
        ...prevState,
        className: "display-true",
        errorText: "La comuna es un campo obligatorio"
      }));
      return false;
    }    
    return true;
  }

  const validPassword = () => {
    const PasswordValue = fieldPassword.value;

    if(PasswordValue.length == 0){
      setPassword(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña es obligatoria"
      }));
    return false;
    }

    if(PasswordValue.length < 8){
      setPassword(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener al menos 8 caracteres"
      }));
      return false;
    }

    if(PasswordValue.length > 20){
      setPassword(prevState => ({
        ...prevState, 
        className: "ion-invalid ion-touched",
        errorText: "La contraseña debe tener máximo 20 caracteres"
      }));
      return false;
    }

    if(!expRegxStrPassword.test(PasswordValue)){
      setPassword(prevState => ({
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
    const newPasswordValue = fieldPassword.value;
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
  
  const handleRegionChange = (e: CustomEvent) => {
    const nombreRegion = e.detail.value;
    const newClassName = ""
    const newErrorText = "";
    setRegion({ value: nombreRegion, className: newClassName, errorText: newErrorText });
    const selectedRegion = listaRegiones?.find(region => region.region === nombreRegion);
    if (selectedRegion) {
      setRegSel(selectedRegion.comunas); 
    }
    setComuna(prevState => ({
      ...prevState, 
      value: "",
    })); 
    validComuna();
  }
  
  useEffect(() => {
    // Realiza la solicitud fetch para obtener los datos del archivo JSON
    fetch('../public/comunas-regiones.json')
      .then(response => response.json())
      .then(data => {
        setRegiones(data);
      })
      .catch(error => {
        console.error('Error al leer el archivo JSON:', error);
      });
  }, []);
  
  return (
    <IonPage id='Registrarse'>
      <Header title="Crear Cuenta"/>
      <IonContent fullscreen>
      <form className="ion-padding" onSubmit={handleSubmit} noValidate>
            <IonInput 
                id="fieldName"
                value={fieldUsername.value}
                className={fieldUsername.className} //ion-invalid ion-touched
                label="Usuario"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese un nombre de usuario"
                errorText={fieldUsername.errorText}
                maxlength={15}
                type="text" 
                onIonChange ={validUsername}
                onIonInput={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = "";
                  const newErrorText = "_";
                  setUsername({ value: newValue, className: newClassName, errorText: newErrorText });
                }}
              >
            </IonInput>
            
            <IonInput
                id="fieldRut"
                className={fieldRut.className} //ion-invalid ion-touched
                value={fieldRut.value}
                label="Rut"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese su Rut"
                maxlength={10}
                errorText={fieldRut.errorText}
                type="text" 
                onIonChange ={validRut}
                onIonInput={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = "";
                  const newErrorText = "_";
                  setRut({ value: newValue, className: newClassName, errorText: newErrorText });
                }}>
            </IonInput>

            <IonInput 
                id="fieldEmail"
                className={fieldEmail.className} //ion-invalid ion-touched
                value={fieldEmail.value}
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="Correo electrónico (email)"
                errorText={fieldEmail.errorText}
                type="text"
                onIonChange={validEmail}
                onIonInput={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = "";
                  const newErrorText = "_";
                  setEmail({ value: newValue, className: newClassName, errorText: newErrorText });
                }}>
            </IonInput>
            
            <IonItem>
                <IonLabel>Región</IonLabel>
                <IonSelect 
                placeholder="Selecciona una región"
                value={fieldRegion.value}
                onIonChange={handleRegionChange} 
                interface="popover">
                    <IonSelectOption disabled value="">Selecciona una región</IonSelectOption>
                    {listaRegiones.map((region, index ) => (
                        <IonSelectOption key={index} value={region.region}>
                          {region.region}
                        </IonSelectOption>  
                    ))}
                </IonSelect>
            </IonItem>
            <IonText className={fieldRegion.className + " margin-b"} color="danger">{fieldRegion.errorText}</IonText>

            <IonItem>
                <IonLabel>Comuna</IonLabel>
                <IonSelect
                id="fieldComuna"
                placeholder="Selecciona una comuna"
                value={fieldComuna.value}
                interface="popover"
                onIonChange ={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = "";
                  const newErrorText = "_";
                  setComuna({ value: newValue, className: newClassName,errorText: newErrorText });
                }}>
                    <IonSelectOption disabled value="">Selecciona una comuna</IonSelectOption>
                    {regSel?.map((comuna, index) => (
                        <IonSelectOption key={index} value={comuna}>
                            {comuna}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
            <IonText className={fieldComuna.className + " margin-b"} color="danger">{fieldComuna.errorText}</IonText>

            <IonInput 
                id="fieldPassword" 
                type='password'
                className={fieldPassword.className}
                value={fieldPassword.value}
                label="Contraseña" 
                labelPlacement="floating" 
                fill="outline" 
                placeholder="Ingrese su contraseña" 
                errorText={fieldPassword.errorText}
                maxlength={20}
                counter={true}
                //pattern={expRegxStrPassword}
                onIonChange={validPassword}
                onIonInput={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = ""
                  const newErrorText = "_";
                  setPassword({ value: newValue, className: newClassName, errorText: newErrorText });
                  setConfirmPasswordDisabled(newValue.length == 0);
                }}>
            </IonInput>

            <IonInput 
                id="fieldConfirmPassword" 
                type='password'
                className={fieldConfirmPassword.className}
                value={fieldConfirmPassword.value}
                label="Confirmar contraseña" 
                labelPlacement="floating" 
                fill="outline"
                placeholder="Reingrese su contraseña" 
                errorText={fieldConfirmPassword.errorText}
                maxlength={20}
                counter={true}
                onIonChange={validConfirmPassword}
                onIonInput={e => {
                  const newValue = e.detail.value || '';
                  const newClassName = "";
                  const newErrorText = "_";
                  setConfirmPassword({ value: newValue, className: newClassName, errorText: newErrorText });
                }}
                disabled={isConfirmPasswordDisabled}
                ></IonInput>

            <Button title="Continuar" onClickFunction={()=> {}} typeButton="submit"/>

            <p>Al hacer click en continuar, acepta nuestros <a className="ion-color-dark" onClick={termsAndServicesClick}><strong>términos de servicio y política de privacidad</strong></a></p>
        </form>
    
      </IonContent>
    </IonPage>
  );
};

export default Registrarse;
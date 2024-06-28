import { IonContent, IonPage} from '@ionic/react';
import { useHistory } from 'react-router-dom';
//import {useForm} from 'react-hook-form';
//npm install react-hook-form
import Header from '../components/Header';
import Button from '../components/Button'
import './TerminosDeServicio.css';
import '../theme/variables.css';

const TermsOfService = () => {
  return (
    <IonPage id='TermsOfService'>
      <Header title="Términos de Servicio" />
      <IonContent fullscreen>
        <div>
          <p>
            Bienvenido/a a nuestro servicio. Estos términos de servicio rigen tu uso de nuestros servicios,
            incluyendo nuestro sitio web, aplicaciones móviles y cualquier otro servicio que ofrecemos. Al acceder
            o utilizar nuestros Servicios, aceptas estos Términos y nuestra Política de Privacidad. Lee atentamente
            estos documentos antes de utilizar nuestros Servicios.
          </p>

          <h2>Uso de Nuestros Servicios</h2>

          <p>
            a. Debes cumplir con estos Términos y con todas las leyes y regulaciones aplicables cuando utilices
            nuestros Servicios.<br />
            b. No puedes utilizar nuestros Servicios de manera inapropiada o fraudulenta.
          </p>

          <h2>Propiedad Intelectual</h2>

          <p>
            a. Nuestros Servicios y todo el contenido asociado, incluyendo pero no limitado a textos, gráficos,
            logotipos, imágenes, datos compilados y software, son propiedad de nosotros o de nuestros licenciantes
            y están protegidos por las leyes de propiedad intelectual.<br />
            b. No puedes utilizar nuestro contenido sin nuestro consentimiento previo por escrito o el consentimiento
            del propietario de dicho contenido.
          </p>

          <h2>Política de Privacidad</h2>

          <p>
            Tu privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo recopilamos,
            utilizamos y protegemos tu información personal cuando utilizas nuestros Servicios. Al utilizar nuestros
            Servicios, aceptas nuestra Política de Privacidad, así que asegúrate de leerla detenidamente.
          </p>

          <h2>Contacto</h2>

          <p>
            Si tienes alguna pregunta sobre estos Términos o nuestra Política de Privacidad, contáctanos en
            spark@e.cl
          </p>

          <h2>Cambios en los Términos</h2>

          <p>
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán en
            vigor inmediatamente después de su publicación en esta página. Te recomendamos que revises periódicamente
            estos Términos para estar al tanto de cualquier actualización.
          </p>

          <p>Gracias por utilizar nuestros Servicios. Esperamos que disfrutes de tu experiencia.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsOfService;
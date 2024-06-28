import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import IniciarSesion from './pages/IniciarSesion';
import TerminosDeServicio from './pages/TerminosDeServicio';
import Registrarse from './pages/Registrarse';
import Password from './pages/Password';
import Menu from './pages/Menu';
import Publicaciones from './pages/Publicaciones';
import Eventos from './pages/Eventos';
import Grupos from './pages/Grupos';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import GrupoPage from './pages/GrupoPage';
import GlobalContext from './GlobalContext'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        
        <Route exact path="/iniciar-sesion">
          <IniciarSesion />
        </Route>
        
        <Route exact path="/registrarse">
          <Registrarse />
        </Route>

        <Route exact path="/terminos-de-servicio">
          <TerminosDeServicio />
        </Route>

        <Route exact path="/password">
          <Password />
        </Route>

        <Route exact path="/menu">
          <Menu />
        </Route>

        <Route exact path="/">
          <Redirect to="/iniciar-sesion" />
        </Route>

        <Route exact path="/publicaciones">
          <Publicaciones/>
        </Route>

        <Route exact path="/grupos">
          <Grupos/>
        </Route>
        
        <Route exact path="/grupo">
          <GrupoPage/>
        </Route>
        
        <Route exact path="/grupo/:groupId">
          <GrupoPage/>
        </Route>

        <Route exact path="/eventos">
          <Eventos/>
        </Route>

        <Route exact path="/chats">
          <Chats/>
        </Route>

        <Route exact path="/chat/:id">
          <Chat/>
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

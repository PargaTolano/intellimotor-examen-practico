import './App.css';

import Form       from './components/Form';
import Loading    from './components/Loading';
import Modal      from './components/Modal';
import CarMarquee from './components/CarMarquee';
import Footer     from './components/Footer';
import { LoadingProvider } from './hooks/loading';
import { ModalProvider } from './hooks/modal';
import { css } from '@emotion/css';

// TODO overlay de carga -> componente y hook, modal de respuesta -> componente y hook, peticion a backend
function App() {
    return (
      <LoadingProvider>
        <ModalProvider>
          <div className={css`
            display:    flex;
            height:     100%;
            flex-flow:  column nowrap;
            overflow:   hidden;
          `}
          >
            <Form/>
            <Loading/>
            <Modal/>
            <CarMarquee/>
            <Footer/>
          </div>
        </ModalProvider>
      </LoadingProvider>
    );
}

export default App;

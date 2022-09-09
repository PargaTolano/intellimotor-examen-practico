import './App.css';

import Form       from './components/Form';
import Loading    from './components/Loading';
import Modal      from './components/Modal';
import CarMarquee from './components/CarMarquee';

import { LoadingProvider } from './hooks/loading';
import { ModalProvider } from './hooks/modal';

// TODO overlay de carga -> componente y hook, modal de respuesta -> componente y hook, peticion a backend
function App() {
    return (
      <LoadingProvider>
        <ModalProvider>
          <div className="App">
            <CarMarquee/>
            <Form/>
            <Loading/>
            <Modal/>
          </div>
        </ModalProvider>
      </LoadingProvider>
    );
}

export default App;

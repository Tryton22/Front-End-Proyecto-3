import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom';
import './App.css';
import ListaClientes from './clientes/ListaClientes';
import CrearCliente from './clientes/CrearCliente';
import ActualizarCliente from './clientes/ActualizarCliente';
import EliminarCliente from './clientes/EliminarCliente';
import ListaUsuarios from './usuarios/ListaUsuarios';
import CrearUsuario from './usuarios/CrearUsuario';
import ActualizarUsuario from './usuarios/ActualizarUsuario';
import EliminarUsuario from './usuarios/EliminarUsuario';
import TopBar from './ui/TopBar';
import Footer from './ui/Footer';
import Home from './ui/Home';
import ListaGestiones from './gestion/ListaGestiones';

function App() {
  return (
    <Router>
      <div>
      <TopBar />
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/usuarios" element={<ListaUsuarios/>}/>
          <Route path="/usuarios/agregar" element={<CrearUsuario/>}/>
          <Route path="/usuarios/actualizar/:id" element={<ActualizarUsuario/>}/>
          <Route path="/usuarios/eliminar/:id" element={<EliminarUsuario/>}/>
          <Route path="/clientes" element={<ListaClientes/>}/>
          <Route path="/clientes/agregar" element={<CrearCliente/>}/>
          <Route path="/clientes/actualizar/:id" element={<ActualizarCliente/>}/>
          <Route path="/clientes/eliminar/:id" element={<EliminarCliente/>}/>
          <Route path="/gestiones" element={<ListaGestiones/>}/>
        </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;

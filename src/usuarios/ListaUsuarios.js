import React , {useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ListaUsuarios(){
    const [usuarios,setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios  = async () => {
            try {
                const response = await axios.get('http://144.126.136.43/api/usuario');
                setUsuarios(response.data);
            }catch(error) {
                console.log(error);
            }
        };
        fetchUsuarios();

    },[]);
    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <hr></hr>
            <a href="/usuarios/agregar" className="btn btn-primary">Agregar Usuario</a>
            <table className="table table-borderer table-striped">
                <thead>
                    <th>ID USUARIO</th>
                    <th>DV USUARIO</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>EMAIL</th>
                    <th>CELULAR</th>
                    <th>USERNAME</th>
                    <th>CONTRASEÑA</th>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.dv}</td>
                            <td>{usuario.nombres}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.celular}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.password}</td>
                            <td>
                                <Link to={`/usuarios/actualizar/${usuario.id_usuario}`} className="btn btn-warning">Editar</Link>
                                <Link to={`/usuarios/eliminar/${usuario.id_usuario}`} className="btn btn-danger">Eliminar</Link>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default ListaUsuarios;
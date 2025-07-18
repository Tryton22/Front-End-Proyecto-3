import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaGestiones() {
  const [gestiones, setGestiones] = useState([]);
  
  useEffect(() => {
    obtenerGestiones();
  }, []);

  const obtenerGestiones = async () => {
    try {
      const query = `SELECT g.id_gestion as id,c.id_cliente,CONCAT(c.nombres,' ',c.apellidos) as clientes,
        u.username,u.id_usuario, r.nombre_resultado,tg.nombre_tipo_gestion,g.fecha_registro,g.comentarios
        FROM gestion g,tipo_gestion tg,usuario u, resultado r,cliente c
        where 
        g.id_cliente = c.id_cliente and
        g.id_usuario = u.id_usuario and
        g.id_resultado=r.id_resultado and
        g.id_tipo_gestion = tg.id_tipo_gestion`;
      
      const response = await axios.post('http://144.126.136.43/dynamic', {
        query
      });

      setGestiones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Gestiones</h1>
      <hr></hr>
      <a href="/gestion/agregar" className="btn btn-primary">Agregar Gestion</a>
      <table className="table table-borderer table-striped">
        <thead>
          <th>ID Gestión</th>
          <th>Rut Cliente</th>
          <th>Cliente</th>
          <th>Rut Usuario</th>
          <th>Usuario</th>
          <th>Resultado</th>
          <th>Tipo Gestión</th>
          <th>Fecha Registro</th>
          <th>Comentarios</th>
          <th>Opciones</th>
        </thead>
        <tbody>
        {gestiones.map((gestion) => (
            <tr>
              <td>{gestion.id}</td>
              <td>{gestion.id_cliente}</td>
              <td>{gestion.clientes}</td>
              <td>{gestion.id_usuario}</td>
              <td>{gestion.username}</td>
              <td>{gestion.nombre_resultado}</td>
              <td>{gestion.nombre_tipo_gestion}</td>
              <td>{gestion.fecha_registro}</td>
              <td>{gestion.comentarios}</td>
              <td>
                <Link to={`/gestion/actualizar/${gestion.id}`} className="btn btn-warning">Editar</Link>
                <Link to={`/gestion/eliminar/${gestion.id}`} className="btn btn-danger">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaGestiones;

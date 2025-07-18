import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function EliminarUsuario() {

    let {id} = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [ErrorEliminacion, setErrorEliminacion] = useState(null); 

    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    const cargarDatosUsuario = async () => {
            try {
                const response = await axios.get(`http://144.126.136.43/api/usuario/${id}`);
                if (response.data && response.data.length > 0) {
                    setUsuario(response.data[0]);
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.error("Error al cargar los datos del cliente:", error);
                setUsuario(null); 
            }
        };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorEliminacion(null); // Limpiar cualquier error de eliminación previo antes de reintentar

        try {
            await axios.delete(`http://144.126.136.43/api/usuario/${id}`);
            navigate("/usuarios");
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            // Mostrar un mensaje de error solo si la eliminación falla
            if (error.response) {
                setErrorEliminacion(`Error al eliminar el usuario: ${error.response.status} - ${error.response.data.message || 'El usuario no pudo ser eliminado.'}`);
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta (problemas de red)
                setErrorEliminacion("No se pudo conectar con el servidor para eliminar el usuario. Por favor, revisa tu conexión.");
            } else {
                // Algo más sucedió al configurar la petición
                setErrorEliminacion("Ocurrió un error inesperado al intentar eliminar el usuario.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>¿Desea eliminar al usuario?</h1>
            <hr />

            {/* Mostrar el mensaje de error de eliminación solo si existe */}
            {ErrorEliminacion && (
                <div className="alert alert-danger" role="alert">
                    {ErrorEliminacion}
                </div>
            )}

            {/* Mostrar la información del usuario */}
            {usuario ? (
                <>
                    <h3>{usuario.nombres} {usuario.apellidos}</h3>
                    <Button variant="danger" onClick={onSubmit} className="me-2">Eliminar</Button>
                    <Button variant="secondary" onClick={() => navigate("/usuarios")}>Cancelar</Button>
                </>
            ) : (
                // Si usuario es null, por algún error de carga. 
                <p>No se encontró información para el usuario solicitado o hubo un problema al cargarlo.</p>
            )}
        </div>
    );
}

export default EliminarUsuario;
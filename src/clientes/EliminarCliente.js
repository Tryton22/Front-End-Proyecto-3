import React from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState,useEffect } from "react";
function EliminarCliente(){
    let {id} = useParams();
    const navigate = useNavigate();
    const [cliente,setCliente] = useState([]);

    useEffect(() => {
        cargarDatosCliente();
    },[]);

    const cargarDatosCliente = async () => {
            try {
                const response = await axios.get(`http://144.126.136.43/api/cliente/${id}`);
                setCliente(response.data[0]);
            }catch (error){
                console.log(error);
            };
        };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.136.43/api/cliente/${id}`);
            navigate("/clientes");
        }catch(error) {
            console.log(error);
        }
    };
    return (
        <div className="container">
        <h1>¿Desea eliminar al cliente ? </h1>
        <h3>{cliente && cliente.nombres} {cliente.apellidos}</h3>
        <Button variant="danger" onClick={onSubmit}> Eliminar </Button>
        </div>
    );
}
export default EliminarCliente;
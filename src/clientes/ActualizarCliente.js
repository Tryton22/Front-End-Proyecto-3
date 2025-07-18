import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

function ActualizarCliente(){
    const {id} = useParams();
    const [id_cliente,setIdCliente] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        obtenerDatosCliente();
    },[]);
    const obtenerDatosCliente = async () => {
        const response = await axios.get(`http://144.126.136.43/api/cliente/${id}`);
        const cliente = response.data[0];
        setIdCliente(cliente.id_cliente);
        setDv(cliente.dv);
        setNombres(cliente.nombres);
        setApellidos(cliente.apellidos);
        setEmail(cliente.email);
        setCelular(cliente.celular);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const clienteActualizado = { nombres, apellidos, email, celular };
            await axios.patch(`http://144.126.136.43/api/cliente/${id}`, clienteActualizado);
            navigate("/clientes");
        }catch(error) {
            console.log(error);
        }  
    };
    return (
        <div className="container">
            <h1>Actualizar Cliente</h1>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>RUT</label>
                    <input type="text" className="form-control" value={id_cliente} onChange={(e) => setIdCliente(e.target.value)} disabled ></input>
                </div>
                <div className="form-group">
                    <label>DV</label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)} disabled ></input>
                </div>
                <div className="form-group">
                    <label>NOMBRES</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>APELLIDOS</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>EMAIL</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>CELULAR</label>
                    <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Cliente</button>
            </form>
        </div>
    );
}
export default ActualizarCliente;
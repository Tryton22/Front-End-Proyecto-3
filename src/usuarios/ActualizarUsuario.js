import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

function ActualizarUsuario(){
    const {id} = useParams();
    const [id_usuario, setIdUsuario] = useState("");
    const [dv, setDvUsuario] = useState("");
    const [nombres, setNombresUsuario] = useState("");
    const [apellidos, setApellidosUsuario] = useState("");
    const [email, setEmailUsuario] = useState("");
    const [celular, setCelularUsuario] = useState("");
    const [username, setUsernameUsuario] = useState("");
    const [password, setPasswordUsuario] = useState("");
    const [errors, setErrors] = useState({}); // Estado para manejar los errores al ingresar un nuevo usuario.
    const navigate = useNavigate();    

    useEffect(() => {
        obtenerDatosUsuario();
    }, []);
    const obtenerDatosUsuario = async () => {
        const response = await axios.get(`http://144.126.136.43/api/usuario/${id}`);
        const usuario = response.data[0];
        setIdUsuario(usuario.id_usuario);
        setDvUsuario(usuario.dv);
        setNombresUsuario(usuario.nombres);
        setApellidosUsuario(usuario.apellidos);
        setEmailUsuario(usuario.email);
        setCelularUsuario(usuario.celular);
        setUsernameUsuario(usuario.username);
        setPasswordUsuario(usuario.password);
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // 3. Validación de Nombres y Apellidos
        // No vacío y solo letras.
        const soloLetras = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;

        if (!nombres.trim()) {
            newErrors.nombres = "Los nombres son obligatorios.";
            isValid = false;
        } else if (!soloLetras.test(nombres)) {
            newErrors.nombres = "Los nombres solo deben contener letras.";
            isValid = false;
        }

        if (!apellidos.trim()) {
            newErrors.apellidos = "Los apellidos son obligatorios.";
            isValid = false;
        } else if (!soloLetras.test(apellidos)) {
            newErrors.apellidos = "Los apellidos solo deben contener letras.";
            isValid = false;
        }

        // 4. Validación de Email
        // Formato correcto.
        const validar_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "El email es obligatorio.";
            isValid = false;
        } else if (!validar_email.test(email)) {
            newErrors.email = "El formato del email no es válido, debe incluir '@' y terminar con '.com/cl'.";
            isValid = false;
        }

        // 5. Validación de Celular
        // 8 números de longitud.
        if (!celular) {
            newErrors.celular = "El número de celular es obligatorio.";
            isValid = false;
        } else if (!/^\d{8}$/.test(celular)) {
            newErrors.celular = "El celular debe tener 8 dígitos numéricos.";
            isValid = false;
        }

        // 6. Validación de Username
        // No vacío.
        if (!username.trim()) {
            newErrors.username = "El nombre de usuario es obligatorio.";
            isValid = false;
        }

        // 7. Validación de Password
        // Más de 3 caracteres.
        if (!password) { // También verifica que no esté vacío
            newErrors.password = "La contraseña es obligatoria.";
            isValid = false;
        } else if (password.length < 3) {
            newErrors.password = "La contraseña debe tener al menos 3 caracteres.";
            isValid = false;
        }

        setErrors(newErrors); // Actualiza el estado de errores
        return isValid; // Devuelve si el formulario es válido o no
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const usuarioActualizado = { nombres, apellidos, email, celular, username, password };
                await axios.patch(`http://144.126.136.43/api/usuario/${id}`, usuarioActualizado);
                navigate("/usuarios");
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        } else {
            console.log("Formulario de actualización con errores, no se puede enviar.")
        }
    };

    return (
        <div className="container">
            <h1>Actualizar Usuario</h1>
            <hr />
            <form onSubmit={onSubmit}>
                {/* ID de Usuario (RUT) */}
                <div className="form-group">
                    <label htmlFor="id_usuario">RUT</label>
                    <input type="text" className="form-control" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)} disabled></input>
                </div>

                {/* DV */}
                <div className="form-group">
                    <label htmlFor="dv">DV</label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDvUsuario(e.target.value)} disabled></input>
                </div>

                {/* Nombres */}
                <div className="form-group">
                    <label htmlFor="nombres">NOMBRES</label>
                    <input
                        type="text"
                        id="nombres"
                        className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                        value={nombres}
                        onChange={(e) => {
                            setNombresUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, nombres: null }));
                        }}
                    />
                    {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
                </div>

                {/* Apellidos */}
                <div className="form-group">
                    <label htmlFor="apellidos">APELLIDOS</label>
                    <input
                        type="text"
                        id="apellidos"
                        className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                        value={apellidos}
                        onChange={(e) => {
                            setApellidosUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, apellidos: null }));
                        }}
                    />
                    {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                        type="text"
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={(e) => {
                            setEmailUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, email: null }));
                        }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Celular */}
                <div className="form-group">
                    <label htmlFor="celular">CELULAR</label>
                    <input
                        type="text"
                        id="celular"
                        className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                        value={celular}
                        onChange={(e) => {
                            setCelularUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, celular: null }));
                        }}
                    />
                    {errors.celular && <div className="invalid-feedback">{errors.celular}</div>}
                </div>

                {/* Username */}
                <div className="form-group">
                    <label htmlFor="username">USERNAME</label>
                    <input
                        type="text"
                        id="username"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        value={username}
                        onChange={(e) => {
                            setUsernameUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, username: null }));
                        }}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">CONTRASEÑA</label>
                    <input
                        type="password" /* Tipo password para ocultar la entrada */
                        id="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={password}
                        onChange={(e) => {
                            setPasswordUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, password: null }));
                        }}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Actualizar</button>
                <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate("/usuarios")}>Cancelar</button>
            </form>
        </div>
    );    
}

export default ActualizarUsuario;
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CrearUsuario(){
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

    // Función que valida los campos al ingresar un nuevo usuario.
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // 1. Validación de ID (id_usuario)
        // No vacío y entre 7-8 números.
        if (!id_usuario.trim()) {
            newErrors.id_usuario = "El RUT es obligatorio.";
            isValid = false;
        } else if (!/^\d{7,8}$/.test(id_usuario)) {
            newErrors.id_usuario = "El RUT debe contener entre 7 y 8 dígitos numéricos.";
            isValid = false;
        }

        // 2. Validación de DV
        // Un solo dígito (0-9 o Kk)
        if (!dv.trim()) {
            newErrors.dv = "El DV es obligatorio.";
            isValid = false;
        } else if (!/^[0-9Kk]{1}$/.test(dv)) {
            newErrors.dv = "El DV debe ser un dígito numérico o 'K'.";
            isValid = false;
        }

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
        if (!celular.trim()) {
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
                const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

                await axios.post('http://144.126.136.43/api/usuario', { 
                    id_usuario,
                    dv,
                    nombres,
                    apellidos,
                    email,
                    celular,
                    username,
                    password,
                    fecha_registro
                });
                navigate("/usuarios"); 
            } catch (error) {
                console.error("Error al crear el usuario:", error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    api: "Hubo un problema al conectar con el servidor. Inténtalo de nuevo."
                }));
            }
        } else {
            console.log("Formulario con errores, no se envía.");
        }
    };

    return (
        <div className="container">
            <h1>Crear Usuario</h1>
            <hr />
            <form onSubmit={onSubmit}>
                {/* ID de Usuario (RUT) */}
                <div className="form-group">
                    <label htmlFor="id_usuario">RUT</label>
                    <input
                        type="text"
                        id="id_usuario"
                        className={`form-control ${errors.id_usuario ? 'is-invalid' : ''}`}
                        value={id_usuario}
                        onChange={(e) => {
                            setIdUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, id_usuario: null })); // Limpiar error al escribir
                        }}
                    />
                    {errors.id_usuario && <div className="invalid-feedback">{errors.id_usuario}</div>}
                </div>

                {/* DV */}
                <div className="form-group">
                    <label htmlFor="dv">DV</label>
                    <input
                        type="text"
                        id="dv"
                        className={`form-control ${errors.dv ? 'is-invalid' : ''}`}
                        value={dv}
                        onChange={(e) => {
                            setDvUsuario(e.target.value);
                            setErrors(prev => ({ ...prev, dv: null }));
                        }}
                    />
                    {errors.dv && <div className="invalid-feedback">{errors.dv}</div>}
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
                        type="password" /* Tipo para ocultar la entrada de la contraseña */
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

                <button type="submit" className="btn btn-primary mt-3">Agregar</button>
                <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate("/usuarios")}>Cancelar</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
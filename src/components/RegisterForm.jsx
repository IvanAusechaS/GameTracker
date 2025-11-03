import { useState } from "react";
import { registrarUsuario } from "../services/authService";

function RegisterForm({ onRegistroExitoso, onCambiarALogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    // Validaciones básicas
    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      setCargando(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setCargando(false);
      return;
    }

    try {
      const datos = await registrarUsuario({ nombre, email, password });
      
      // Limpiar formulario
      setNombre("");
      setEmail("");
      setPassword("");
      
      // Notificar al componente padre
      onRegistroExitoso(datos.usuario);
    } catch (error) {
      setError(error.message || "Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={manejarEnvio}>
        <h2>Crear cuenta</h2>
        
        {error && <div className="error-mensaje">{error}</div>}

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={cargando}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        <p className="auth-link">
          ¿Ya tienes cuenta?{" "}
          <span onClick={onCambiarALogin} className="link">
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;

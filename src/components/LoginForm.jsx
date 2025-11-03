import { useState } from "react";
import { loginUsuario } from "../services/authService";

function LoginForm({ onLoginExitoso, onCambiarARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    // Validaciones básicas
    if (!email || !password) {
      setError("Email y contraseña son obligatorios");
      setCargando(false);
      return;
    }

    try {
      const datos = await loginUsuario({ email, password });
      
      // Limpiar formulario
      setEmail("");
      setPassword("");
      
      // Notificar al componente padre
      onLoginExitoso(datos.usuario);
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={manejarEnvio}>
        <h2>Iniciar sesión</h2>
        
        {error && <div className="error-mensaje">{error}</div>}

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
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={cargando}>
          {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p className="auth-link">
          ¿No tienes cuenta?{" "}
          <span onClick={onCambiarARegistro} className="link">
            Regístrate
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

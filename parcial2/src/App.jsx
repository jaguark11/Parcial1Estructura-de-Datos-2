import { useState } from 'react';
import { Explorador } from './views/Explorer';
import './main.scss';

function App() {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);

  const manejarAuth = (e) => {
    e.preventDefault();
    // bd mockeada extraída del navegador
    let dbUsuarios = JSON.parse(localStorage.getItem("db_usuarios") || "[]");

    if (esRegistro) {
      // 1. Validar dominio institucional
      if (!mail.endsWith("@uao.edu.co")) return alert("Error: Solo correos @uao.edu.co");
      // 2. Validar que no exista ya en la BD
      if (dbUsuarios.includes(mail)) return alert("El correo ya está registrado.");

      // 3. Registrar en la base de Datos
      dbUsuarios.push(mail);
      localStorage.setItem("db_usuarios", JSON.stringify(dbUsuarios));
      
      alert("Registro exitoso. Ahora inicia sesión.");
      setEsRegistro(false);
      setMail("");
    } else {
      // Login: Verificar si existe en la BD
      if (dbUsuarios.includes(mail)) {
        setUser(mail);
      } else {
        alert("Usuario no encontrado. Regístrate primero.");
      }
    }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
        <form onSubmit={manejarAuth} style={{ background: '#333', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>{esRegistro ? "Registro" : "Login"} - Parcial 2</h2>
          <input 
            type="email" 
            placeholder="kristian@uao.edu.co" 
            value={mail} 
            onChange={e => setMail(e.target.value)} 
            required 
            style={{ padding: '10px', width: '250px', marginBottom: '15px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            {esRegistro ? "Crear Cuenta" : "Entrar al Sistema"}
          </button>
          <p onClick={() => setEsRegistro(!esRegistro)} style={{ cursor: 'pointer', color: '#3498db', marginTop: '15px' }}>
            {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="app-main">
      <header className="cabecera-sistema" style={{ background: '#e74c3c', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 'bold' }}>Usuario: {user}</span>
        <button onClick={() => setUser(null)} style={{ cursor: 'pointer' }}>Cerrar Sesión</button>
      </header>
      <Explorador usuario={user} />
    </div>
  );
}

export default App;
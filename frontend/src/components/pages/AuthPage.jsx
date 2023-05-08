import "./AuthPage.css";
import Logo from "../../assets/Logo.png";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AuthPage = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [launchConnect, setLaunchConnect] = React.useState(false);

  React.useEffect(() => {
    if (launchConnect) {
      // connect a user
      axios
        .post("http://localhost:8000/users/login", credentials)
        .then((response) => {
          // if the user is found, we save the id and the role in the local storage for the futur requests
          localStorage.setItem("userRole", response.data.role);
          localStorage.setItem("userId", response.data._id);
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error(error);
          // if the user is not found
          if (error.response.status === 404) {
            alert("Email ou mot de passe incorrect");
          }
        });
    }
    setLaunchConnect(false);
  }, [launchConnect]);

  return (
    <div className="auth-page">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <h1>Connexion</h1>
      <div className="py-2">
        <input
          type="text"
          placeholder="Email"
          className="input w-full max-w-xs"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div className="py-2">
        <input
          type="text"
          placeholder="Mot de passe"
          className="input w-full max-w-xs"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <button
        className="btn btn-ghost text-white w-full max-w-xs mt-2 mb-5"
        onClick={() => setLaunchConnect(true)}
      >
        Se connecter
      </button>
      <div className="text">
        Pas encore de compte ? Inscrivez vous en cliquant ci-dessous
      </div>
      <Link to="/signup">
        <button className="btn btn-ghost text-white">Créer un compte</button>
      </Link>
    </div>
  );
};

export default AuthPage;

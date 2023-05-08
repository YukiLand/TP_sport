import "./SignupPage.css";
import React from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png";

const SignupPage = () => {
  const [credentials, setCredentials] = React.useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: "",
  });
  const [launchSignup, setLaunchSignup] = React.useState(false);

  React.useEffect(() => {
    if (launchSignup) {
      // create a user
      axios
        .post("http://localhost:8000/users/signup", credentials)
        .then((response) => {
          alert("Votre compte a bien été créé, vous pouvez vous connecter");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 404) {
            // if the user email already exists in the database
            alert("Un compte existe déjà avec cet email");
          }
        });
    }
    setLaunchSignup(false);
  }, [launchSignup]);

  function defineStyle() {
    // We disable the button if one of the fields is empty to make sure the user fills in all the fields
    if (
      credentials.firstname === "" ||
      credentials.lastname === "" ||
      credentials.phonenumber === "" ||
      credentials.email === "" ||
      credentials.password === ""
    ) {
      return "btn btn-ghost text-white w-full max-w-xs mt-2 mb-5 btn-disabled";
    } else {
      return "btn btn-ghost text-white w-full max-w-xs mt-2 mb-5";
    }
  }

  return (
    <div className="auth-page">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <h1>Inscription</h1>
      <div className="py-2">
        <input
          type="text"
          placeholder="Prénom"
          className="input w-full max-w-xs"
          value={credentials.firstname}
          onChange={(e) =>
            setCredentials({ ...credentials, firstname: e.target.value })
          }
        />
      </div>
      <div className="py-2">
        <input
          type="text"
          placeholder="Nom"
          className="input w-full max-w-xs"
          value={credentials.lastname}
          onChange={(e) =>
            setCredentials({ ...credentials, lastname: e.target.value })
          }
        />
      </div>
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
      <div className="py-2">
        <input
          type="text"
          placeholder="Numéro de téléphone"
          className="input w-full max-w-xs"
          value={credentials.phonenumber}
          onChange={(e) =>
            setCredentials({ ...credentials, phonenumber: e.target.value })
          }
        />
      </div>

      <button className={defineStyle()} onClick={() => setLaunchSignup(true)}>
        S'inscrire
      </button>
    </div>
  );
};

export default SignupPage;

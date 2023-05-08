import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [adminAction, setAdminAction] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [user, setUser] = React.useState(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      setAdminAction(true);
    } else {
      setAdminAction(false);
    }
    return userRole;
  });

  React.useEffect(() => {
    let id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8000/carts/${id}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }

  return (
    <div>
      <div className="navbar bg-primary">
        <div className="flex-1">
          <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
            <Link to="/home">Accueil</Link>
          </button>
          <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
            <Link to="/products">Materiel</Link>
          </button>
          {adminAction ? (
            <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
              <Link to="/manage-products">Gestion produit</Link>
            </button>
          ) : null}
          {adminAction ? (
            <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
              <Link to="/manage-carts">Gestion réservations</Link>
            </button>
          ) : null}
          {adminAction ? (
            <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
              <Link to="/manage-users">Gestion utilisateurs</Link>
            </button>
          ) : null}
        </div>
        <div>
          <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
            <Link to="/my-cart">
              Mon panier
              {cart === null || cart?.items?.length === 0 ? null : (
                <div className="badge badge-secondary ml-2">
                  {cart?.items?.length}
                </div>
              )}
            </Link>
          </button>
          <button className="btn btn-sm btn-ghost text-white normal-case mx-2">
            <Link to="/my-account">Mon compte</Link>
          </button>
          <button
            className="btn btn-sm btn-ghost text-white normal-case mx-2"
            onClick={() => logout()}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

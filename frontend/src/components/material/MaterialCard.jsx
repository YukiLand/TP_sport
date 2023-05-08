import "./MaterialCard.css";
import React from "react";
import axios from "axios";

const MaterialCard = ({ material }) => {
  const [addToCart, setAddToCart] = React.useState(false);
  const [orderData, setOrderData] = React.useState({
    color: "",
    quantity: 1,
  });

  React.useEffect(() => {
    if (addToCart) {
      // Create the body of the request with the quantity and the color that the user want
      let body = {
        color: orderData.color,
        quantity: orderData.quantity !== "" ? orderData.quantity : 1,
        materialId: material._id,
        name: material.name,
        image: material.image,
        sport: material.sport,
      };
      axios
        .post("http://localhost:8000/carts", {
          userId: localStorage.getItem("userId"),
          items: body,
        })
        .then((response) => {
          alert("Article ajouté au panier");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setAddToCart(false);
    setOrderData({
      color: "",
      quantity: 1,
    });
  }, [addToCart]);

  function badgeColor(color) {
    let couleur = "";
    // Mandatory function to set the color of the badge for the material
    switch (color) {
      case "Rouge":
        couleur = "badge badge-lg mr-2 bg-rouge";
        break;
      case "Bleu":
        couleur = "badge badge-lg mr-2 bg-bleu";
        break;
      case "Vert":
        couleur = "badge badge-lg mr-2 bg-vert text-white";
        break;
      case "Jaune":
        couleur = "badge badge-lg mr-2 bg-jaune";
        break;
      case "Noir":
        couleur = "badge badge-lg mr-2 bg-noir text-white";
        break;
      case "Blanc":
        couleur = "badge badge-lg mr-2 bg-blanc";
        break;
      case "Orange":
        couleur = "badge badge-lg mr-2 bg-orange";
        break;
      default:
        couleur = "badge badge-lg mr-2 bg-gris";
        break;
    }
    return couleur;
  }
  return (
    <div className="material-card my-2 mx-2">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={material.image} alt="Shoes" className="sizingImage" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{material.name}</h2>
          <div>Couleurs disponibles :</div>
          <div>
            {material.color.map((color) => (
              <div className={badgeColor(color)} key={color}>
                {color}
              </div>
            ))}
          </div>

          <div className="card-actions justify-center mt-5">
            <label htmlFor={material._id} className="btn">
              Ajouter au panier
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id={material._id} className="modal-toggle " />
      <div className="modal ">
        <div className="modal-box w-11/12 max-w-5xl ">
          <h3 className="font-bold text-lg">Avant d'ajouter au panier</h3>
          <span>{material.name}</span>
          <select
            className="select w-full max-w-xs select-bordered	"
            onChange={(e) => {
              setOrderData({ ...orderData, color: e.target.value });
            }}
          >
            <option disabled selected>
              Sélectionner une couleur
            </option>
            {material.color.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <div className="mt-5">
            <span className="mr-2">Quantité</span>
            <input
              type="text"
              placeholder="Choisissez une quantité"
              label="Quantité"
              className="input  max-w-xs input-bordered"
              value={orderData.quantity}
              onChange={(e) =>
                setOrderData({ ...orderData, quantity: e.target.value })
              }
            />
          </div>
          <div className="modal-action">
            <label htmlFor={material._id} className="btn">
              Fermer
            </label>
            <label
              htmlFor={material._id}
              className="btn"
              onClick={() => setAddToCart(true)}
            >
              Valider
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;

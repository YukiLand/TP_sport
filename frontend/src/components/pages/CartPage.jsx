import "./CartPage.css";
import React from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = React.useState([]);
  const [launchDelete, setLaunchDelete] = React.useState(false);
  const [launchValide, setLaunchValide] = React.useState(false);
  const [editQuantity, setEditQuantity] = React.useState(null);
  const [itemToEdit, setItemToEdit] = React.useState(null);

  React.useEffect(() => {
    let id = localStorage.getItem("userId");
    // get the cart of the user
    axios
      .get(`http://localhost:8000/carts/${id}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    if (editQuantity !== null) {
      // update the quantity of a material in the cart
      let id = localStorage.getItem("userId");
      let body = {
        materialId: itemToEdit.materialId,
        quantity: editQuantity,
        color: itemToEdit.color,
        name: itemToEdit.name,
        sport: itemToEdit.sport,
        image: itemToEdit.image,
      };
      axios
        .put(`http://localhost:8000/carts/${id}`, body)
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setEditQuantity(null);
      setItemToEdit(null);
    }
  }, [editQuantity]);

  React.useEffect(() => {
    if (launchValide) {
      // validate the cart
      let id = localStorage.getItem("userId");
      axios
        .post(`http://localhost:8000/carts/validate/${id}`)
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLaunchValide(false);
      // reload the page to update the visual of the page
      window.location.reload();
    }
  }, [launchValide]);

  React.useEffect(() => {
    let id = localStorage.getItem("userId");
    if (launchDelete) {
      // delete a material from the cart
      axios
        .post(`http://localhost:8000/carts/delete/${id}`, itemToEdit)
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setEditQuantity(null);
    setItemToEdit(false);
    setLaunchDelete(false);
  }, [launchDelete]);

  return (
    <div className="cart-page pt-5 px-5">
      {cart === null || cart?.items?.length === 0 ? null : (
        <button
          className="btn btn-sm btn-primary text-white mb-5"
          onClick={() => setLaunchValide(true)}
        >
          Valider le panier
        </button>
      )}
      <div className="centered">
        {cart === null || cart?.items?.length === 0 ? (
          <h1>Votre panier est vide</h1>
        ) : (
          <table className="table w-10/12	 table-compact">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Sport</th>
                <th>Couleur</th>
                <th>Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* body */}
              {cart?.items?.map((item) => (
                <tr key={item.materialId}>
                  <td>
                    <img src={item.image} alt={item.name} className="w-20" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.sport}</td>
                  <td>{item.color}</td>
                  <td className="textOnCenter">
                    <b
                      className="text-2xl mr-2 cursor-pointer"
                      onClick={() => [
                        setEditQuantity("-"),
                        setItemToEdit(item),
                      ]}
                    >
                      -
                    </b>
                    <input
                      type="text"
                      value={item.quantity}
                      className="input w-20"
                      onChange={(e) => [
                        setEditQuantity(parseInt(e.target.value)),
                        setItemToEdit(item),
                      ]}
                    />

                    <b
                      className="text-2xl ml-2 cursor-pointer"
                      onClick={() => [
                        setEditQuantity("+"),
                        setItemToEdit(item),
                      ]}
                    >
                      +
                    </b>
                  </td>
                  <td>
                    {/* <button className="btn btn-sm bg-bleu">Editer</button> */}
                    <button
                      className="btn btn-sm bg-rouge text-white"
                      onClick={() => [
                        setItemToEdit(item),
                        setLaunchDelete(true),
                      ]}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CartPage;

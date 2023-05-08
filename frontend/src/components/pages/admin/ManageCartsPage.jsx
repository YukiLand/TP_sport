import "./ManageCartsPage.css";

import React from "react";
import axios from "axios";

const ManageCartsPage = () => {
  const [carts, setCarts] = React.useState([]);
  const [launchDelete, setLaunchDelete] = React.useState(null);
  const [launchSearch, setLaunchSearch] = React.useState(true);

  React.useEffect(() => {
    let listCarts = null;
    let listUsers = null;
    // get all carts
    axios
      .get(`http://localhost:8000/carts`)
      .then((response) => {
        listCarts = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    // get all users
    axios
      .get(`http://localhost:8000/users`)
      .then((response) => {
        listUsers = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    //timeout to wait for the response of the two requests
    setTimeout(() => {
      //Associate the carts with the users
      let listCartsWithUsers = listCarts.map((cart) => {
        let user = listUsers.find((user) => user._id === cart.userId);
        return {
          ...cart,
          user: user,
        };
      });
      setCarts(listCartsWithUsers);
    }, 1000);
    setLaunchSearch(false);
  }, [launchSearch]);

  React.useEffect(() => {
    if (launchDelete != null) {
      // delete a cart
      axios
        .delete(`http://localhost:8000/carts/${launchDelete.userId}/all`)
        .then((response) => {
          setLaunchSearch(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setLaunchDelete(null);
  }, [launchDelete]);

  return (
    <div className="carts-page">
      <h1>Gestions des paniers</h1>
      <div className="centered">
        {carts.length === 0 ? (
          // If there is no cart
          <span>Aucun utilisateur n'à de panier actif</span>
        ) : (
          <table className="table w-10/12	 table-compact">
            {/* head */}
            <thead>
              <tr>
                <th>Nom</th>
                <th>Produits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* body */}
              {carts?.map((item) => (
                <tr key={item.materialId}>
                  <td>
                    {item.user.firstname} {item.user.lastname}
                  </td>
                  <td>
                    {item.items.map((item) => (
                      <div>
                        {item.sport} - {item.name} - {item.color} -{" "}
                        {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm bg-rouge text-white"
                      onClick={() => setLaunchDelete(item)}
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

export default ManageCartsPage;

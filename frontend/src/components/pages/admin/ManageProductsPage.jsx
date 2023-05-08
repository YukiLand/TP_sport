import "./ManageProductsPage.css";

import React from "react";
import axios from "axios";

const ManageProductsPage = () => {
  const [materials, setMaterials] = React.useState([]);
  const [launchDelete, setLaunchDelete] = React.useState(null);
  const [launchSearch, setLaunchSearch] = React.useState(true);
  const [launchEdit, setLaunchEdit] = React.useState(false);
  const [launchCreate, setLaunchCreate] = React.useState(false);
  const [itemToEdit, setItemToEdit] = React.useState(null);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [itemToCreate, setItemToCreate] = React.useState(null);
  const [inputColorValue, setInputColorValue] = React.useState("");

  React.useEffect(() => {
    // get all materials
    axios
      .get(`http://localhost:8000/materials`)
      .then((response) => {
        setMaterials(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
    setLaunchSearch(false);
  }, [launchSearch]);

  React.useEffect(() => {
    if (launchDelete != null) {
      // delete a material
      axios
        .post(`http://localhost:8000/materials/delete`, itemToDelete)
        .then((response) => {
          setLaunchSearch(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setItemToDelete(null);
    setLaunchDelete(null);
  }, [launchDelete]);

  React.useEffect(() => {
    if (launchEdit === true) {
      // edit a material
      axios.put(
        `http://localhost:8000/materials/${itemToEdit._id}`,
        itemToEdit
      );
      setLaunchSearch(true);
    }
    setItemToEdit(null);
    setLaunchEdit(false);
  }, [launchEdit]);

  React.useEffect(() => {
    if (launchCreate === true) {
      // create a material
      axios.post(`http://localhost:8000/materials/create`, itemToCreate);
      setLaunchSearch(true);
      setItemToCreate(null);
    }
    setLaunchCreate(false);
  }, [launchCreate]);

  const handleInputChange = (event) => {
    setInputColorValue(event.target.value);
  };

  const submitColor = () => {
    //add color to itemToEdit.colors
    let colors = itemToEdit.color;
    colors.push(inputColorValue);
    setItemToEdit({ ...itemToEdit, color: colors });
    setInputColorValue("");
  };

  const submitColorCreation = () => {
    //add color to itemToCreate.colors
    let colors = [];
    if (
      itemToCreate !== null &&
      itemToCreate.color !== [] &&
      itemToCreate.color != null
    ) {
      colors = itemToCreate.color;
    }
    colors.push(inputColorValue);
    setItemToCreate({ ...itemToCreate, color: colors });
    setInputColorValue("");
  };

  return (
    <div className="manage-product-page">
      <h1>Gestion des produits</h1>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal"
        className="btn btn-sm btn-primary text-white mb-5"
      >
        Créer un produit
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal text-left">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Créer un produit</h3>
          <div className="mt-3">
            <span className="mr-2">Sport</span>
            <input
              type="text"
              placeholder="Saisissez un sport"
              className="input w-full max-w-xs input-bordered"
              value={itemToCreate?.sport || ""}
              onChange={(e) =>
                setItemToCreate({
                  ...itemToCreate,
                  sport: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Nom</span>
            <input
              type="text"
              placeholder="Saisissez un nom"
              className="input w-full max-w-xs input-bordered"
              value={itemToCreate?.name || ""}
              onChange={(e) =>
                setItemToCreate({
                  ...itemToCreate,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Couleurs</span>
            <br />
            <input
              type="text"
              placeholder="Saisissez un nom"
              className="input input-bordered input-xs mr-2"
              value={inputColorValue}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-xs btn-success text-white my-2"
              onClick={() => submitColorCreation()}
            >
              Ajouter une couleur
            </button>
            <br />
            {itemToCreate?.color?.length === 0 ? null : (
              <div>
                <div>
                  {itemToCreate?.color?.map((color, index) => (
                    <span key={index}>
                      {color}
                      <button
                        className="btn btn-xs bg-rouge text-white ml-3"
                        onClick={() => {
                          const newColor = itemToCreate.color.filter(
                            (item, i) => i !== index
                          );
                          setItemToCreate({
                            ...itemToCreate,
                            color: newColor,
                          });
                        }}
                      >
                        Supprimer
                      </button>
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            <span className="mr-2">Qauntité en stock</span>
            <input
              type="text"
              placeholder="Saisissez une quantité"
              className="input w-full max-w-xs input-bordered"
              value={itemToCreate?.quantity || ""}
              onChange={(e) =>
                setItemToCreate({
                  ...itemToCreate,
                  quantity: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Image</span>
            <input
              type="text"
              placeholder="Saisissez une url d'image"
              className="input w-full max-w-xs input-bordered"
              value={itemToCreate?.image || ""}
              onChange={(e) =>
                setItemToCreate({
                  ...itemToCreate,
                  image: e.target.value,
                })
              }
            />
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Fermer
            </label>
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => setLaunchCreate(true)}
            >
              Valider
            </label>
          </div>
        </div>
      </div>
      <div className="centered">
        {materials.length === 0 ? (
          <span>Aucun produit n'est disponible à la location</span>
        ) : (
          <table className="table w-10/12	 table-compact">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Sport</th>
                <th>Nom</th>
                <th>Couleurs disponibles</th>
                <th>Quantité en stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* body */}

              {materials?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20"
                    />
                  </td>
                  <td>{item.sport}</td>
                  <td>{item.name}</td>
                  <td>{item.color.join(", ")}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <label
                      className="btn btn-sm bg-rouge text-white"
                      htmlFor={item._id}
                      onClick={() => [setItemToEdit(item)]}
                    >
                      Editer
                    </label>
                    <button
                      className="btn btn-sm bg-rouge text-white"
                      onClick={() => [
                        setItemToDelete(item),
                        setLaunchDelete(true),
                      ]}
                    >
                      Supprimer
                    </button>
                    {itemToEdit === null || itemToEdit === undefined ? null : (
                      <div>
                        <input
                          type="checkbox"
                          id={itemToEdit._id}
                          className="modal-toggle"
                        />
                        <div className="modal w-full">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Editer le produit : {itemToEdit.name}
                            </h3>
                            <div className="mt-3">
                              <span className="mr-2">Sport</span>
                              <input
                                type="text"
                                placeholder="Saisissez un sport"
                                className="input w-full max-w-xs input-bordered"
                                value={itemToEdit.sport}
                                onChange={(e) =>
                                  setItemToEdit({
                                    ...itemToEdit,
                                    sport: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Nom</span>
                              <input
                                type="text"
                                placeholder="Saisissez un nom"
                                className="input w-full max-w-xs input-bordered"
                                value={itemToEdit.name}
                                onChange={(e) =>
                                  setItemToEdit({
                                    ...itemToEdit,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Couleurs</span>
                              <br />
                              <input
                                type="text"
                                placeholder="Saisissez un nom"
                                className="input input-bordered input-xs mr-2"
                                value={inputColorValue}
                                onChange={handleInputChange}
                              />
                              <button
                                className="btn btn-xs btn-success text-white my-2"
                                onClick={() => submitColor()}
                              >
                                Ajouter une couleur
                              </button>
                              <br />
                              {itemToEdit.color.map((color, index) => (
                                <span key={index}>
                                  {color}
                                  <button
                                    className="btn btn-xs bg-rouge text-white ml-3"
                                    onClick={() => {
                                      const newColor = itemToEdit.color.filter(
                                        (item, i) => i !== index
                                      );
                                      setItemToEdit({
                                        ...itemToEdit,
                                        color: newColor,
                                      });
                                    }}
                                  >
                                    Supprimer
                                  </button>
                                  <br />
                                </span>
                              ))}
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Qauntité en stock</span>
                              <input
                                type="text"
                                placeholder="Saisissez une quantité"
                                className="input w-full max-w-xs input-bordered"
                                value={itemToEdit.quantity}
                                onChange={(e) =>
                                  setItemToEdit({
                                    ...itemToEdit,
                                    quantity: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Image</span>
                              <input
                                type="text"
                                placeholder="Saisissez une url d'image"
                                className="input w-full max-w-xs input-bordered"
                                value={itemToEdit.image}
                                onChange={(e) =>
                                  setItemToEdit({
                                    ...itemToEdit,
                                    image: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="modal-action">
                              <label htmlFor={itemToEdit._id} className="btn">
                                Fermer
                              </label>
                              <label
                                htmlFor={itemToEdit._id}
                                className="btn"
                                onClick={() => setLaunchEdit(true)}
                              >
                                Valider
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

export default ManageProductsPage;

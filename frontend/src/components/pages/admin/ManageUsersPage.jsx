import "./ManageUsersPage.css";

import React from "react";
import axios from "axios";

const ManageUsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [launchDelete, setLaunchDelete] = React.useState(null);
  const [launchSearch, setLaunchSearch] = React.useState(true);
  const [launchEdit, setLaunchEdit] = React.useState(false);
  const [launchCreate, setLaunchCreate] = React.useState(false);
  const [userToEdit, setUserToEdit] = React.useState(null);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [userToCreate, setUserToCreate] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/users`)
      .then((response) => {
        setUsers(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
    setLaunchSearch(false);
  }, [launchSearch]);

  React.useEffect(() => {
    if (launchDelete != null) {
      axios
        .post(`http://localhost:8000/users/delete`, userToDelete)
        .then((response) => {
          setLaunchSearch(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setUserToDelete(null);
    setLaunchDelete(null);
  }, [launchDelete]);

  React.useEffect(() => {
    if (launchEdit === true) {
      axios.put(`http://localhost:8000/users/${userToEdit._id}`, userToEdit);
      setLaunchSearch(true);
    }
    setUserToEdit(null);
    setLaunchEdit(false);
  }, [launchEdit]);

  React.useEffect(() => {
    if (launchCreate === true) {
      axios.post(`http://localhost:8000/users/create`, userToCreate);
      setLaunchSearch(true);
      setUserToCreate(null);
    }
    setLaunchCreate(false);
  }, [launchCreate]);

  return (
    <div className="manage-product-page">
      <h1>Gestion des produits</h1>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal"
        className="btn btn-sm btn-primary text-white mb-5"
      >
        Créer un utilisateur
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal text-left">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Créer un utilisateur</h3>
          <div className="mt-3">
            <span className="mr-2">Nom</span>
            <input
              type="text"
              placeholder="Saisissez un nom"
              className="input w-full max-w-xs input-bordered"
              value={userToCreate?.lastname || ""}
              onChange={(e) =>
                setUserToCreate({
                  ...userToCreate,
                  lastname: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Prénom</span>
            <input
              type="text"
              placeholder="Saisissez un prénom"
              className="input w-full max-w-xs input-bordered"
              value={userToCreate?.firstname || ""}
              onChange={(e) =>
                setUserToCreate({
                  ...userToCreate,
                  firstname: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Email</span>
            <input
              type="text"
              placeholder="Saisissez un email"
              className="input w-full max-w-xs input-bordered"
              value={userToCreate?.email || ""}
              onChange={(e) =>
                setUserToCreate({
                  ...userToCreate,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-3">
            <span className="mr-2">Mot de passe</span>
            <input
              type="text"
              placeholder="Saisissez un mot de passe"
              className="input w-full max-w-xs input-bordered"
              value={userToCreate?.password || ""}
              onChange={(e) =>
                setUserToCreate({
                  ...userToCreate,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <span className="mr-2">Numéro de téléphone</span>
            <input
              type="text"
              placeholder="Saisissez une url d'image"
              className="input w-full max-w-xs input-bordered"
              value={userToCreate?.phonenumber || ""}
              onChange={(e) =>
                setUserToCreate({
                  ...userToCreate,
                  phonenumber: e.target.value,
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
        {users.length === 0 ? (
          <span>Aucun utilisateur n'est enregistré sur le site</span>
        ) : (
          <table className="table w-10/12	 table-compact">
            {/* head */}
            <thead>
              <tr>
                <th>Nom prénom</th>
                <th>email</th>
                <th>numéro de téléphone</th>
                <th>Rôle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* body */}

              {users?.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.lastname} {item.firstname}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phonenumber}</td>
                  <td>{item.role}</td>
                  <td>
                    <label
                      className="btn btn-sm bg-rouge text-white"
                      htmlFor={item._id}
                      onClick={() => [setUserToEdit(item)]}
                    >
                      Editer
                    </label>
                    <button
                      className="btn btn-sm bg-rouge text-white"
                      onClick={() => [
                        setUserToDelete(item),
                        setLaunchDelete(true),
                      ]}
                    >
                      Supprimer
                    </button>
                    {userToEdit === null || userToEdit === undefined ? null : (
                      <div>
                        <input
                          type="checkbox"
                          id={userToEdit._id}
                          className="modal-toggle"
                        />
                        <div className="modal w-full">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Editer l'utilisateur : {userToEdit.lastname}{" "}
                              {userToEdit.firstname}
                            </h3>
                            <div className="mt-3">
                              <span className="mr-2">Nom</span>
                              <input
                                type="text"
                                placeholder="Saisissez un nom"
                                className="input w-full max-w-xs input-bordered"
                                value={userToEdit.lastname}
                                onChange={(e) =>
                                  setUserToEdit({
                                    ...userToEdit,
                                    lastname: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Prénom</span>
                              <input
                                type="text"
                                placeholder="Saisissez un prénom"
                                className="input w-full max-w-xs input-bordered"
                                value={userToEdit.firstname}
                                onChange={(e) =>
                                  setUserToEdit({
                                    ...userToEdit,
                                    firstname: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Email</span>
                              <input
                                type="text"
                                placeholder="Saisissez un email"
                                className="input w-full max-w-xs input-bordered"
                                value={userToEdit.email}
                                onChange={(e) =>
                                  setUserToEdit({
                                    ...userToEdit,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Mot de passe</span>
                              <input
                                type="text"
                                placeholder="Saisissez un mot de passe"
                                className="input w-full max-w-xs input-bordered"
                                value={userToEdit.password}
                                onChange={(e) =>
                                  setUserToEdit({
                                    ...userToEdit,
                                    password: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="mt-3">
                              <span className="mr-2">Numéro de téléphone</span>
                              <input
                                type="text"
                                placeholder="Saisissez un numéro de téléphone"
                                className="input w-full max-w-xs input-bordered"
                                value={userToEdit.phonenumber}
                                onChange={(e) =>
                                  setUserToEdit({
                                    ...userToEdit,
                                    phonenumber: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="modal-action">
                              <label htmlFor={userToEdit._id} className="btn">
                                Fermer
                              </label>
                              <label
                                htmlFor={userToEdit._id}
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

export default ManageUsersPage;

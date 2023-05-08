import "./MaterialPage.css";
import FormSearchMaterial from "../material/FormSearchMaterial";
import React from "react";
import axios from "axios";
import MaterialCard from "../material/MaterialCard";

const MaterialPage = () => {
  const [sports, setSports] = React.useState([]);
  const [materialsAvailable, setMaterialsAvailable] = React.useState([]);

  const parentHandleChange = (e) => {
    setMaterialsAvailable(e);
  };

  React.useEffect(() => {
    // get all the sports to display them in the form
    axios
      .get("http://localhost:8000/materials/sports/list")
      .then((response) => {
        setSports(response.data);
      });
  }, []);

  return (
    <div className="material-page pt-5">
      {sports?.length === 0 ? (
        <div>Chargement...</div>
      ) : (
        <FormSearchMaterial handleChange={parentHandleChange} sports={sports} />
      )}

      {materialsAvailable?.length === 0 ? null : (
        <div className="positionning">
          {materialsAvailable.map((material) => (
            <MaterialCard material={material} key={material._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialPage;

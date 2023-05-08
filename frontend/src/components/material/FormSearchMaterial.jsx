import "./FormSearchMaterial.css";
import React from "react";
import axios from "axios";

const FormSearchMaterial = (props) => {
  const [launchSearch, setLaunchSearch] = React.useState(false);
  const [sportSelected, setSportSelected] = React.useState("");

  React.useEffect(() => {
    if (launchSearch && sportSelected !== "") {
      axios
        .post("http://localhost:8000/materials/search", {
          sport: sportSelected,
        })
        .then((response) => {
          props.handleChange(response.data);
        });
    }
    setLaunchSearch(false);
  }, [launchSearch]);

  return (
    // In the futur we could add more search field like the name of the material
    <div className="form-search-material mt-5">
      <select
        className="select w-full max-w-xs"
        onChange={(event) => {
          setSportSelected(event.target.value);
          setLaunchSearch(true);
        }}
      >
        <option disabled selected>
          Sélectionner un sport
        </option>
        {props.sports.map((sport) => (
          <option value={sport} key={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSearchMaterial;

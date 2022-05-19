import { createContext, useState } from "react";

import axios from "axios";

export const plantQueryContext = createContext();

export default function PlantQueryProvider(props) {

  const [plantQueryDetails, setPlantQueryDetails] = useState({
    data: {}
  });

  // get array of plants to populate dynamic search options
  const getPlantsArray = () => {
    return axios.get("api/search")
  }

  const getPlantData = (plant_id) => {
    return axios.get(`api/plants/${plant_id}`)
    .then((res) => {
      setPlantQueryDetails((prev) => ({...prev, data: res.data}))

    })
  }

  const plantQueryData = { plantQueryDetails, getPlantData, getPlantsArray }

  return (
    <plantQueryContext.Provider value={plantQueryData}>
      {props.children}
    </plantQueryContext.Provider>
  )
}
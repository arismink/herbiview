import { createContext, useState } from "react";

import axios from "axios";

export const plantQueryContext = createContext();

export default function PlantQueryProvider(props) {

  const [plantQueryDetails, setPlantQueryDetails] = useState({
    data: {}
  });

  // get array of plants to populate dynamic search options
  const getPlantData = () => {
    return axios.get("api/search")
  }

  const getPlantDataDetails = (plant_id) => {
    return axios.get(`api/plants/${plant_id}`)
    .then((res) => {
      console.log('res.data', res.data)

      setPlantQueryDetails((prev) => ({...prev, data: res.data}))

      console.log('search data', plantQueryDetails)

    })
  }

  const plantQueryData = { plantQueryDetails, getPlantDataDetails, getPlantData }

  return (
    <plantQueryContext.Provider value={plantQueryData}>
      {props.children}
    </plantQueryContext.Provider>
  )
}
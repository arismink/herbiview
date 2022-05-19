import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function useSearchData() {
  const navigate = useNavigate();

  const [queryPlantDetail, setQueryPlantDetails] = useState({
    data: {}
  });

  // const searchApi = (params) => {
  //   axios.get(`api/search/${params}`)
  //   .then((res) => {
  //     setState((prev) => ({ ...prev, data: res.data }));
  //   });
  // };

  // path for dynamic search bar
  const getPlantDataDetails = (plant_id) => {
    return axios.get(`api/plants/${plant_id}`)
    .then((res) => {
      setQueryPlantDetails((prev) => ({...prev, data: res.data}))
      navigate("query/plant-details")
      console.log('search data', queryPlantDetail)
    })
  }

  // get array of plants to populate dynamic search options
  const getPlantData = () => {
    return axios.get("api/search")
  }

  return { getPlantData, queryPlantDetail, getPlantDataDetails };
}

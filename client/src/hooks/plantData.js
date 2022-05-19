import axios from "axios";

export default function usePlantData() {

  // get array of plants to populate dynamic search options
  const getPlantsArray = () => {
    return axios.get("/api/search")
  }

  const getPlantData = (plant_id) => {
    return axios.get(`/api/plants/${plant_id}`)

  }

  return { getPlantData, getPlantsArray };
}
import { useState, useEffect } from "react";
import axios from "axios";

export default function useSearchData() {
  // const [state, setState] = useState({
  //   data: {}
  // });

  // const searchApi = (params) => {
  //   axios.get(`api/search/${params}`)
  //   .then((res) => {
  //     setState((prev) => ({ ...prev, data: res.data }));
  //   });
  // };

  const getPlantData = () => {
    return axios.get("api/search")
    // .then((res) => {
    //   console.log('usedata', res.data)
    //   return res.data
    // })
  }

  return { getPlantData };
}

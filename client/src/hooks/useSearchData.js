import { useState } from "react";
import axios from "axios";

export default function useSearchData() {
  const [state, setState] = useState();

  const searchApi = (params) => {
    axios.get(`api/search/${params}`)
    .then((res) => {
      setState((prev) => ({ ...prev, data: res.data }));
    });
  };

  return { state, searchApi };
}

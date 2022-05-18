import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";
import { useNavigate } from "react-router-dom";

export default function useAppData() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    file: {},
    data: {},
    toxicity: [],
  });

  const getToxicityDetails = (plantSciName) => {
    return axios
      .get(`api/toxicity/${plantSciName}`)
      .then((res) => {
        console.log("toxicity:", res.data);

        setState((prev) => ({ ...prev, toxicity: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendToPlantAPI = (e) => {
    e.preventDefault();
    convertImageToBase64(state.file).then((base64file) => {
      axios
        .post("api/identify", { base64file })
        .then((res) => {
          console.log("data: ", res.data);

          setState((prev) => ({ ...prev, data: res.data }));
          getToxicityDetails(res.data.sci_name);
          navigate("/plant-details");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const setFile = (e) => {
    setState((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return { state, setFile, sendToPlantAPI };
}

import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";
import { useNavigate } from "react-router-dom";

export default function useAppData() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    file: {},
    id: {},
    health: {}
  });

  const sendToPlantAPI = (e) => {
    e.preventDefault();
    convertImageToBase64(state.file).then((base64file) => {
      axios.post("api/identify", { base64file })
      .then(res => {
        console.log("id: ", res.data.identify, "health: ", res.data.health);
        setState(prev => ({...prev, id: res.data.identify, health: res.data.health}));
        navigate("/plant-details");
      });
    });
  };

  const setFile = (e) => {
    setState((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return { state, setFile, sendToPlantAPI };
}

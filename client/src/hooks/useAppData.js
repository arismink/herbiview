import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";

export default function useAppData() {
  const [state, setState] = useState({
    file: {},
  });

  const sendToPlantAPI = (e) => {
    e.preventDefault();
    convertImageToBase64(state.file).then((base64file) => {
      axios.post("api/identify", { base64file })
      .then(res => {
        console.log("id: ", res.data.identify, "health: ", res.data.health);
      });
    });
  };

  const setFile = (e) => {
    setState((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return { setFile, sendToPlantAPI };
}

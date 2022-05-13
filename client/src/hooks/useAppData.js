import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";

export default function useAppData() {
  const [state, setState] = useState({
    file: {},
  });

  const sendToPlantAPI = () => {
    convertImageToBase64(state.file).then((base64file) => {
      axios.post("api/identify", { base64file });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToPlantAPI();
  };

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return { handleChange, handleSubmit };
}

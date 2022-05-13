import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";

export default function useAppData() {
  const [state, setState] = useState({
    file: {},
  });

  const sendToPlantAPI = () => {
    convertImageToBase64(state.file).then((base64file) => {
      axios
        .post("api/identify", {
          method: "POST",
          body: base64file,
        })
        .then((response) => {
          // todo: parse return data
          console.log("Success:", response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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

import { useState } from "react";
import axios from "axios";
import { convertImageToBase64 } from "helpers/fileReader";

export default function useAppData() {
  const [state, setState] = useState({
    file: {},
  });

  const sendToPlantAPI = () => {
    convertImageToBase64(state.file).then((base64file) => {
      console.log(base64file);
      const data = {
        image: base64file,
        // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };

      return axios("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api_Key": process.env.API_KEY
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToPlantAPI().then((data) => {
      // todo: parse return data
      console.log("Success:", data);
    });
  };

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  return { handleChange, handleSubmit };
}

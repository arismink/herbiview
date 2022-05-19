import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect, useContext } from 'react';
import { plantQueryContext } from 'providers/PlantProvider';

import * as React from 'react';
import {TextField, Stack, Autocomplete } from '@mui/material';

export default function SearchBar() {
  const navigate = useNavigate();

  const { getPlantData, getPlantDataDetails } = useContext(plantQueryContext);

  const [ plants, setPlants ] = useState([])

  useEffect(() => {
    getPlantData().then((res) => {
      setPlants(res.data);

    })
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOnClick = (plant_id) => {
    console.log(plant_id);
    getPlantDataDetails(plant_id);
    navigate("query/plant-details");
    setOpen(false);
    setInputValue("");
  }


  return (
    <Stack sx={{padding: 2, width: { xs: 200, sm: 400, md: 570}}}>
      <Autocomplete
        clearOnBlur
        open={open}
        onOpen={() => {
          // only open when in focus and inputValue is not empty
          if (inputValue) {
            setOpen(true);
          }
        }}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onInputChange={(e, value, reason) => {
          setInputValue(value);

          // only open when inputValue is not empty after the user typed something
          if (!value) {
            setOpen(false);
          }
        }}
        popupIcon={<SearchIcon />}
        noOptionsText="We can't find your plant. Try our image search!"
        getOptionLabel={(option) => `${option.name} ${option.sci_name}`}
        options={plants}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search..." />
        )}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option.id}
              onClick={() => handleOnClick(option.id)}>
              {option.name} - <i>{option.sci_name}</i>
            </li>
          )
        }}
      />
    </Stack>
  );
}

// `query/plant-details/${option.id}`
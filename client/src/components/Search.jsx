import SearchIcon from '@mui/icons-material/Search';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import usePlantData from 'hooks/plantData';

import * as React from 'react';
import {TextField, Stack, Autocomplete } from '@mui/material';

export default function SearchBar() {
  const navigate = useNavigate();

  const { getPlantsArray } = usePlantData();

  const [ plants, setPlants ] = useState([])

  useEffect(() => {
    getPlantsArray().then((res) => {
      setPlants(res.data);
    })
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOnClick = (plant_id) => {
    navigate(`/plants/${plant_id}`);
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

                <Typography>
                  {option.name} -
                </Typography>

                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}> <i>{option.sci_name}</i></Typography>



            </li>
          )
        }}
      />
    </Stack>
  );
}

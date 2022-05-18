import useSearchData from 'hooks/useSearchData';
import SearchIcon from '@mui/icons-material/Search';

import { useState, useEffect } from 'react';

import * as React from 'react';
import {TextField, Stack, Autocomplete } from '@mui/material';

export default function SearchBar() {
  const { getPlantData } = useSearchData();

  const [ plants, setPlants ] = useState([])

  useEffect(() => {
    getPlantData().then((res) => {
      setPlants(res.data);

    })
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);


  return (
    <Stack sx={{padding: 2, width: { xs: 200, sm: 400, md: 570}}}>
      <Autocomplete
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
        options={plants.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search..." />
        )}
      />
    </Stack>
  );
}
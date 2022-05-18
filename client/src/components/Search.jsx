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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  }
];



import React, { Fragment, useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

import Box from '@mui/material/Box';

import OutlinedInput from '@mui/material/OutlinedInput';

export default function SearchBar({setSearchQuery}){
  // const [term, setTerm] = useState("");
  // const [results, setResults] = useState([]);

  // useEffect(() => {
  //   const testURL = `/search?${term}`;
  //   axios.get(testURL)
  //     .then(response => {
  //       console.log(response.data.results);
  //       setResults([...response.data.results]);
  //     });
  // }, [term]);

  <Box sx={{padding: 2}}>

    <form
      autoComplete='off'
      action="/" method="get">
      <OutlinedInput
        sx={{
          height: 40
        }}
        type="text"
        id="header-search"
        placeholder="Search..."
        name="s"
        fullWidth
        endAdornment={<SearchIcon />}
      />
    </form>

  </Box>
};

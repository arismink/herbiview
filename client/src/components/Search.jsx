import { useState } from "react";

import SearchIcon from '@mui/icons-material/Search';

import Box from '@mui/material/Box';

import TextField from "@mui/material/TextField";

const SearchBar = ({setSearchQuery}) => (
  <form
    autoComplete="off"
    >
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search"
      variant="outlined"
      placeholder="Search..."
      size="small"
      fullWidth
      InputProps={{
        endAdornment: (
          <SearchIcon />
        )
      }}
    />
  </form>
);

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} />
    </Box>
  );
}
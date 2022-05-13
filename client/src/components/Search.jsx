import { useState } from "react";

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
    />
  </form>
);

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
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
    </div>
  );
}
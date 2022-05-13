import { useState } from "react";

import TextField from "@mui/material/TextField";

const SearchBar = ({setState}) => (
  <form
    autoComplete="off"
    >
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setState(e.target.value);
      }}
      label="Search"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </form>
);

export default function Search() {
  const [state, setState] = useState("");

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
        state={state}
        setState={setState} />
    </div>
  );
}
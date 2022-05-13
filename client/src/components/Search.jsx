import SearchIcon from '@mui/icons-material/Search';

import Box from '@mui/material/Box';

import OutlinedInput from '@mui/material/OutlinedInput';

const SearchBar = ({setSearchQuery}) => (
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
);

export default SearchBar;
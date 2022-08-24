import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
  Switch,
} from "@mui/material";

interface Props{
  darkMode : boolean;
  handleThemeChangeColor :() => void;
}

export default function Header({darkMode,handleThemeChangeColor} :Props) {
  return (   
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
          <Typography variant="h6" >
            Nt - Store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChangeColor} />
          <Button color="inherit" sx={{float:"right"}}>Login</Button>
        </Toolbar>
      </AppBar>    
  );
}

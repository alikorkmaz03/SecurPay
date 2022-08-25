import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
  Switch,
  ListItem,
  List,
  Badge,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props{
  darkMode : boolean;
  handleThemeChangeColor :() => void;
}
const midLinks=[
  { title:'catalog', path:'/catalog'},
  { title:'about', path:'/about'},
  { title:'contact', path:'/contact'},
]

const rightLinks=[
  { title:'login', path:'/login'},
  { title:'register', path:'/register'},
]
export default function Header({darkMode,handleThemeChangeColor} :Props) {
  return (   
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component={NavLink} to='/' 
          sx={{color:'inherit',textDecoration:'none' }} >
            NT - STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChangeColor} />
          {/* menüyü yatay yapmak için listeye flex ekledik */}
          <List sx={{display:'flex'}}>
            {midLinks.map(({title,path})=>(
              <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{color:'inherit',typography:'h6'}}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <IconButton size='large' sx={{color:'inherit'}}>
            <Badge badgeContent={4} color='secondary'>
              <ShoppingCart/>
            </Badge>
          </IconButton>
          <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path})=>(
              <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{color:'inherit',typography:'h6'}}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>    
  );
}

import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  ListItem,
  List,
  Badge,
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useNtStoreContext } from "../context/NtStoreContextValue";

interface Props {
  darkMode: boolean;
  handleThemeChangeColor: () => void;
}
const midLinks = [
  { title: "Ürünler", path: "/catalog" },
  { title: "Hakkımızda", path: "/about" },
  { title: "İletişim", path: "/contact" },
];

const rightLinks = [
  { title: "Giriş", path: "/login" },
  { title: "KayıtOl", path: "/register" },
];
const navStyles = [
  {
    color: "inherit",
    textDecoration :"none",
    typography: "h6",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "text.secondary",
    },
  },
];
export default function Header({ darkMode, handleThemeChangeColor }: Props) {
  const {basket}=useNtStoreContext();
  const itemCount=basket?.items.reduce((sum,item)=>sum+item.quantity,0)
  
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          backgroundColor:"#d20962"
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            NT - STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChangeColor} />
        </Box>
          {/* menüyü yatay yapmak için listeye flex ekledik */}
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toLocaleUpperCase('tr-TR')}
              </ListItem>
            ))}
          </List>
        <Box display='flex' alignItems='center'>        
          <IconButton component={Link} to='/basket' size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toLocaleUpperCase('tr-TR')}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

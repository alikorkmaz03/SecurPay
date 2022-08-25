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
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

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
  { title: "Üye Ol", path: "/register" },
];
const navStyles = [
  {
    color: "inherit",
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
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
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
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'content', justifyContent: "space-between" }}>
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

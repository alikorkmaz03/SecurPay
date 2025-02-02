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
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChangeColor: () => void;
}
const midLinks = [
  { title: "Ürünler", path: "/catalog" },
  { title: "Hakkımızda", path: "/about" },
  { title: "İletişim", path: "/contact" },
  { title: "Müşteri Ödemeleri", path: "/customerpayments" },
];

const rightLinks = [
  { title: "Giriş", path: "/login" },
  { title: "Üye Ol", path: "/register" },
];
const navStyles = [
  {
    color: "inherit",
    textDecoration: "none",
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
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useAppSelector((state) => state.account);

  return (
    <AppBar position="static" >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          backgroundColor: "#d20962",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            SECUREPAY
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChangeColor} />
        </Box>
        {/* menüyü yatay yapmak için listeye flex ekledik */}
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toLocaleUpperCase("tr-TR")}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" ,width:200,ml:5 }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toLocaleUpperCase("tr-TR")}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

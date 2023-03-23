import { Button, Link, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedInMenu() {

  const dispatch=useAppDispatch();
  const {user} =useAppSelector(state=>state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color='inherit'
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{typography:'h6'}}

      >
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profilim</MenuItem>
              <MenuItem component={RouterLink} to="/orders">
                  Siparişlerim
              </MenuItem>
              <MenuItem onClick={() => {
                  dispatch(signOut())
                  dispatch(clearBasket());
              } }>Çıkış Yap</MenuItem>
      </Menu>
    </>
  );
}

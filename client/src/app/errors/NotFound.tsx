import {  Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant='h3'>Üzgünüm, aradığınız sayfa bulunamadı</Typography>
            <Divider/>           
            <Button component={Link} fullWidth={true} to={'/catalog'}>Ürünlerimize Geri Dön</Button>
        </Container>
    )
}
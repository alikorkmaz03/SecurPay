import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export default function ServerError(){
    
    
    const navigate =useNavigate();
    const {state} = useLocation();  
    return(
    <Container component={Paper}>        
        {state?.error ?(
            <>
            <Typography variant='h3' color='error'  gutterBottom>{state.error.title}</Typography>
            <Divider/>
            <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
            
            </>
        ):(
            <Typography variant='h5'  gutterBottom>Server Error</Typography>  
            
        )}
        <Button onClick={()=>navigate('/catalog')}>Ürünlerimize Geri Dön</Button>
    </Container>

    )
}

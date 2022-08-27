import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage()
{
return(
 <Container>
    <Typography gutterBottom variant='h2'>Test Amaçlı Hata Senaryoları </Typography>
    <ButtonGroup>
    {/* caugt by interceptor */}
        <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch(error=>console.log(error))}>TestError 400</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch(error=>console.log(error))}>TestError 401</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch(error=>console.log(error))}>TestError 404</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch(error=>console.log(error))}>TestError 500</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.getValidationError().catch(error=>console.log(error))}>TestError Validation</Button>
    </ButtonGroup>
 </Container>
)
}
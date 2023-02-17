import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react"
import agent from "../../app/api/agent";
import { useNtStoreContext } from "../../app/context/NtStoreContextValue";

export default function BasketPage()
{
    // const [loading,setLoading]=useState(true);
    // const [basket,setBasket]=useState<Basket | null>(null);
    

    // useEffect(()=>{
    //     agent.Basket.get()
    //     .then(basket=>setBasket(basket))
    //     .catch(error=>console.log(error))
    //     .finally(()=>setLoading(false))

    // },[])

    // if(loading) return <LoadingComponent message="Sepete Ekleniyor..."/>
    const {basket,setBasket,removeItem}=useNtStoreContext();
    const [loading,setLoading]=useState(false);

    function handleAddItem(productId:number){
      setLoading(true);
      agent.Basket.addItem(productId)
      .then(basket=>setBasket(basket))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }

    function handleRemoveItem(productId:number,quantity=1)
    {
      setLoading(true);
      agent.Basket.removeItem(productId,quantity)
      .then(()=>removeItem(productId,quantity))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }


    if(!basket) return <Typography variant='h3'>Sepetinizde hiç ürün yok</Typography>
    return(       
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ürün</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="center">Adet</TableCell>
            <TableCell align="right">Ara Toplam</TableCell>
            <TableCell align="right"></TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Box display='flex' alignItems='center'>
              <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}}/>
              <span>{item.name}</span>
              </Box>
              </TableCell>  
              <TableCell align="right">{(item.price/100).toFixed(2)}{` `}TL</TableCell>
              <TableCell align="center">
                <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.productId)}  color='error' size='small'>
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} onClick={()=>handleAddItem(item.productId)}  color='success' size='small'>
                  <Add/>
                </LoadingButton>
                </TableCell>
              <TableCell align="right">{(item.price/100 * item.quantity).toFixed(2)}{` `}TL</TableCell>
              <TableCell align="right">
              <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.productId,item.quantity)} color='error' size='small'>
                <Delete/>
              </LoadingButton>
              </TableCell>                          
            </TableRow>            
          ))}
        </TableBody>
      </Table>
    </TableContainer>        
    )
}
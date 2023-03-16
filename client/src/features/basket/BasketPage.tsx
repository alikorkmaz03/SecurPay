import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  // const [loading,setLoading]=useState(true);
  // const [basket,setBasket]=useState<Basket | null>(null);

  // useEffect(()=>{
  //     agent.Basket.get()
  //     .then(basket=>setBasket(basket))
  //     .catch(error=>console.log(error))
  //     .finally(()=>setLoading(false))

  // },[])

  // if(loading) return <LoadingComponent message="Sepete Ekleniyor..."/>
  // const { basket, setBasket, removeItem } = useNtStoreContext();
  const {basket,status}=useAppSelector(state=>state.basket);
  const dispatch=useAppDispatch();
 

 

  if (!basket)
    return <Typography variant="h3">Sepetinizde hiç ürün yok</Typography>;
  return (
    <>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {(item.price / 100).toFixed(2)}
                  {` `}TL
                </TableCell>
                <TableCell align="center">
                  {/* sepetten ürün çıkarmak için */}
                  <LoadingButton
                    loading={
                     status ==='pendingRemoveItem' + item.productId + 'rem'
                    }
                    onClick={() =>
                      dispatch(removeBasketItemAsync({productId:item.productId,quantity:1,name:'rem'}))
                    }
                    color="error"
                    size="small"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status ==='pendingAddItem'+ item.productId
                    }
                    onClick={() =>
                      dispatch(addBasketItemAsync({productId:item.productId,quantity:1}))
                    }
                    color="success"
                    size="small"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {((item.price / 100) * item.quantity).toFixed(2)}
                  {` `}TL
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status ==='pendingRemoveItem'+ item.productId +'del'
                    }
                    onClick={() =>
                      dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'del'}))
                    }
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Ödeme
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

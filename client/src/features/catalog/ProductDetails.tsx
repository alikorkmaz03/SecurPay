import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchOnlyProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const {basket,status}=useAppSelector(state=>state.basket);
  const dispatch=useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const product=useAppSelector(state=>productSelectors.selectById(state,id!));
  const {status:productStatus}=useAppSelector(state=>state.catalog);


  const [quantity, setQuantity] = useState(0);
 
  const item = basket?.items.find((i) => i.productId === product?.id);
 
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if(!product&&id) dispatch(fetchOnlyProductAsync(parseInt(id)));
  
  }, [id, item,dispatch,product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }
  function handleUpdateCart() {
    
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
    } else {
      const updatedQuantity = item.quantity - quantity;
     dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
    }
  } 

  if (productStatus.includes("pending")) return <LoadingComponent message="Ürün Yükleniyor..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {(product?.price / 100).toFixed(2)}
          {` `}TRY
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Ürün Adı</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Açıklama</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ürün Tipi</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Marka</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stok Adedi</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Sepetteki Ürün Adedi"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={(item?.quantity === quantity)|| (!item && quantity===0)}
              loading={status.includes('pending')}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Sepeti GÜncelle" : "Sepete Ekle"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

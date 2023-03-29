import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}
export function ProductCard({ product }: Props) { 
  const {status}=useAppSelector(state=>state.basket);
  const dispatch =useAppDispatch();

  // function handleAddItem(productId:number){
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //   .then(basket=>dispatch(setBasket(basket)))
  //   .catch(error=>console.log(error))
  //   .finally(()=>setLoading(false));
  // }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{bgcolor:'common'}}>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx:{fontWeight:'bold', color:'secondary.main'}
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor:'lightblue' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
        loading={status ==='pendingAddItem'+ product.id}
        onClick={() => dispatch(addBasketItemAsync({productId:product.id,quantity:1}))}        
        size="small">Sepete Ekle</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}  size="small">İncele</Button>
      </CardActions>
    </Card>
  );
}

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
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}
export function ProductCard({ product }: Props) {
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
          {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Addto Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}

import {  Divider,  Grid,  Table,  TableBody,  TableCell,  TableContainer,  TableRow,  Typography,} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import agent from "../../app/api/agent";
import { convertToObject } from "typescript";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, SetProduct] = useState<Product | null>(null);
  const [loading, SetLoading] = useState(true);
  //  //*Merkezleştirme geliştirmesinden önce
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/products/${id}`)
  //     .then((response) => SetProduct(response.data))
  //     .catch((error) => console.log(error))
  //     .finally(() => SetLoading(false));
  // }, [id]);

  useEffect(() => {
    agent.Catalog.details(parseInt(id!)) ///id string geldiği için int değere çevirmem gerekti ayrıca id ye '' işareti eklemek gerekiyor syntax değişmiş
      .then((response) => SetProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => SetLoading(false));
  }, [id]);

  if (loading) return <h3>Yükleniyor...</h3>;
  if (!product) return <h3>Ürün Bulunamadı</h3>;

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
          {(product?.price / 100).toFixed(2)} TRY
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
      </Grid>
    </Grid>
  );
}

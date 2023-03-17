import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {productsLoaded,status} = useAppSelector(state=>state.catalog);
   
  useEffect(() => {
     if(!productsLoaded) dispatch(fetchProductsAsync());

  }, [productsLoaded,dispatch]); //[] empty array eklemezsek sürekli products 'u çağrıyor buyüzden ekledik

  if (status.includes('pending')) return <LoadingComponent message="Ürünler Yükleniyor..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

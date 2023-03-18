import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {productsLoaded,status,filterLoaded} = useAppSelector(state=>state.catalog);
   
  useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
      
  }, [productsLoaded, dispatch]); //[] Product için 

  useEffect(() => {
      if (!filterLoaded) dispatch(fetchFilters());

  }, [filterLoaded,dispatch]); //[] filtreleme için API yi iki kere çağırıyordu ayrı ayrı yazdık


  if (status.includes('pending')) return <LoadingComponent message="Ürünler Yükleniyor..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

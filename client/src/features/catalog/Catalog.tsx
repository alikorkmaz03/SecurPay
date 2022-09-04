import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]); ///Dinamik hale getiricez interface olusturmustuk
  const [loading,setLoading]=useState(true);

  //Merkezleştirme geliştirmesinden önce
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []); //[] empty array eklemezsek sürekli products 'u çağrıyor buyüzden ekledik

   //Merkezleştirme geliştirmesinden Sonra agent üzerinden çağrıyoruz
  useEffect(() => {
    agent.Catalog.list()
    .then(products =>setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }, []); //[] empty array eklemezsek sürekli products 'u çağrıyor buyüzden ekledik
  
  if(loading) return <LoadingComponent message='Ürünler Yükleniyor...'/>

  // function addProduct(){
  //   setProducts(prevState=> [...prevState, {name: 'product' + (prevState.length+1), price:(prevState.length*100)+100}])
  // } //üstteki eski Product dizisini değiştirince bu kod hata vericek çünkü interface teki diğer alanları da bekliyor

  // function addProduct() {
  //   setProducts((prevState) => [
  //     ...prevState,
  //     {
  //       id: prevState.length + 101,
  //       name: "product" + (prevState.length + 1),
  //       price: prevState.length * 100 + 100,
  //       brand: "some brand",
  //       description: "some description",
  //       pictureUrl: "http://picsum.photos/200",
  //     },
  //   ]);
  // } //üstteki eski Product dizisini değiştirince bu kod hata vericek çünkü interface teki diğer alanları da bekliyor
  return (
    <>
      <ProductList products={products} />
    </>
  )
}

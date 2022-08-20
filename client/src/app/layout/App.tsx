import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import Header from "./Header";

function App() {
//  const [products, setProducts] =useState([  
//     {name: 'product1',price:100.00},
//     {name: 'product2',price:200.00},   
//  ]); ///Statik olan Product Dizimiz

 const [products, setProducts] =useState<Product[]>([]); ///Dinamik hale getiricez inbterface olusturmustuk


 useEffect(()=>{
  fetch('http://localhost:5000/api/Products')
  .then(response => response.json())
  .then(data =>setProducts(data))
 },[])//[] empty array eklemezsek sürekli products 'u çağrıyor buyüzden ekledik

// function addProduct(){
//   setProducts(prevState=> [...prevState, {name: 'product' + (prevState.length+1), price:(prevState.length*100)+100}])
// } //üstteki eski Product dizisini değiştirince bu kod hata vericek çünkü interface teki diğer alanları da bekliyor

function addProduct(){
  setProducts(prevState=> [...prevState, 
    {
      id:prevState.length+101,
      name: 'product' + (prevState.length+1), 
      price:(prevState.length*100)+100,
      brand:'some brand',
      description:'some description',
      pictureUrl:'http://picsum.photos/200',

  }]);
} //üstteki eski Product dizisini değiştirince bu kod hata vericek çünkü interface teki diğer alanları da bekliyor
  return (
    
    // <div className="app">
    //   <h1>NtStore</h1>
    //   <ul>
    //     {products.map((item,index)=>(
    //     <li key={index}>{item.name} - {item.price}</li>
    //     ))}
    //   </ul>
    // <button onClick={addProduct}>Add Product</button>
    // </div> // Product'ın eski hali artık parametreler değişti düzenlenmiş hali aşağıdaki gibidir.
     <div>      
      {/* <Typography variant='h1'>NtStore</Typography> */}
      <CssBaseline/>
      <Header/>
      <Container><Catalog products={products} addProduct={addProduct}/></Container>
          
    </div> // Product'ın eski hali artık parametreler değişti düzenlenmiş hali aşağıdaki gibidir.
    
  );
}

export default App;

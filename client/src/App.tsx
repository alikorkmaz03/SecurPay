import { useEffect, useState } from "react";



function App() {
 const [products, setProducts] =useState([  
    {name: 'product1',price:100.00},
    {name: 'product2',price:200.00},   
 ]);

 useEffect(()=>{
  fetch('http://localhost:5000/api/Products')
  .then(response => response.json())
  .then(data =>setProducts(data))
 },[])//[] empty array eklemezsek sürekli products 'u çağrıyor buyüzden ekledik

function addProduct(){
  setProducts(prevState=> [...prevState, {name: 'product' + (prevState.length+1), price:(prevState.length*100)+100}])
}
  return (
    
    <div className="app">
      <h1>NtStore</h1>
      <ul>
        {products.map((item,index)=>(
        <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
    <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;

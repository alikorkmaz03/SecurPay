import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const[darkMode,setDarkMode]=useState(false);
  const palletType=darkMode ? 'dark' : 'light';
  const theme =createTheme({
    palette:{
      mode:palletType,
      background :  {
        default: palletType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChangeColor()
  {
    setDarkMode(!darkMode);
  }
  //  const [products, setProducts] =useState([
  //     {name: 'product1',price:100.00},
  //     {name: 'product2',price:200.00},
  //  ]); ///Statik olan Product Dizimiz

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
    <ThemeProvider theme={theme}>
      {/* <Typography variant='h1'>NtStore</Typography> */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChangeColor={handleThemeChangeColor}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider> // Product'ın eski hali artık parametreler değişti düzenlenmiş hali aşağıdaki gibidir.
  );
}

export default App;

import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/util";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
 /*Uygulama sepete ekleme işlemi olduğunda ilk buraya gelir bunu bunu kaldırıp redux ile yapacağız. Dispatch tanımlıcaz  */
  // const {setBasket} =useNtStoreContext();
  const dispatch=useAppDispatch();
  const[loading,setLoading]=useState(true);

  useEffect(()=>{

    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket=> dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false));
    }
    else {
      setLoading(false);
    }  
    
  },[dispatch])

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

  if (loading) return <LoadingComponent message="Uygulama başlatılıyor.."/>
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
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChangeColor={handleThemeChangeColor}/>
      <Container>
      <Outlet />
      </Container>
    </ThemeProvider> // Product'ın eski hali artık parametreler değişti düzenlenmiş hali aşağıdaki gibidir.
  );
}

export default App;

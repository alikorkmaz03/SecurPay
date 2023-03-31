import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";

function App() {
    const location = useLocation();
    /*Uygulama sepete ekleme işlemi olduğunda ilk buraya gelir bunu bunu kaldırıp redux ile yapacağız. Dispatch tanımlıcaz  */
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());

        } catch (error: any) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {

        initApp().then(() => setLoading(false));

    }, [initApp])

    const [darkMode, setDarkMode] = useState(false);
    const palletType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: palletType,
            background: {
                default: palletType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChangeColor() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message="Uygulama başlatılıyor.." />


    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChangeColor={handleThemeChangeColor} />
            {loading ? <LoadingComponent message="Uygulama başlatılıyor.." />
                    : location.pathname === '/' ? <HomePage />
                    : <Container sx={{mt:4}} >
                        <Outlet />
                      </Container>
            }
        </ThemeProvider> // Product'ın eski hali artık parametreler değişti düzenlenmiş hali aşağıdaki gibidir.
    );
}

export default App;

import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { counterSlice } from "../../features/contact/counterSlice";
// export function configureStore(){

//     return createStore(counterReducer);
// }

//*Redux'a slicelarımızı bildirdiğimiz kısım/
export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket:basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account:accountSlice.reducer
    }
})

/*dispatch fonksiyonu, Redux uygulamasında state'i güncellemek için kullanılan önemli bir araçtır. İşlemleri (actions) alır ve onları ilgili reducer'lara iletir, 
ardından state'i günceller ve bileşenlerin yeniden render edilmesini sağlar. */

/*Bu tip, Redux store'unun mevcut durumunu (state) temsil ediyor.ReturnType<typeof store.getState> ifadesi, store.getState fonksiyonunun döndüğü tipi belirtir. 
Bu şekilde, RootState tipi dinamik olarak türetilir ve store'un mevcut durumunu temsil eder. Bu, Redux uygulamasının daha güvenli ve hata önleyici bir şekilde yazılmasına yardımcı olur.*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=>useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState>=useSelector;
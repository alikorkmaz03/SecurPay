import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
import { Basket } from "../models/basket";

interface NtStoreContextValue
{
    basket:Basket| null;
    setBasket: (basket:Basket)=>void;
    removeItem : (productId:number ,quantity:number)=>void;      
}
export const NtStoreContext = createContext<NtStoreContextValue | undefined>(undefined);//default değer vermek için undifened yazdık

export function useNtStoreContext()
{
    const context = useContext(NtStoreContext);

    if(context===undefined){
        throw Error("Hata- sağlayıcının içinde görünmüyorsunuz")
    }
    return context;
}

export function NtStoreProvider({children}:PropsWithChildren<any>)
{
    const [basket,setBasket]=useState<Basket |null>(null);

    function removeItem(productId:number,quantity:number)
    {
        if(!basket) return;
        const items=[...basket.items];
        const itemIndex=items.findIndex(i=>i.productId===productId);
        if(itemIndex>=0)
        {
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity===0) items.splice(itemIndex,1);
            setBasket(prevState=>{
                return {...prevState!,items}
            })
        }
    }
    return(
        <NtStoreContext.Provider value={{basket,setBasket,removeItem}} >{children}</NtStoreContext.Provider>
    )
}
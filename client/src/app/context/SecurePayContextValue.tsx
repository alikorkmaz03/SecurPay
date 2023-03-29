import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
import { Basket } from "../models/basket";

interface SecurePayStoreContextValue
{
    basket:Basket| null;
    setBasket: (basket:Basket)=>void;
    removeItem : (productId:number ,quantity:number)=>void;      
}
export const SecurePayContext = createContext<SecurePayStoreContextValue | undefined>(undefined);//default değer vermek için undifened yazdık

export function useSecurePayContext()
{
    const context = useContext(SecurePayContext);

    if(context===undefined){
        throw Error("Hata- sağlayıcının içinde görünmüyorsunuz")
    }
    return context;
}

export function SecurePayProvider({children}:PropsWithChildren<any>)
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
        <SecurePayContext.Provider value={{ basket, setBasket, removeItem }} >{children}</SecurePayContext.Provider>
    )
}
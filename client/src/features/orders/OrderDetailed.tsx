import { Box, Button, Grid, Typography } from "@mui/material"; 
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
    
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price),0)?? 0;
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[] | null>(null);

    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    }, []);

    if(loading) return <LoadingComponent message='Siparişler Yükleniyor'/>

    return (
        <>
            <Box display='flex'  justifyContent={"space-between"}>
                <Typography sx={{p:2}} gutterBottom variant="h4" >Siparişiniz# {order.id} - {order.orderStatus}</Typography>
                <Button onClick={()=>setSelectedOrder(0)} sx={{m:2}} size='large' variant="contained">Siparişlere Geri Dön</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
            <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal}/>
                </Grid>
            </Grid>
        </>
    )
}

 
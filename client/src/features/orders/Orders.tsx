import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function Orders() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);
  
const OrderStatus = ({ order }: any) => {
    let statusStyle;

    switch (order.orderStatus) {
        case 'ÖdemeBekliyor':
            statusStyle = { color: 'blue' };
            break;
        case 'ÖdemeAlındı':
            statusStyle = { color: 'green' };
            break;
        case 'ÖdemeReddedildi':
            statusStyle = { color: 'red' };
            break;
        default:
            statusStyle = {};
            break;
    }

    return (
        <TableCell align="right" style={statusStyle}>{order.orderStatus}</TableCell>
    );
};
    
    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingComponent message='Siparişler Yükleniyor...' />

    if (selectedOrderNumber > 0)
    return (
        <OrderDetailed order={orders?.find(o => o.id === selectedOrderNumber)!}
            setSelectedOrder={setSelectedOrderNumber}
        />
    )
    

    return (
        <>  
            <Typography variant="h2">Siparişlerim</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sipariş Numarası</TableCell>
                            <TableCell align="right">Toplam</TableCell>
                            <TableCell align="right">Sipariş Tarihi</TableCell>
                            <TableCell align="right">Sipariş Durumu</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order: any) => (
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                                <TableCell align="right"><OrderStatus order={order} /></TableCell>
                                <TableCell align="right"><Button onClick={() => setSelectedOrderNumber(order.id)}>İncele</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
 

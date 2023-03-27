import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react"; 
import LoadingComponent from "../../app/layout/LoadingComponent";
import OrderDetailed from "../orders/OrderDetailed";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CustomerPaymentsSearch from "./CustomerPaymentsSearch";
import {
  customerPaymentsSelectors,
  fetchCustomerPaymentsAsync,
  setPageNumber
} from "./customerPaymentsSlice";
import AppPagination from "../../app/components/AppPagination";
import agent from "../../app/api/agent";
import DateRangePicker from "../../app/components/DateRangePicker";


export default function CustomerPayments() {
  const [loading, setLoading] = useState(true);
  const customerPayments = useAppSelector(customerPaymentsSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { customerPaymentsLoaded, metaData} = useAppSelector((state) => state.customerpayments); //Reduxtan birşey almak istediğimizde catalog için burada tanımlıyoruz.
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);
  const OrderStatus = ({ order }: any) => {
    let statusStyle;

    switch (order.orderStatus) {
      case "ÖdemeBekliyor":
        statusStyle = { color: "blue" };
        break;
      case "ÖdemeAlındı":
        statusStyle = { color: "green" };
        break;
      case "ÖdemeReddedildi":
        statusStyle = { color: "red" };
        break;
      default:
        statusStyle = {};
        break;
    }

    return (
      <TableCell align="right" style={statusStyle}>
        {order.orderStatus}
      </TableCell>
    );
  };
  
  useEffect(() => {
    agent.Orders.list()
      .then(() => dispatch(fetchCustomerPaymentsAsync()))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!customerPaymentsLoaded) dispatch(fetchCustomerPaymentsAsync());
  }, [customerPaymentsLoaded, dispatch]);
 
  if (loading)
    return <LoadingComponent message="Ödeme Listesi Yükleniyor..." />;

  if (selectedOrderNumber > 0)
    return (
      <OrderDetailed
        order={customerPayments?.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <>
      <Typography variant="h2">Müşteri ödemeleri</Typography>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={5} sx={{ mb: 2 }}>
          <CustomerPaymentsSearch /> <DateRangePicker/>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sipariş Numarası</TableCell>
              <TableCell align="right">Müşteri Adı</TableCell>
              <TableCell align="right">Sipariş Tarihi</TableCell>
              <TableCell align="right">Sipariş Durumu</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {customerPayments?.map((order: any) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{order.buyerId}</TableCell>
                <TableCell align="right">
                  {order.orderDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">
                  <OrderStatus order={order} />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => setSelectedOrderNumber(order.id)}>
                    İncele
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
         
        </Table>
      </TableContainer>
      <Grid item xs={3} />
          <Grid item xs={9} sx={{ m: 2 }}>
            {metaData && (
              <AppPagination
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setPageNumber({ pageNumber: page }))
                }
              />
            )}
          </Grid>
    </>
  );
}

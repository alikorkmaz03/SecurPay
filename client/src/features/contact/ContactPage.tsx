import { Button, ButtonGroup, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { CounterState, decrement, increment } from "./counterReducer";

export default function ContactPage() {
  const dispatch = useDispatch();//Dispatch, Redux veri yönetimi kütüphanesinde veri değişikliği işlemlerini yapmak için kullanılan bir mekanizmadır.
  const { data, title } = useSelector((state: CounterState) => state);
  return (
    <>
      <Typography variant="h2"> {title}</Typography>

      <Typography variant="h5"> Data Alanı : {data}</Typography>
      <ButtonGroup>
        <Button onClick={()=>dispatch(decrement())} variant='contained' color='error'>Azalt</Button>
        <Button onClick={()=>dispatch(increment())} variant='contained' color='primary'>Arttır</Button>
        <Button onClick={()=>dispatch(increment(5))} variant='contained' color='secondary'> 5er 5er Arttır</Button>
      </ButtonGroup>
    </>
  );
}

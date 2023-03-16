import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";


export default function ContactPage() {
  // const dispatch = useDispatch();//Dispatch, Redux veri yönetimi kütüphanesinde veri değişikliği işlemlerini yapmak için kullanılan bir mekanizmadır.
  const dispatch =useAppDispatch();
  // const { data, title } = useSelector((state: CounterState) => state);
  const {data,title}= useAppSelector(state=>state.counter);
  return (
    <>
      <Typography variant="h2"> {title}</Typography>

      <Typography variant="h5"> Data Alanı : {data}</Typography>
      <ButtonGroup>
        <Button onClick={()=>dispatch(decrement(1))} variant='contained' color='error'>Azalt</Button>
        <Button onClick={()=>dispatch(increment(1))} variant='contained' color='primary'>Arttır</Button>
        <Button onClick={()=>dispatch(increment(5))} variant='contained' color='secondary'> 5er 5er Arttır</Button>
      </ButtonGroup>
    </>
  );
}

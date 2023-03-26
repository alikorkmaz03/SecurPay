import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setCustomerPaymentsParams } from "./customerPaymentsSlice"; 

export default function CustomerPaymentsSearch() {
    const { customerPaymentsParams } = useAppSelector(state => state.customerpayments);
    const [searchTerm, setSearchTerm] = useState(customerPaymentsParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setCustomerPaymentsParams({ searchTerm: event.target.value }))
          
    },1000)
    return (
        <TextField
            label='Müşteri Adı İle Ödeme Ara'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}

        />
    );
}

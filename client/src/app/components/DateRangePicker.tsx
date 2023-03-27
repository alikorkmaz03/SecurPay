import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Grid } from '@mui/material';

import {setStartDate,setEndDate,setPageNumber, fetchCustomerPaymentsAsync} from '../../features/customerpayments/customerPaymentsSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

export default function DatePickerValue() {
  const { customerPaymentsParams } = useAppSelector((state) => state.customerpayments);
  const dispatch = useAppDispatch();

  const handleStartDateChange = async (date: Dayjs | null) => {
    if (date) {
      await dispatch(setStartDate(date.format('YYYY-MM-DD')));
    }
  };

  const handleEndDateChange = async (date: Dayjs | null) => {
    if (date) {
      await dispatch(setEndDate(date.format('YYYY-MM-DD')));
    }
  };

  const applyFilter = () => {
    dispatch(setPageNumber({ pageNumber: 1 }));
    dispatch(fetchCustomerPaymentsAsync());
  };

  const cleanFilter = () => {
    dispatch(setStartDate(''));
    dispatch(setEndDate(''));
    dispatch(setPageNumber({ pageNumber: 1 }));
    dispatch(fetchCustomerPaymentsAsync());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Başlangıç Tarihi"
            value={customerPaymentsParams.startDate ? dayjs(customerPaymentsParams.startDate) : null }
            onChange={handleStartDateChange}
            format="YYYY-MM-DD"
             
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Bitiş Tarihi"
            value={customerPaymentsParams.endDate ? dayjs(customerPaymentsParams.endDate) : null }
            onChange={handleEndDateChange}
            format="YYYY-MM-DD"             
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"  sx={{mr:3}}  color="secondary" onClick={applyFilter}>
            Filtrele
          </Button>

          <Button variant="contained" color="warning" onClick={cleanFilter}>
            Filtreyi Temizle 
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

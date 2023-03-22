import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import AppCheckbox from '../../app/components/AppCheckbox';

export default function AddressForm() {
    const { control,formState } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Kargo Adresi
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='fullName' label='Ad Soyad' />
                </Grid>

                <Grid item xs={12}>
                    <AppTextInput control={control} name='address1' label='Addres Satır 1' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='address2' label='Addres Satır 2' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='city' label='City' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='state' label='İlçe' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='zip' label='Posta Kodu' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='country' label='Ülke' />
                </Grid>
                <Grid item xs={12}>
                    <AppCheckbox
                        disabled={!formState.isDirty} //formda değişiklik yapıldığında aktif hale gelir
                        name='saveAddress'
                        label='Varsayılan adres olarak Kaydet'
                        control={control} />
                </Grid>
            </Grid>

        </>
    );
}
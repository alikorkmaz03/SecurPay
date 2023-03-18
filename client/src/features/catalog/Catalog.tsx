import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
    { value: 'name', label: 'İsme Göre Sırala' },
    { value: 'priceDesc', label: 'En Yüksek Fiyat' },
    { value: 'price', label: 'En Düşük Fiyat' },
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filterLoaded, brands, types } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]); //[] Product için 

    useEffect(() => {
        if (!filterLoaded) dispatch(fetchFilters());

    }, [filterLoaded, dispatch]); //[] filtreleme için API yi iki kere çağırıyordu ayrı ayrı yazdık


    if (status.includes('pending')) return <LoadingComponent message="Ürünler Yükleniyor..." />;

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <TextField
                        label='Ürün Arama'
                        variant='outlined'
                        fullWidth
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormControl component='fieldset'>
                        <RadioGroup>
                            {sortOptions.map(({ value, label }) => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel key={brand} control={<Checkbox />} label={brand} />
                        ))}

                    </FormGroup>
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel key={type} control={<Checkbox />} label={type} />
                        ))}

                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display='flex' sx={{ mb: 2 }} justifyContent='space-between' alignItems='center'>
                    <Typography>
                        20 içerikten 10 tanesi görüntüleniyor
                    </Typography>
                    <Pagination
                        color='secondary'
                        size='large'
                        count={10}
                        page={2}

                    />
                </Box>
            </Grid>
        </Grid>
    );
}

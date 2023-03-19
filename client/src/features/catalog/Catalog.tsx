import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup,Typography } from "@mui/material";
import { useEffect } from "react";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    { value: 'name', label: 'İsme Göre Sırala' },
    { value: 'priceDesc', label: 'En Yüksek Fiyat' },
    { value: 'price', label: 'En Düşük Fiyat' },
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, types,productParams } = useAppSelector(state => state.catalog);
    

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]); //[] Product için 

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());

    }, [filtersLoaded, dispatch]); //[] filtreleme için API yi iki kere çağırıyordu ayrı ayrı yazdık


    if (status.includes('pending')) return <LoadingComponent message="Ürünler Yükleniyor..." />;

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                   <ProductSearch/>
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy:e.target.value}))}            
                    />
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

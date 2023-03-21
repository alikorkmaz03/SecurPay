
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';


const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode:'onTouched'
    })

    async function sumbitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate(location.state?.from || '/catalog');

        }
        catch (error:any) {
            console.log(error);
        }      
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Giriş
                </Typography>
                <Box component="form" onSubmit={handleSubmit(sumbitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Kullanıcı Adınız"
                        autoComplete="username"
                        autoFocus
                        {...register('username', { required: 'Kullanıcı adı girmeniz gereklidir*' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string }
                    />
                    <TextField
                        margin="normal"                         
                        fullWidth                        
                        label="Şifreniz"
                        type="password"
                        autoComplete="current-password"
                        {...register('password', { required: 'Şifrenizi girmeniz gereklidir*' })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}

                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <LoadingButton loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Giriş Yap
                    </LoadingButton>
                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Link to='/register' style={{ textDecoration: 'none' }}>
                                {"Hesabınız yok mu? Üye olmak  Tıklayın "}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import {  useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { router } from '../../app/router/Routes';


const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any): void {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error });
                } else if (error.includes('Email')) {
                    setError('email', { message: error });
                } else if (error.includes('Username')) {
                    setError('username', { message: error });
                }
            });
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Üye Ol
                </Typography>
                <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Başarı bir şekilde üye oldunuz - giriş yapabilirsiniz :)');
                        navigate('/login');
                    }).catch(error => handleApiErrors(error)))}
                    noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Kullanıcı Adı*"
                        autoFocus
                        {...register('username', { required: 'Kullanıcı adı girmeniz gereklidir*' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email*"
                        autoComplete="email"
                        {...register('email', { required: 'email adresinizi girmeniz gereklidir*', pattern: { value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,message:'Lütfen geçerli bir email adresi giriniz'} })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Şifreniz*"
                        type="password"
                        autoComplete="password"
                        {...register('password', {
                            required: 'Şifrenizi girmeniz gereklidir*', pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\];:'",.<>?`~])[A-Za-z\d!@#$%^&*()_+{}[\];:'",.<>?`~]{8,}$/, message: 'Şifreniz en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.' } })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
                   <LoadingButton loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Üye Ol
                    </LoadingButton>
                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                {"Zaten hesabın var mı? Şimdi Giriş Yap "}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { useState } from 'react';


const theme = createTheme();

export default function Register() {
    const [validationErrors, setValidationErrors] = useState([]);
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    })
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
                    .catch(error => setValidationErrors(error)))}
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
                        {...register('email', { required: 'email adresinizi girmeniz gereklidir*' })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
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
                    {validationErrors.length > 0 && (
                        <Alert severity="error">
                            <AlertTitle>Validation Errors</AlertTitle>
                            <List>
                                {validationErrors.map((error) => (
                                    <ListItem key={error}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Alert>
                    )}                  
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

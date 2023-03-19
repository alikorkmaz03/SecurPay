
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';


const theme = createTheme();

export default function Login() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })


    const handleSubmit = (event: any) => {
        event.preventDefault();
        agent.Account.login(values);
    };

    function handleInputChange(event: any) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"                         
                        fullWidth
                        label="Kullanıcı Adınız"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleInputChange}
                        value={values.username}
                    />
                    <TextField
                        margin="normal"                         
                        fullWidth
                        name="password"
                        label="Şifreniz"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        value={values.password}

                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Giriş Yap
                    </Button>
                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Link to='/register'>
                                {"Hesabınız yok mu? Üye olmak  Tıklayın "}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
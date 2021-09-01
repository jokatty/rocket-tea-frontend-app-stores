import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { getCookie, createCookie } from '../../utils/cookie.mjs';
import { checkLogin } from '../../utils/dbQuery.mjs';
import NavBarLogin from '../NavBar/NavBarLogin.jsx';

/* =========================================================== CONTEXT */
import { isLoggedInContext } from '../../context/IsLoggedIn.jsx';

/* =================================================================== */
/* ============================================================== MAIN */
/* =================================================================== */
export default function Login() {
  // On page load. If user is logged in, route to correct store page
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const history = useHistory();

  if (isLoggedIn) {
    const storeId = getCookie('storeId');
    history.push(`/store/${storeId}`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = { login: data.get('login'), password: data.get('password') };
    const { data: loginResponse } = await checkLogin(dataToSend);
    // response is either {id: 1, storeName: "Capital Tower"} or false
    if (!loginResponse) {
    // login details wrong
      setIsLoggedIn(false);
    }
    else {
      createCookie('storeId', loginResponse.id);
      createCookie('storeName', loginResponse.storeName);
      setIsLoggedIn(() => true);
    }
  };

  /* =========================================================== RENDER */
  return (
    <>
      <NavBarLogin />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="login"
                  name="login"
                  autoComplete="login"
                />
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              LOG IN
            </Button>
          </Box>
          <Divider />
          <Typography variant="caption" noWrap>
            Login details for demo:
          </Typography>
          <Typography variant="caption" noWrap>
            login: CHANGICITYPOINT pw: 1234
          </Typography>
        </Box>
      </Container>
    </>
  );
}

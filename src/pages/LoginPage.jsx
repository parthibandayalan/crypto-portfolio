import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/ducks/Authentication";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { LockRounded, AccountCircle } from "@material-ui/icons";

const initialValues = {
  username: "",
  password: "",
};

const useStyles = makeStyles({
  loginPaper: {},
  buttonBlock: {
    width: "90%",
    margin: "auto auto",
    display: "block",
  },
});

export default function LoginPage() {
  let errorVisible = false;
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    console.log("use effect : " + auth);
    if (auth) history.push("/");
    else {
      errorVisible = true;
      console.log("value changed: " + errorVisible);
    }
  }, [auth]);

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src="https://cdn-japantimes.com/wp-content/uploads/2018/01/z2-crypto-a-20180123.jpg"
            style={{ width: "100%", height: "100%" }}
            alt="opening image"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{ padding: 10 }}
          alignItems="center"
          direction="column"
          justify="space-between"
        >
          <div></div>
          <div style={{ width: 250 }}>
            <Grid container justify="center">
              <img
                src={process.env.PUBLIC_URL + "/assets/crypto.png"}
                width={200}
                alt="logo"
              />
            </Grid>
            <div style={{ height: 20 }}></div>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Username is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values, formikHelpers) => {
                // console.log("Submition Done");
                // console.log(values);
                dispatch(loginUser(values));
                //dispatch(loginUser(values));
                // errorVisible = true;
                // console.log("dispatch done outside :" + auth);
              }}
            >
              {({ values, errors, isSubmitting, isValidating }) => (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Grid item>
                    <Typography component="h1" variant="h6">
                      Crypto-Portfolio Tracker
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="h1" variant="h6">
                      Sign in
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    spacing={3}
                  >
                    <Form>
                      <Grid item>
                        <Field
                          required
                          name="username"
                          type="string"
                          as={TextField}
                          label="Username"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <ErrorMessage name="username" />
                      </Grid>
                      <Grid item>
                        <Field
                          required
                          name="password"
                          type="password"
                          as={TextField}
                          label="Password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockRounded />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <ErrorMessage name="password" />
                      </Grid>
                      <div style={{ height: 20 }}></div>
                      <Grid item>
                        <Box marginBottom={2}>
                          <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting || isValidating}
                            className={classes.buttonBlock}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                      <div style={{ height: 5 }}></div>
                      <Grid item>
                        <Box>
                          <Button
                            color="default"
                            type="submit"
                            onClick={() => history.push("/register")}
                            className={classes.buttonBlock}
                          >
                            Register
                          </Button>
                        </Box>
                      </Grid>
                      <div style={{ height: 5 }}></div>
                    </Form>
                    <Grid item>
                      <Box>
                        <Button
                          color="default"
                          type="submit"
                          onClick={() => {
                            dispatch(
                              loginUser({
                                username: "testuserjune27",
                                password: "Password01!",
                              })
                            );
                          }}
                          className={classes.buttonBlock}
                        >
                          Demo Login
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Formik>
          </div>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
}

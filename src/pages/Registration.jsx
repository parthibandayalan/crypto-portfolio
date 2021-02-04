import React from "react";
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  TextField,
  makeStyles,
  MenuItem,
  Box,
  Button,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { createUser, checkUsernameExist } from "../services/PortfolioServices";
import { setSnackbar } from "../redux/ducks/Snackbar";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialValues = {
  name: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

const useStyles = makeStyles((theme) => ({
  regPaper: {
    width: "400px",
    align: "center",
    display: "block",
    align: "center",
    padding: theme.spacing(2, 2),
    margin: theme.spacing(8, 2),
  },
}));

export default function Registration() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div align="center">
      <Card className={classes.regPaper}>
        <CardContent>
          <Typography variant="h4">New User Account Creation</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required()
                .min(6, "Name needs to be atleast 6 character long")
                .max(50, "Name cannot be more than 50 characters long4"),
              username: Yup.string()
                .required("User Name is required")
                .test(
                  "username",
                  "Username Exists already",
                  (value, context) => {
                    //console.log(UserService.checkUsernameExist(value).then((response)=> Boolean(response) ));
                    //return !( value === 'user1');
                    let returnvalue = checkUsernameExist(value);
                    console.log(JSON.stringify(returnvalue));
                    return returnvalue;
                  }
                )
                .min(6, "Username must be at least 6 characters")
                .max(50, "Username must be less 50 characters"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .max(50, "Password must be less than 50 characters")
                .matches(
                  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                  "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                )
                .required("Password is required"),
              passwordConfirmation: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={(values, formikHelpers) => {
              createUser(values)
                .then((response) => {
                  console.log(JSON.stringify(response));
                  dispatch(
                    setSnackbar(true, "success", "User Registration Successful")
                  );
                  history.push("/login");
                })
                .catch(
                  dispatch(
                    setSnackbar(true, "error", "User Registration Failed")
                  )
                );
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="name"
                      type="string"
                      as={TextField}
                      label="Full Name"
                    />
                    <ErrorMessage name="name" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="username"
                      type="string"
                      as={TextField}
                      label="User Name"
                    />
                    <ErrorMessage name="username" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      id="password"
                      name="password"
                      label="Password"
                      as={TextField}
                      type="password"
                      autoComplete="current-password"
                    />
                    <ErrorMessage name="password" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      label="Confirm Password"
                      as={TextField}
                      type="password"
                      autoComplete="current-password"
                    />
                    <ErrorMessage name="passwordConfirmation" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || isValidating}
                  >
                    Submit
                  </Button>
                </Box>
                <Box marginBottom={2}>
                  <Button
                    variant="contained"
                    type="reset"
                    disabled={isSubmitting || isValidating}
                  >
                    Reset
                  </Button>
                </Box>
                {/*<pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>*/}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

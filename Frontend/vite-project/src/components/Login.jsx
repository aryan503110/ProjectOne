import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const login = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={login}
        onSubmit={async (values) => {
          try {
            await axios.post("http://localhost:3000/api/auth/login", values);
            navigate("/home/user");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form>
          <Field as={TextField} name="email" label="Email" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            name="password"
            type="password"
            label="Password"
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;

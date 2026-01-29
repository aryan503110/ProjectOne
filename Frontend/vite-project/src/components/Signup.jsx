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

const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  role: Yup.string().required("Role is required"),
});

axios.defaults.withCredentials = true;
const Signup = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "user",
      }}
      validationSchema={signupSchema}
      onSubmit={async (values) => {
        try {
          await axios.post("http://localhost:3000/api/auth/signup", values);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "300px",
          margin: "auto",
        }}
      >
        <Field as={TextField} name="name" label="Name" />
        <ErrorMessage name="name" component="div" style={{ color: "red" }} />

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

        <Field as={TextField} name="address" label="Address" />
        <ErrorMessage name="address" component="div" style={{ color: "red" }} />

        <Field as={TextField} name="phone" label="Phone" />
        <ErrorMessage name="phone" component="div" style={{ color: "red" }} />

        <FormControl>
          <InputLabel>Role</InputLabel>
          <Field as={Select} name="role" label="Role">
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Field>
        </FormControl>
        <ErrorMessage name="role" component="div" style={{ color: "red" }} />

        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Form>
    </Formik>
  );
};

export default Signup;

import React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import "./style.css";
import * as Yup from "yup";
// import { yeniKullaniciEkle } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { yeniKullaniciKayit } from "../firebase/firebase";

const myValidationSchema = Yup.object({
  firstname: Yup.string()
    .required("Boş Bırakılmaz")
    .min(2, "Çok Kısa")
    .max(15, "Çok uzun"),
  lastname: Yup.string()
    .required("Boş Bırakılmaz")
    .min(2, "Çok Kısa")
    .max(15, "Çok uzun"),
  email: Yup.string()
    .email("Hatalı giriş yaptınız...")
    .required("Lütfen E-mail adresinizi giriniz..."),
  password: Yup.string()
    .required("Şifre Girmeniz gerekmektedir.")
    .min(8, "Çok kısa/ En az 8 karakter giriniz.")
    .matches(/\d+/, "Şifre numara içermelidir.")
    .matches(/[a-z]+/, "şifre küçük harf içermelidir.")
    .matches(/[A-Z]+/, "şifre büyük harf içermelidir.")
    .matches(/[!?.@#$%^&*()-+]+/, "şireniz özel karakter içermelidir."),
  password2: Yup.string()
    .required("Şifre Girmeniz gerekmektedir.")
    .min(8, "Çok kısa/ En az 8 karakter giriniz.")
    .oneOf([Yup.ref("password"), null], "Girdiğiniz şifre eşleşmedi."),
});
function Register() {
  const navigate = useNavigate();
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const isimSoyisim = `${values.firstname} ${values.lastname}`
    yeniKullaniciKayit(values.email, values.password,isimSoyisim,navigate);
    resetForm();
  };
  return (
    <div className="mustafa">
      <HowToRegIcon sx={{ transform: "scale(3)" }} />
      <h1>Register Page</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={myValidationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }) => (
          <form className="box" onSubmit={handleSubmit}>
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              value={values.firstname}
              onChange={handleChange}
              helperText={touched.firstname && errors.firstname}
              error={touched.firstname && Boolean(errors.firstname)}
              onBlur={handleBlur}
            />
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              value={values.lastname}
              onChange={handleChange}
              helperText={touched.lastname && errors.lastname}
              error={touched.lastname && Boolean(errors.lastname)}
              onBlur={handleBlur}
            />
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
              onBlur={handleBlur}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              type="password"
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              onBlur={handleBlur}
            />
            <TextField
              name="password2"
              label="Password"
              variant="outlined"
              value={values.password2}
              onChange={handleChange}
              type="password"
              helperText={touched.password2 && errors.password2}
              error={touched.password2 && Boolean(errors.password2)}
              onBlur={handleBlur}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "30%" }}
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;

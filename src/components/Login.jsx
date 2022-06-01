// import React, { useContext } from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import "./style.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { kullaniciGiris } from "../firebase/firebase";
// import { googleLogin, kullaniciGiris } from "../helpers/firebase";
// import AppContext from "../contexts/AppContext";
// import GoogleIcon from "@mui/icons-material/Google";

const myValidationSchema = Yup.object({
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
});

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    kullaniciGiris(values.email,values.password,navigate);
    resetForm();
  };

//   const googleIleGirisIcın = () => {
//     googleLogin(navigate);
//   };
  return (
    <div className="mustafa">
      <HowToRegIcon sx={{ transform: "scale(3)" }} />
      <h1>Login Page</h1>
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
            <div style={{ display: "flex", justifyContent: "center" ,flexDirection:"column",alignItems:"center",gap:"10px"}}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "30%" }}
                type="submit"
              >
                Login
              </Button>
              {/* <Button
                variant="contained"
                color="success"
                sx={{ width: "30%" }}
                endIcon={<GoogleIcon />}
                onClick={googleIleGirisIcın}
              >
                Login
              </Button> */}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
import React, { useContext, useEffect, useState } from "react";
import loginPic from "../assets/login-logo-2.png";
import Logo from "../assets/logo.avif";
import { Formik } from "formik";
import { LoginForm } from "../components";
import * as Yup from "yup";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../reactcontext/ReactContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loginInfo.login) {
      navigate("/dashboard");
    }
  }, [loginInfo]);

  const initialValues = {
    email: "",
    passwd: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    passwd: Yup.string().required("Password is required"),
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(`${apiUrl}/auth/login`, { ...data, password: data.passwd })
      .then((res) => {
        localStorage.setItem("loginToken", res.data);
        // console.log(res)
        axios
          .get(`${apiUrl}/auth/authenticatedUser`, {
            headers: {
              loginToken: localStorage.getItem("loginToken"),
            },
          })
          .then((res) => {
            const userData = {
              ...loginInfo,
              userDetails: {
                id: res.data.loginInfo.userId,
                email: res.data.loginInfo.email,
                firstName: res.data.loginInfo.User.firstName,
                lastName: res.data.loginInfo.User.lastName,
                role: res.data.loginInfo.UserRole.roleName,
              },
              login: true,
            };

            setLoginInfo(userData);

            // console.log(res.data)
            setLoading(false);
            navigate("/dashboard");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.error);
            } else {
              console.log(err);
            }
          });
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error !",
          text: JSON.stringify(err.response.data.error),
        });
        console.log(err);
        setLoading(false);
      });
  };

  return (
    //login container
    <div className="h-[100vh] mx-2 flex flex-1 md:flex-row items-center flex-col w-[375px]">
      {/* login details */}
      <div className="h-full flex flex-col flex-1 py-5">
        {/* rectangle */}
        <div className="py-3 flex flex-row justify-center">
          <img src={Logo} alt="LOGO" className="w-24" />
        </div>
        <div className="flex flex-col p-3 px-5 bg-primary rounded-lg">
          <h1 className="text-gradient text-[18pt] font-bold">
            Login to Rahman Group
          </h1>
          <p className="my-1 text-dimWhite">
            A digital way to keep track of your records
          </p>
        </div>

        {/* input collection */}
        {loading ? (
          <div className="h-[100%] mt-20 mx-auto">Loading ...</div>
        ) : (
          <div className="flex flex-col p-3 overflow-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <LoginForm loading={loading} />
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/login-register.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
const SignIn = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [matchPass, setMatchPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = (data) => {
    console.log(data);
    //if password not matched
    if (data.password !== data.confrimpassword) {
      return setMatchPass(false);
    } else if (data.password === data.confrimpassword) {
      setMatchPass(true);
      setLoading(true);
      loginUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          if (user.uid) {
            toast.success("Successfully Login!!!");
            setLoading(false);
            navigate("/create-todos");
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login -Hellwet Todo</title>
      </Helmet>
      <div className="text-center my-[2rem] lg:my-[5rem] ">
        <h3 className="text-2xl mb-2 lg:text-4xl font-semibold text-secondary ">
          Welcome To Hellwet Todo App
        </h3>
        <p className="text-xl text-black">
          You cannot use the Todo app without registration or login. Please
          register and click on login if you have already registered.
        </p>
      </div>
      <div className="flex justify-center items-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex lg:gap-10">
          <div
            className="w-full h-auto  hidden lg:block lg:w-full bg-cover rounded-l-lg"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>

          <div className="w-full lg:w-7/12 dark:bg-black dark:text-white bg-white p-5 rounded-lg lg:rounded-l-none border shadow-2xl">
            <h3 className="pt-4 text-2xl text-center">Login Now!</h3>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="inline-block mb-1 font-medium"
                >
                  E-mail
                </label>
                <input
                  placeholder="Enter Your Email"
                  type="email"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Email Field is required
                  </p>
                )}
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="password"
                  className="inline-block mb-1 font-medium"
                >
                  Password
                </label>
                <input
                  placeholder="Enter Your Password"
                  type="password"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    password Field is required
                  </p>
                )}
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="confrimpassword"
                  className="inline-block mb-1 font-medium"
                >
                  Confrim Password
                </label>
                <input
                  placeholder="Enter Your confrim password"
                  type="password"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="confrimpassword"
                  name="confrimpassword"
                  {...register("confrimpassword", { required: true })}
                />
                {errors.confrimpassword?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    confrim password Field is required
                  </p>
                )}
              </div>
              <div className="mb-1 sm:mb-2 text-error">
                {!matchPass ? "Password Not Matched" : ""}
              </div>
              <div className="mt-4 mb-2 sm:mb-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black btn btn-primary"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

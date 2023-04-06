import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const CreateTodos = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddTodo = (data) => {
    setLoading(true);
    // console.log(data);
    // const date = format(startDate, "PP");
    const todo = {
      todoName: data.todoName,
      todoDesc: data.todoDesc,
      creatorEmail: user?.email,
      date: startDate,
    };
    console.log(todo);
    fetch("https://mern-todo-app-server-red.vercel.app/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully Todo Add!!!");
        setLoading(false);
        navigate("/my-todos");
      });
  };

  return (
    <div className="px-4 lg:px-0">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Todo -Hellwet Todo</title>
      </Helmet>
      <section className="max-w-4xl  p-6 mx-auto bg-secondary rounded-md shadow-md dark:bg-gray-800 lg:mt-10 mt-5">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Add Todo
        </h1>
        <form onSubmit={handleSubmit(handleAddTodo)}>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Todo Name
              </label>
              <input
                {...register("todoName", { required: true })}
                id="todoName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.todoName && (
                <span className="py-3 text-red-500">
                  todoName field is required
                </span>
              )}
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="productPrice"
              >
                Email
              </label>
              <input
                id="userEmail"
                type="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="date">
                Date
              </label>
              <div className="relative">
                <DatePicker
                  className="py-2 border rounded-md w-full px-4"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="desc">
                Todo Description
              </label>
              <textarea
                {...register("todoDesc", { required: true })}
                id="desc"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
              {errors.todoDesc && (
                <span className="mt-3 text-red-500">
                  todoDesc field is required
                </span>
              )}
            </div>
          </div>

          <p className="text-center mt-2 text-white font-semibold">
            Note: Make Sure You Fill-Up Every Filed!
          </p>
          <div className="flex justify-center mt-6">
            {loading ? (
              <Loader />
            ) : (
              <input
                type="submit"
                disabled={loading}
                value="Publish Todo"
                className="btn  btn-outline text-white"
              />
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateTodos;

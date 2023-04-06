import React, { useState } from "react";
import Loader from "../../Loader/Loader";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
const UpdateTodos = () => {
    const [loading, setLoading] = useState(false);
    const todo = useLoaderData();
    const [startDate, setStartDate] = useState(todo.data.date);

  const { user } = useContext(AuthContext);
  const handleUpdate = (e) => {};
  return (
    <div className="px-4 lg:px-0">
      <section className="max-w-4xl  p-6 mx-auto bg-secondary rounded-md shadow-md dark:bg-gray-800 lg:mt-10 mt-5">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Update
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Todo Name
              </label>
              <input
                defaultValue={todo.data.todoName}
                required
                id="todoName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
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
              {/* <div className="relative">
                <DatePicker
                  required
                  className="py-2 border rounded-md w-full px-4"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div> */}
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="desc">
                Todo Description
              </label>
              <textarea
                defaultValue={todo.data.todoDesc}
                required
                id="desc"
                type="textarea"
                className="block h-36 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
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
                value="Update Todo"
                className="btn  btn-outline text-white"
              />
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateTodos;

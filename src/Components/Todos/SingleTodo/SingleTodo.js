import React, { useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Loader from "../../Loader/Loader";
import UpdateModal from "../UpdateModal/UpdateModal";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

const SingleTodo = () => {
  const [loading, setLoading] = useState(false);
  const todo = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  if (navigation.state === "loading" || navigation.state === "submitting") {
    return setLoading(true);
  }
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3A4AC3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("I want to Delete");

        fetch(
          `https://mern-todo-app-server-red.vercel.app/todo/${todo.data._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            navigate("/my-todos");
          });
      }
    });
  };
  console.log(todo);
  return (
    <div className="px-4 py-5 flex justify-center items-center h-[600px] lg:h-[750px] mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details Todo -Hellwet Todo</title>
      </Helmet>
      {loading && <Loader />}
      <div className="card w-full  bg-secondary text-white">
        <div className="card-body">
          <h2 className="card-title">Todo Name: {todo.data?.todoName}</h2>
          <p className="my-10">Description: {todo.data?.todoDesc}</p>
          <p className="font-semibold">
            Date:{" "}
            {todo.data.date ? format(new Date(todo.data?.date), "PP") : null}
          </p>
          <div className="card-actions justify-center py-5 gap-4 lg:gap-16">
            <label htmlFor="todo-modal" className="btn btn-primary text-black">
              Update Todo
            </label>

            <button
              onClick={handleDelete}
              className="btn btn-error text-white "
            >
              Delete Todo
            </button>
          </div>
        </div>
      </div>
      <UpdateModal todo={todo.data} />
    </div>
  );
};

export default SingleTodo;

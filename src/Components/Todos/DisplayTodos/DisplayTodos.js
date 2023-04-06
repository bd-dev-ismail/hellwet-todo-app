import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const DisplayTodos = () => {
  const { user } = useContext(AuthContext);
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/todo?email=${user?.email}`
      );
      const data = await res.json();
      return data.data;
    },
  });
  let content;
  if (isLoading) {
    content = <Loader />;
  }

  if (todos.length) {
    content = (
      <>
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="card w-full lg:w-96 bg-primary text-primary-content"
          >
            <div className="card-body">
              <h2 className="card-title">{todo?.todoName}</h2>
              <p>{todo?.todoDesc.slice(0, 50)}...</p>
              <p className="font-semibold">Date: {todo?.date}</p>
              <div className="card-actions justify-end">
                <Link to={`details/${todo._id}`}>
                  <button className="btn btn-sm btn-secondary text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="mx-auto px-4  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div>
        {todos.length ? (
          <>
            <h3 className="text-3xl font-bold my-10">
              My <span className="text-secondary">Todos</span>
            </h3>
          </>
        ) : (
          <h3 className="text-3xl font-bold my-10">
            No Todo Available Yet. Please create a Todo From{" "}
            <Link to="/create-todos" className="text-secondary">
              Create Todos
            </Link>
          </h3>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {content}
      </div>
    </div>
  );
};

export default DisplayTodos;

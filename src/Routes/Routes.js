import { createBrowserRouter } from "react-router-dom";
import Register from "../Components/Login/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import SignIn from "../Components/Login/SignIn";
import CreateTodos from "../Components/Todos/CreateTodos/CreateTodos";
import DisplayTodos from "../Components/Todos/DisplayTodos/DisplayTodos";
import UpdateTodos from "../Components/Todos/UpdateTodos/UpdateTodos";
import Main from "../layouts/Main";
import SingleTodo from "../Components/Todos/SingleTodo/SingleTodo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/create-todos",
        element: <CreateTodos />,
      },
      { path: "/my-todos", element: <DisplayTodos /> },
      {
        path: "/my-todos/details/:id",

        loader: ({ params }) =>
          fetch(`http://localhost:5000/signle-todo/${params.id}`),
        element: <SingleTodo />,
      },
    ],
  },
]);

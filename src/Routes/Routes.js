import { createBrowserRouter } from "react-router-dom";
import Register from "../Components/Login/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import SignIn from "../Components/Login/SignIn";
import CreateTodos from "../Components/Todos/CreateTodos/CreateTodos";
import DisplayTodos from "../Components/Todos/DisplayTodos/DisplayTodos";

import Main from "../layouts/Main";
import SingleTodo from "../Components/Todos/SingleTodo/SingleTodo";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <CreateTodos />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-todos",
        element: (
          <PrivateRoute>
            <DisplayTodos />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-todos/details/:id",

        loader: ({ params }) =>
          fetch(
            `https://mern-todo-app-server-red.vercel.app/signle-todo/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <SingleTodo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

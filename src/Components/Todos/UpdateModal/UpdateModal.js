import React, { useState } from "react";
import Loader from "../../Loader/Loader";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
const UpdateModal = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date(todo.date));
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTodo = {
      creatorEmail: e.target.userEmail.value,
      date: startDate,
      todoDesc: e.target.desc.value,
      todoName: e.target.todoName.value,
      _id: todo._id,
    };
    console.log(updatedTodo);
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="todo-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-primary relative">
          <label
            htmlFor="todo-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Updating Todo</h3>
          <div className="px-4 lg:px-0">
            <section className="max-w-4xl  p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 lg:mt-10 mt-5">
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-6 mt-4 ">
                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="username"
                    >
                      Todo Name
                    </label>
                    <input
                      defaultValue={todo.todoName}
                      required
                      id="todoName"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="productPrice"
                    >
                      Email
                    </label>
                    <input
                      name="userEmail"
                      id="userEmail"
                      type="email"
                      defaultValue={todo.creatorEmail}
                      disabled
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <div className="relative">
                      <DatePicker
                        required
                        className="py-2 border rounded-md w-full px-4"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="desc"
                    >
                      Todo Description
                    </label>
                    <textarea
                      defaultValue={todo.todoDesc}
                      required
                      name="desc"
                      id="desc"
                      type="textarea"
                      className="block h-36 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    ></textarea>
                  </div>
                </div>

                <p className="text-center mt-2 text-black font-semibold">
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
                      className="btn  btn-outline text-black"
                    />
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

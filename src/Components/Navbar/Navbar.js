import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-trans.png";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutUser, user } = useContext(AuthContext);
  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        toast.error("Logging Out!!!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const location = useLocation();
  // console.log(location.pathname);
  const menu = (
    <>
      {user?.uid ? (
        <>
          <li>
            <Link
              to="/create-todos"
              className="font-medium tracking-wide text-black hover:text-secondary  transition-colors duration-200 "
            >
              Create Todos
            </Link>
          </li>
          <li>
            <Link
              to="/my-todos"
              className="font-medium tracking-wide text-black hover:text-secondary transition-colors duration-200 "
            >
              My Todos
            </Link>
          </li>
          <li>
            <p className="font-bold text-secondary tracking-wide hover:text-secondary transition-colors duration-200 ">
              Welcome {user?.email}
            </p>
          </li>
          <li>
            <Link
              to="/login"
              onClick={handleLogOut}
              className="font-medium tracking-wide text-black btn btn-sm btn-primary"
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          {location?.pathname === "/login" && (
            <li>
              <Link
                to="/"
                className="font-medium tracking-wide text-black btn btn-sm btn-primary"
              >
                Register
              </Link>
            </li>
          )}
          {location?.pathname === "/" && (
            <li>
              <Link
                to="/login"
                className="font-medium tracking-wide text-black btn btn-sm btn-primary"
              >
                Login
              </Link>
            </li>
          )}
        </>
      )}
    </>
  );
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <p className="inline-flex items-center">
          <img src={logo} alt="" className="max-w-[50%]" />
        </p>
        <ul className="flex items-center hidden space-x-8 lg:flex">{menu}</ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 z-40 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="inline-flex items-center">
                      <img src={logo} alt="" className="max-w-[50%]" />
                    </p>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">{menu}</ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

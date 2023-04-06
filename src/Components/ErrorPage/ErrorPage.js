import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-[100vh] p-16 bg-primary text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-900">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-900">
            But dont worry, you can find plenty of other things on our Login
            Page.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/login"
            className="px-8 py-3 font-semibold rounded bg-secondary text-white"
          >
            Back to Login Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl font-semibold md:text-3xl mt-4 mb-2">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      
      <Link
        to="/"
        className="px-6 py-3 btn btn-primary bg-blue-600 text-white hover:bg-blue-700 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
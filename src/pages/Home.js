import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Investment Marketplace
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Discover, invest, and grow your wealth with top investment
          opportunities.
        </p>
        <div className="mt-6">
          {user ? (
            <h2 className="text-lg font-semibold">
              Hello, {user.name} ({user.role})
            </h2>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Featured Investment Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Investment Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Investment Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Real Estate Project</h3>
            <p className="text-gray-700">
              Invest in premium real estate with high ROI potential.
            </p>
            <Link to="/proposals" className="text-blue-500 mt-4 inline-block">
              Explore More →
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Tech Startup</h3>
            <p className="text-gray-700">
              Fund the next big innovation in the tech world.
            </p>
            <Link to="/proposals" className="text-blue-500 mt-4 inline-block">
              Explore More →
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Renewable Energy</h3>
            <p className="text-gray-700">
              Support sustainable energy projects for a better future.
            </p>
            <Link to="/proposals" className="text-blue-500 mt-4 inline-block">
              Explore More →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>
          © {new Date().getFullYear()} Investment Marketplace. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;


import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuth0 } from "@auth0/auth0-react";

const RootRoute = () => {
  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="font-bold">
            Logout
          </button>
        ) : (
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        )}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootRoute });

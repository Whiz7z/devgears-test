import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser, user$ } from "../../store/store";
import { useObservable } from "../hooks/useObservable";
import Table from "../components/Table";
import { OAuthError } from "@auth0/auth0-react";

function Profile() {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const storedUser = useObservable(user$);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await getAccessTokenSilently();
        } catch (error: unknown) {
          if ((error as OAuthError).error === "login_required") {
            loginWithRedirect();
          }
        }
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");

    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    } else if (isAuthenticated && auth0User) {
      console.log(JSON.stringify(auth0User));
      setUser(auth0User);
    }
  }, [isAuthenticated, auth0User]);

  if (isLoading || !authChecked) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <p className="text-center">You are not logged in</p>
      </>
    );
  }

  return (
    isAuthenticated &&
    storedUser && (
      <div className="grid place-items-center">
        <Table data={[storedUser]} />
      </div>
    )
  );
}

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

export default Profile;

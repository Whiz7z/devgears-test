import { createLazyFileRoute } from "@tanstack/react-router";import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser, user$ } from "../../store/store";
import { useObservable } from "../hooks/useObservable";
import Table from "../components/Table";

function About() {
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
        } catch (error) {
          if (error.error === "login_required") {
            loginWithRedirect();
          }
        }
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  // useEffect(() => {
  //   if (isAuthenticated && auth0User && storedUser !== null) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //   } else {
  //     setUser(auth0User);
  //   }
  // }, [isAuthenticated, auth0User, storedUser]);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");

    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    } else if (isAuthenticated && auth0User) {
      setUser(auth0User);
    }
  }, [isAuthenticated, auth0User]);

  if (isLoading || !authChecked) {
    return <div>Loading ...</div>;
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

export const Route = createLazyFileRoute("/about")({
  component: About,
});

export default About;

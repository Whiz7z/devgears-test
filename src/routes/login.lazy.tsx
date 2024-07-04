import { createLazyFileRoute } from '@tanstack/react-router'
import { useAuth0 } from "@auth0/auth0-react";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login () {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="p-2">
      <h2>Hello from Login!</h2>

      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
}
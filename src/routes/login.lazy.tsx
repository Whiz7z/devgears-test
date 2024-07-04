import { createLazyFileRoute } from '@tanstack/react-router'
import { useAuth0 } from "@auth0/auth0-react";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login () {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="p-2 w-full h-full grid place-content-center">
      
    {/* style the button below */}
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>LOGIN</h1>

      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
}
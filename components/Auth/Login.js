import React, { useState } from "react";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import ButtonLoader from "../Common/ButtonLoader";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState(""); //admin@gmail.com
  const [password, setPassword] = useState(""); //123
  const [loading, setLoading] = useState(false);

  //submit login
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    console.log("login result: ", result);
    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = "/";
    }
  };
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center text-fakebook">
              <Link href="/user/forgot" className="float-right mb-4 text-info">
                Forgot Password?
              </Link>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "LOGIN"}
            </button>
            <div className="text-center text-fakebook mt-5">
              <Link href="/register" className="float-right mt-3 text-info">
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

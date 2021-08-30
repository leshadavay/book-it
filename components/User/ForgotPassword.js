import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, forgotPassword } from "../../redux/actions/userActions";
import ButtonLoader from "../Common/ButtonLoader";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      forgotPassword({
        email,
      })
    );
  };

  return (
    <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form class="shadow-lg" onSubmit={onSubmit}>
          <h1 class="mb-3">Forgot Password</h1>
          <div class="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            class="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { updateUserDetailsAdmin } from "../../redux/actions/userActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../Common/Loader";
import Link from "next/link";
import ButtonLoader from "../Common/ButtonLoader";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";

function UpdateUserpage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const { isUpdated, error } = useSelector((state) => state.user);
  const { user: userDetails, loading } = useSelector(
    (state) => state.userDetails
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetailsAdmin(userDetails._id, user));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (userDetails) {
      setUser({
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User has been updated successfully");
      router.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, userDetails, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mt-2 mb-5">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={user.name}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role</label>

              <select
                id="role_field"
                className="form-control"
                name="role"
                value={user.role}
                onChange={onChangeHandler}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              onClick={submitHandler}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserpage;

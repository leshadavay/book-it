import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  clearErrors,
  deleteUserAdmin,
  getAllUsersAdmin,
} from "../../redux/actions/userActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../Common/Loader";
import Link from "next/link";
import ButtonLoader from "../Common/ButtonLoader";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";

function AllUsersPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [actionLoading, setActionLoading] = useState({});
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const {
    isDeleted,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.user);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "#",
          field: "no",
          sort: "desc",
        },
        {
          label: "User Id",
          field: "id",
          sort: "desc",
        },
        {
          label: "Name",
          field: "name",
          sort: "desc",
        },
        {
          label: "Email",
          field: "email",
          sort: "desc",
        },
        {
          label: "Role",
          field: "role",
          sort: "desc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "desc",
        },
      ],
      rows: [],
    };

    //set data
    users &&
      users.forEach((user, index) => {
        data.rows.push({
          no: index + 1,
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <div className="d-flex">
              <Link href={`/admin/users/${user._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i className="fa fa-pencil" />
                </a>
              </Link>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={(e) => deleteUserHandler(user._id)}
                disabled={deleteLoading ? true : false}
              >
                {actionLoading[user._id] === true ? (
                  <ButtonLoader />
                ) : (
                  <i className="fa fa-trash" />
                )}
              </button>
            </div>
          ),
        });
      });

    return data;
  };

  const deleteUserHandler = (userId) => {
    if (confirm("Are you sure?")) {
      setActionLoading({ [userId]: true });
      dispatch(deleteUserAdmin(userId));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAdmin());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("User has been removed successfully");
      dispatch({ type: DELETE_USER_RESET });
    }
    setActionLoading({});
  }, [dispatch, error, deleteError, isDeleted]);

  return loading ? (
    <Loader />
  ) : (
    <div className="container container-fluid">
      <h1 className="my-5 text-center">{`${users && users.length} Users`}</h1>

      <MDBDataTable data={setUsers()} className="px-3" bordered striped hover />
    </div>
  );
}

export default AllUsersPage;

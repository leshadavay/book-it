import { signOut } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
import classnames from "classnames";
import Loader from "../Common/Loader";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, router.query]);

  const logoutHandler = () => {
    signOut();
  };

  let adminBgStyle = user && user.role === "admin" ? "bg-black" : "bg-black";
  let adminTextStyle = user && user.role === "admin" ? "text-light" : "";
  return (
    <nav
      className={classnames(
        "navbar row justify-content-center sticky-top",
        adminBgStyle
      )}
    >
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <img
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  width: "150px",
                  top: "-20px",
                }}
                src="/images/fakebook.png"
                alt="BookIT"
              />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdow d-line">
              <a
                className={classnames(
                  "btn dropdown-toggle mr-4",
                  adminTextStyle
                )}
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  ></img>
                </figure>
                <span>{user && user.name}</span>
              </a>
              <div
                className={classnames("dropdown-menu", adminBgStyle)}
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <>
                    <Link href="/admin/rooms">
                      <a
                        className={classnames("dropdown-item", adminTextStyle)}
                      >
                        All Rooms
                      </a>
                    </Link>
                    <Link href="/admin/bookings">
                      <a
                        className={classnames("dropdown-item", adminTextStyle)}
                      >
                        All Bookings
                      </a>
                    </Link>
                    <Link href="/admin/users">
                      <a
                        className={classnames("dropdown-item", adminTextStyle)}
                      >
                        All Users
                      </a>
                    </Link>
                    <Link href="/admin/reviews">
                      <a
                        className={classnames("dropdown-item", adminTextStyle)}
                      >
                        All Reviews
                      </a>
                    </Link>
                    <hr />
                  </>
                )}
                <Link href="/user/me">
                  <a className={classnames("dropdown-item", adminTextStyle)}>
                    My Profile
                  </a>
                </Link>
                <Link href="/booking/list">
                  <a className={classnames("dropdown-item", adminTextStyle)}>
                    My Bookings
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <a className="btn btn-info px-4 text-white  float-right">
                  Login
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

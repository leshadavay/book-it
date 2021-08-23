import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/roomActions";

import RoomItem from "./Room/RoomItem";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { rooms, error, perPage, totalCount, totalCountFiltered } = useSelector(
    (state) => state.allRooms
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);

  const { page = 1, location } = router.query;
  const setCurrentPage = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : `All Rooms`}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length ? (
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          ) : (
            <div className="alert alert-danger mt-5 text center w-100">
              <b>No Rooms</b>
            </div>
          )}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={Number(page)}
          itemsCountPerPage={perPage}
          totalItemsCount={location ? totalCountFiltered : totalCount}
          onChange={setCurrentPage}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          itemClass={"page-item"}
          linkClass={"page-link"}
        />
      </div>
    </>
  );
}

export default Home;

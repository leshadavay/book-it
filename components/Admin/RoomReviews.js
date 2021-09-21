import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  clearErrors,
  deleteReviewAdmin,
  getRoomReviewsAdmin,
} from "../../redux/actions/roomActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../Common/Loader";
import ButtonLoader from "../Common/ButtonLoader";
import { DELETE_REVIEW_RESET } from "../../redux/constants/roomConstants";

function RoomReviewsPage() {
  console.log("RoomReviewsPage");
  const router = useRouter();
  const dispatch = useDispatch();
  const [actionLoading, setActionLoading] = useState({});
  const [roomId, setRoomId] = useState("");
  const { loading, error, reviews } = useSelector((state) => state.roomReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "#",
          field: "no",
          sort: "desc",
        },
        {
          label: "Id",
          field: "id",
          sort: "desc",
        },
        {
          label: "User",
          field: "user",
          sort: "desc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "desc",
        },
        {
          label: "Comment",
          field: "comment",
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
    reviews &&
      reviews.forEach((review, index) => {
        data.rows.push({
          no: index + 1,
          id: review._id,
          user: review.name,
          rating: review.rating,
          comment: review.comment,
          actions: (
            <div className="d-flex">
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={(e) => deleteReviewHandler(review._id)}
                disabled={actionLoading[review._id] ? true : false}
              >
                {actionLoading[review._id] === true ? (
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

  const deleteReviewHandler = (reviewId) => {
    if (confirm("Are you sure?")) {
      setActionLoading({ [reviewId]: true });
      dispatch(deleteReviewAdmin(reviewId, roomId));
    }
  };

  const onClickGetReview = (e) => {
    e.preventDefault();
    if (!roomId) {
      toast.error("Please enter the room ID");
    } else {
      dispatch(getRoomReviewsAdmin(roomId));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review has been successfully removed");
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getRoomReviewsAdmin(roomId));
    }
    setActionLoading({});
  }, [dispatch, error, deleteError, isDeleted]);

  return loading ? (
    <Loader />
  ) : (
    <div className="container container-fluid">
      <div className="row justify-content-center mt-5">
        <form>
          <div className="form-group text-center">
            <div className="row">
              <div className="col-10">
                <input
                  type="text"
                  id="room_id"
                  className="form-control"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                ></input>
              </div>
              <div className="col-2">
                <button className="btn btn-info" onClick={onClickGetReview}>
                  GET
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {reviews && reviews.length ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <div className="alert alert-info mt-5 text-center">No Reviews</div>
      )}
    </div>
  );
}

export default RoomReviewsPage;

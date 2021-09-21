import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  clearErrors,
  deleteRoomAdmin,
  getAdminRooms,
} from "../../redux/actions/roomActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../Common/Loader";
import Link from "next/link";
import ButtonLoader from "../Common/ButtonLoader";
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants";

function AllRoomsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [actionLoading, setActionLoading] = useState({});
  const { loading, rooms, error } = useSelector((state) => state.allRooms);
  const {
    loading: deleteLoading,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.room);

  const removeRoom = (roomId) => {
    if (confirm("Are you sure?")) {
      setActionLoading({ [roomId]: true });
      dispatch(deleteRoomAdmin(roomId));
    }
  };

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: "#",
          field: "no",
          sort: "desc",
        },
        {
          label: "Room Id",
          field: "id",
          sort: "desc",
        },
        {
          label: "Name",
          field: "name",
          sort: "desc",
        },
        {
          label: "Price/Night",
          field: "price",
          sort: "desc",
        },
        {
          label: "Category",
          field: "category",
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
    rooms &&
      rooms.forEach((room, index) => {
        data.rows.push({
          no: index + 1,
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <div className="d-flex">
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i className="fa fa-pencil" />
                </a>
              </Link>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={(e) => removeRoom(room._id)}
                disabled={deleteLoading ? true : false}
              >
                {actionLoading[room._id] === true ? (
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

  useEffect(() => {
    dispatch(getAdminRooms());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Room has been removed successfully");
      dispatch({ type: DELETE_ROOM_RESET });
    }
    setActionLoading({});
  }, [dispatch, isDeleted, error, deleteError]);

  return loading ? (
    <Loader />
  ) : (
    <div className="container container-fluid">
      <h1 className="my-5 text-center">{`${rooms && rooms.length} Rooms`}</h1>
      <Link href="/admin/rooms/create">
        <a className="mt-0 btn text-white float-right new-room-btn">
          Create Room
        </a>
      </Link>
      <MDBDataTable data={setRooms()} className="px-3" bordered striped hover />
    </div>
  );
}

export default AllRoomsPage;

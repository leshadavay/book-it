import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { clearErrors, getAdminRooms } from "../../redux/actions/roomActions";
import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";
import Loader from "../Common/Loader";
import Link from "next/link";

function AllRoomsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, rooms, error } = useSelector((state) => state.allRooms);

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
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil" />
                </a>
              </Link>
              <button className="btn btn-danger mx-2">
                <i className="fa fa-trash" />
              </button>
            </>
          ),
        });
      });

    return data;
  };

  useEffect(() => {
    dispatch(getAdminRooms());
    if (error) {
      console.log("error: ", error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="container container-fluid">
      <h1 className="my-5">{`${rooms && rooms.length} Rooms`}</h1>
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

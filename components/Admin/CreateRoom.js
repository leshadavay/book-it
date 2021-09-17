import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  clearErrors,
  createRoomAdmin,
  getAdminRooms,
} from "../../redux/actions/roomActions";
import { MDBDataTable } from "mdbreact";

import Loader from "../Common/Loader";
import Link from "next/link";
import { useImmer } from "use-immer";
import { NEW_ROOM_RESET } from "../../redux/constants/roomConstants";
import { Form } from "react-bootstrap";
import ButtonLoader from "../Common/ButtonLoader";

function CreateRoom() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, success, error } = useSelector((state) => state.newRoom);

  const [form, setForm] = useImmer({
    category: "King",
    guestCapacity: 1,
    numOfBeds: 1,
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  console.log("forM: ", form);

  const onChangeInputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setForm((draft) => {
      draft[name] = value && isFinite(value) ? parseInt(value) : value;
    });
  };

  const onChangeCheckboxHandler = (e) => {
    e.preventDefault();
    const { checked, name } = e.target;
    setForm((draft) => {
      draft[name] = checked;
    });
  };

  const onChangeImages = (e) => {
    console.log("files before: ", e.target.files);
    const files = Array.from(e.target.files);

    console.log("files after: ", files);

    //first erase previous images
    setImages([]);
    setImagesPreview([]);

    //second, store all images selected by user

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevState) => [...prevState, reader.result]);
          setImagesPreview((prevState) => [...prevState, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRoomAdmin({
        ...form,
        images,
      })
    );
  };

  useEffect(() => {
    dispatch(getAdminRooms());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("New room has been created");
      router.push("/admin/rooms");
      dispatch({ type: NEW_ROOM_RESET });
    }
  }, [dispatch, success, error]);

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow-lg"
            enctype="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <h1 className="mb-4">New Room</h1>
            <div className="form-group">
              <label htmlhtmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={form.name}
                name="name"
                onChange={onChangeInputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price_field">Price</label>
              <input
                type="text"
                id="price_field"
                className="form-control"
                value={form.price}
                name="pricePerNight"
                onChange={onChangeInputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_field">Description</label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                onChange={onChangeInputHandler}
                name="description"
                value={form.description}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={form.address}
                name="address"
                onChange={onChangeInputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Category</label>
              <select
                className="form-control"
                id="category_field"
                value={form.category}
                name="category"
                onChange={onChangeInputHandler}
              >
                {["King", "Single", "Twins"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Guest Capacity</label>
              <select
                className="form-control"
                id="guestCapacity_field"
                name="guestCapacity"
                onChange={onChangeInputHandler}
                value={form.guestCapacity}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category_field">Number of Beds</label>
              <select
                className="form-control"
                id="numOfBeds_field"
                value={form.numOfBeds}
                name="numOfBeds"
                onChange={onChangeInputHandler}
              >
                {[1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <label className="mb-3">Room Features</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="internet_checkbox"
                name="internet"
                checked={form.internet}
                onChange={onChangeCheckboxHandler}
              />
              <label className="form-check-label" htmlFor="internet_checkbox">
                Internet
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="breakfast_checkbox"
                checked={form.breakfast}
                name="breakfast"
                onChange={onChangeCheckboxHandler}
              />
              <label className="form-check-label" htmlFor="breakfast_checkbox">
                Breakfast
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="airConditioned_checkbox"
                checked={form.airConditioned}
                name="airConditioned"
                onChange={onChangeCheckboxHandler}
              />
              <label
                className="form-check-label"
                htmlFor="airConditioned_checkbox"
              >
                Air Conditioned
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="petsAllowed_checkbox"
                name="petsAllowed"
                checked={form.petsAllowed}
                onChange={onChangeCheckboxHandler}
              />
              <label
                className="form-check-label"
                htmlFor="petsAllowed_checkbox"
              >
                Pets Allowed
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roomCleaning_checkbox"
                name="roomCleaning"
                checked={form.roomCleaning}
                onChange={onChangeCheckboxHandler}
              />
              <label
                className="form-check-label"
                htmlFor="roomCleaning_checkbox"
              >
                Room Cleaning
              </label>
            </div>
            <div className="form-group mt-4">
              <label>Images</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="room_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeImages}
                  multiple
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>
              {imagesPreview.map((image, key) => (
                <img
                  src={image}
                  key={key}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>
            <button
              type="submit"
              className="btn btn-block new-room-btn py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;

import React from "react";
import Image from "next/image";
import Link from "next/link";
function RoomItem({ room }) {
  return (
    <div className="col-sm-12 col-md-6  col-lg-4 my-3">
      <div className="col">
        <div className=" p-2 card-container">
          <div className="card">
            <Image
              className="card-img-top mx-auto"
              src={room.images[0].url}
              height="100%"
              width="100"
              placeholder={"blur"}
              blurDataURL={
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="></img>
              }
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link href={`/room/${room._id}`}>
                  <a>{room.name}</a>
                </Link>
              </h5>

              <div className="ratings mt-auto mb-3">
                <p className="card-text">
                  <b>${room.pricePerNight}</b> / night
                </p>
                <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                <div className="rating-outer d-flex justify-content-center">
                  <div
                    className="rating-inner"
                    style={{
                      left: "auto",
                      width: 0,
                      /* width: `${(room.rating / 5) * 100}%`, */
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <span className="chev mt-4">
              <button className="btn btn-block view-btn">
                <Link href={`/room/${room._id}`}>View Details</Link>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;

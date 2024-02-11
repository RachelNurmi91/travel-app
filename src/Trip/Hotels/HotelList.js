import { useState, useEffect } from "react";
import { connect } from "react-redux";

function HotelList({ ...props }) {
  const [hotelList, setHotelList] = useState(null);

  useEffect(() => {
    sortByDate();
  }, []);

  const sortByDate = () => {
    let sortedHotels;

    let hotels = props.hotelListData?.[0].hotels;

    if (hotels > 1) {
      sortedHotels = hotels.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedHotels = hotels;
    }

    setHotelList(sortedHotels);
  };

  const displayHotels = () => {
    return hotelList?.map((hotel) => {
      return (
        <div className="listItem">
          <div className="container">
            <div className="row align-items-end">
              <div className="col">
                <span className="listItemMajor">{hotel.hotelName}</span>
                <br />
                {hotel.hotelConfirmation}
              </div>
              <div className="col text-center">
                {hotel.city}, {hotel.country} <br />
                {hotel.arrivalDate} - {hotel.departureDate}
              </div>
              <div className="col listItemMinor ">
                <br />
                *Booked by {hotel.nameOnReservation}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="constraint">
      <h1>Hello</h1>
      {console.log("TEST")}
      {displayHotels()}

      <button className="btn-save mt-3" type="submit">
        Add New
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    hotelListData: state.account?.userAccount?.trips,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);

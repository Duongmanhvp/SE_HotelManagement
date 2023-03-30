import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlace } from "../../api/index.jsx";
import PlaceCard from "../../components/customer/PlaceCard.jsx";
import { _places } from "../../data/sampleData";
import SearchBar from "../../components/customer/SearchBar.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlace()
      .then((res) => setPlaces(res.data))
      .catch((err) => setPlaces(_places));
  }, []);

  return (
    <div className="mt-8 ml-[352px]">
      <SearchBar></SearchBar>
      <div className="grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <PlaceCard place={place}></PlaceCard>
            </Link>
          ))}
      </div>
    </div>
  );
}

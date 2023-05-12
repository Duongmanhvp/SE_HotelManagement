import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import { getPlacesByQuery } from "../../api/index.js";
import PlaceCard from "../../components/customer/PlaceCard.jsx";
import SearchBar from "../../components/customer/SearchBar.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [query] = useSearchParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getPlacesByQuery(Object.fromEntries([...query]))
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div className="mt-8 ml-[352px] py-4 px-8 ">
      <SearchBar setPlaces={setPlaces}></SearchBar>
      <div>
        {query.entries.length > 0 && <h1>Founded {places.length} rooms!</h1>}
        <PaginatedItems itemsPerPage={16} items={places}></PaginatedItems>
      </div>
    </div>
  );
}

function Items({ places }) {
  return (
    <>
      <div className="grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <PlaceCard place={place}></PlaceCard>
            </Link>
          ))}
      </div>
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items places={currentItems} />
      <ReactPaginate
        className="paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

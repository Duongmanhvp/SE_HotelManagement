import Image from "./Image.jsx";

export default function PlaceImg({ place }) {
  if (!place.thumbnail) {
    return "";
  }

  return <Image className="object-cover" src={place.thumbnail} alt="" />;
}

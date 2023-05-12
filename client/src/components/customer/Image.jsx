export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:8080/uploads/" + src;
  return (
    <img
      {...rest}
      src={src}
      alt={""}
      className="w-full object-cover max-w-88 rounded-2xl aspect-square"
    />
  );
}

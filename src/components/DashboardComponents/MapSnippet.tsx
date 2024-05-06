interface Props {
  latitude: string;
  longitude: string;
}

export default function MapSnippet({ latitude, longitude }: Props) {
  console.log(latitude);
  const src =
    "http://www.openstreetmap.org/export/embed.html?bbox=-90.20224,30.48102,-90.18775,30.49097&amp;marker=" +
    latitude +
    "%2C" +
    longitude;
  return (
    <div>
      <iframe
        width="50%"
        height="75%"
        src={src}
        style={{ border: "1px solid black" }}
      ></iframe>
    </div>
  );
}

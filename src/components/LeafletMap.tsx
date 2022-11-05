import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ComponentProps } from "react";

export const LeafletMap = ({ data }: { data: any }) => {
  const geo = [data.latitude, data.longitude] as [number, number];
  return (
    <MapContainer
      style={{ width: "100%", height: "200px", position: "relative" }}
      center={geo}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={geo}>
        <Popup>{data.displayName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;


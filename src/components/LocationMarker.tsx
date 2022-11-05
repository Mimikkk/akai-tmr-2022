import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { circle as Lcircle, LatLngExpression } from "leaflet";

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [bbox, setBbox] = useState<string[]>([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = Lcircle(e.latlng, radius, {
        color: "#ffffff00",
        fillColor: "#ffffff00",
        weight: -6,
        stroke: false,
      });
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
};

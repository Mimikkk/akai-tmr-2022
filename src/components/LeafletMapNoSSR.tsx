import dynamic from "next/dynamic";

export const LeafletMapNoSSR = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

import React from "react";
// @ts-ignore
import HPlatform, { HMap, HMapMarker } from "react-here-map";

export const LibraryMap = () => {
  const coords = { lat: 19.42847, lng: -99.12766 };
  const icon =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';
  return (
    <HPlatform
      apikey={process.env.REACT_APP_HERE_API_KEY}
      useCIT
      useHTTPS
      includeUI
      includePlaces
    >
      <HMap
        style={{
          height: "400px",
          width: "800px",
        }}
        mapOptions={{ center: { lat: 19.42847, lng: -99.12766 } }}
      >
        <HMapMarker
          draggable
          onDragEnd={(e: any) => console.log("test", e)}
          coords={coords}
          icon={icon}
        />
      </HMap>
    </HPlatform>
  );
};

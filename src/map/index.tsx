import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import * as React from "react";

export const MapHere = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  function addDraggableMarker(map: any, behavior: any, H: any) {
    
    
    var marker = new H.map.Marker(
      { lat: 19.42847, lng: -99.12766 },
      {
        // mark the object as volatile for the smooth dragging
        volatility: true,
      }
    );
    // Ensure that the marker can receive drag events
    marker.draggable = true;
    map.addObject(marker);

    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener(
      "dragstart",
      function (ev: any) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          var targetPosition = map.geoToScreen(target.getGeometry());
          target["offset"] = new H.math.Point(
            pointer.viewportX - targetPosition.x,
            pointer.viewportY - targetPosition.y
          );
          behavior.disable();
        }
      },
      false
    );

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener(
      "dragend",
      function (ev: any) {
        var target = ev.target;
        if (target && target.getGeometry) {
          console.log(
            "addDraggableMarker -> targetPosition",
            target.getGeometry().lat,
            target.getGeometry().lng
          );
        }
        if (target instanceof H.map.Marker) {
          behavior.enable();
        }
      },
      false
    );

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener(
      "drag",
      function (ev: any) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          target.setGeometry(
            map.screenToGeo(
              pointer.viewportX - target["offset"].x,
              pointer.viewportY - target["offset"].y
            )
          );
        }
      },
      false
    );
  }
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    // @ts-ignore
    if (!window && !window.H) return;

    // @ts-ignore
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 19.42847, lng: -99.12766 },
      zoom: 8,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // Marker code goes here

    const LocationOfMarker = { lat: 19.42847, lng: -99.12766 };

    // Create a marker icon from an image URL:
    const pngIcon = new H.map.Icon(
      "https://cdn3.iconfinder.com/data/icons/tourism/eiffel200.png",
      { size: { w: 56, h: 56 } }
    );

    // Create a marker using the previously instantiated icon:
    const marker = new H.map.Marker(LocationOfMarker, {
      icon: pngIcon
    });
    // Add the marker to the map:
    hMap.addObject(marker);
    hMap.setCenter(LocationOfMarker);

    //Zooming so that the marker can be clearly visible
    hMap.setZoom(8);

    addDraggableMarker(hMap, behavior, H);
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <div className="map" ref={mapRef} style={{ height: "400px" }} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

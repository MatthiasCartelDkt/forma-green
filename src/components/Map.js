import React from "react";
import { getGreenAreas } from "../_functions/green_areas/index";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import _ from "lodash";
import tree from "../assets/icons/tree.svg";
import AddGreenArea from "./AddGreanArea";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenAreas: {},
      initialPosition: [51.505, -0.09],
      addActive: this.props.areaAddActive,
      error: ""
    };
  }

  async componentDidMount() {
    const _greenAreas = await getGreenAreas();
    this.setState({ greenAreas: _greenAreas });
  }  

  render() {
    const { greenAreas, initialPosition } = this.state;
    const { areaAddActive } = this.props;
    const iconTree = new L.Icon({
      iconUrl: tree,
      iconRetinaUrl: tree,
      iconSize: [60, 55],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    });
    const markers =
      !_.isEmpty(greenAreas) &&
      greenAreas.map((area) => {
        return (
          <Marker
            key={area.id}
            position={Object.values(area.position)}
            icon={iconTree}
          >
            <Popup>
              {area.site_name} : {area.address}
            </Popup>
          </Marker>
        );
      });
    if (areaAddActive) {
      return (
      <AddGreenArea />
      );
    }
    return (
      !_.isEmpty(greenAreas) && (
        <MapContainer
          style={{ height: "100vh", width: "83vw" }}
          center={initialPosition}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      )
    );
  }
}

import React from "react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaRegSun,
  FaPagelines,
  FaUserAstronaut,
  FaMapMarker,
} from "react-icons/fa";
import sidebarBg from "../assets/bg1.jpg";

import GetVolunteers from "./GetVolunteers";
import AddVolunteers from "./AddVolunteers";
import GetPartnerships from "./GetPartnerships";
import Logout from "./Logout"

import Map from "./Map";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      treesAreasScreenActive: false,
      volunteersScreenActive: false,
      volunteersAddScreenActive: false,
      partnershipsScreenActive: false,
      areaAddActive: false,
      partnershipAddScreen: false,
      error: "",
      currentUserState: "",
    };
  }
  handleScreenVolunteers = () => {
    this.setState({ volunteersScreenActive: true });
    this.setState({ volunteersAddScreenActive: false });
    this.setState({ treesAreasScreenActive: false });
    this.setState({ partnershipsScreenActive: false });
    this.setState({ areaAddActive: false });
    this.setState({ partnershipAddScreen: false });
  };

  handleScreenPartnerships = () => {
    this.setState({ volunteersScreenActive: false });
    this.setState({ volunteersAddScreenActive: false });
    this.setState({ treesAreasScreenActive: false });
    this.setState({ partnershipsScreenActive: true });
    this.setState({ areaAddActive: false });
    this.setState({ partnershipAddScreen: false });
  };

  handleScreenGreenAreas = () => {
    this.setState({ volunteersScreenActive: false });
    this.setState({ volunteersAddScreenActive: false });
    this.setState({ treesAreasScreenActive: true });
    this.setState({ partnershipsScreenActive: false });
    this.setState({ areaAddActive: false });
    this.setState({ partnershipAddScreen: false });
  };

  handleVolunteersAdd = () => {
    this.setState({ volunteersScreenActive: false });
    this.setState({ volunteersAddScreenActive: true });
    this.setState({ treesAreasScreenActive: false });
    this.setState({ partnershipsScreenActive: false });
    this.setState({ areaAddActive: false });
    this.setState({ partnershipAddScreen: false });
  };

  handleAreaAdd = () => {
    this.setState({ volunteersScreenActive: false });
    this.setState({ volunteersAddScreenActive: false });
    this.setState({ treesAreasScreenActive: true });
    this.setState({ partnershipsScreenActive: false });
    this.setState({ areaAddActive: true });
    this.setState({ partnershipAddScreen: false });
  }

  handlPartnershipAdd = () => {
    this.setState({ volunteersScreenActive: false });
    this.setState({ volunteersAddScreenActive: false });
    this.setState({ treesAreasScreenActive: false });
    this.setState({ partnershipsScreenActive: true });
    this.setState({ areaAddActive: false });
    this.setState({ partnershipAddScreen: true });
  }

  render() {
    const {
      volunteersScreenActive,
      treesAreasScreenActive,
      volunteersAddScreenActive,
      partnershipsScreenActive,
      areaAddActive,
      partnershipAddScreen
    } = this.state;
    return (
      <>
        <div
          style={{ height: "100%", position: "absolute", overflow: "hidden" }}
        >
          <ProSidebar image={sidebarBg}>
            <SidebarHeader>
              <div
                style={{
                  padding: "24px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span>
                  <FaPagelines /> FormaGreen
                </span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem
                  icon={<FaUserAstronaut />}
                  onClick={this.handleScreenVolunteers}
                >
                  Volunteers
                </MenuItem>
              </Menu>
              <Menu iconShape="square">
                <MenuItem
                  icon={<FaUserAstronaut />}
                  onClick={this.handleScreenPartnerships}
                >
                  Partnerships
                </MenuItem>
              </Menu>
              <Menu iconShape="square">
                <MenuItem
                  icon={<FaMapMarker />}
                  onClick={this.handleScreenGreenAreas}
                >
                  Green Areas
                </MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              {volunteersScreenActive && (
                <Menu iconShape="square">
                  <MenuItem
                    icon={<FaRegSun />}
                    onClick={this.handleVolunteersAdd}
                  >
                    Add a new volunteers
                  </MenuItem>
                </Menu>
              )}
              {treesAreasScreenActive && (
                <Menu iconShape="square">
                  <MenuItem
                    icon={<FaRegSun />}
                    onClick={this.handleAreaAdd}
                  >
                    Add a new area
                  </MenuItem>
                </Menu>
              )}
              {partnershipsScreenActive && (
                <Menu iconShape="square">
                <MenuItem
                  icon={<FaRegSun />}
                  onClick={this.handlPartnershipAdd}
                >
                  Add a new partnership
                </MenuItem>
              </Menu>
              )}
              <Logout />
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div
          style={{
            height: "100%",
            width: "83vw",
            display: "flex",
            position: "absolute",
            right: "0vw",
            justifyContent: "center",
          }}
        >
          {volunteersScreenActive && (
            <div
              style={{
                paddingTop: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <GetVolunteers volunteersScreenActive={volunteersScreenActive} />
            </div>
          )}
          {volunteersAddScreenActive && (
            <div
              style={{
                paddingTop: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "5vh",
              }}
            >
              <AddVolunteers
                handleScreenVolunteers={this.handleScreenVolunteers}
                volunteersScreenActive={volunteersScreenActive}
              />
            </div>
          )}
          {partnershipsScreenActive && (
            <div
              style={{
                width: "100%",
                paddingTop: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "5vh",
              }}
            >
              <GetPartnerships
                partnershipsScreenActive={partnershipsScreenActive} partnershipAddScreen={partnershipAddScreen}
              />
            </div>
          )}
          {treesAreasScreenActive && (
            <div style={{ display: "contents" }}>
              <Map treesAreasScreenActive={treesAreasScreenActive} areaAddActive={areaAddActive} />
            </div>
          )}
          {!volunteersScreenActive &&
            !volunteersAddScreenActive &&
            !partnershipsScreenActive &&
            !treesAreasScreenActive && (
              <div style={{ width: '100%', height: '100%', fontFamily: 'Roboto', backgroundImage: 'url(https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBtaW5pbWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80)', backgroundSize: 'cover'}}>
                <img style={{width: '25em', height: '20em', position: 'absolute', right: '3vw', bottom: '30vh'}} src={"https://www.pngall.com/wp-content/uploads/8/Job-Work-PNG-File.png"} alt={""}/>
                <img style={{width: '5em', height: '5em', position: 'absolute', left: '1vw', top: '1vh'}} src={"https://cdn.blueberriesconsulting.com/2019/01/leaf-logo.png"} alt={""}/>
                <h1 style={{ fontFamily: 'Roboto', position: 'absolute', left: '6vw', top: '3vh', color: "#283341"}}>Forma green</h1>
                <p style={{width: '30%', position: 'absolute', top: '40vh', left: '10vw', backgroundColor: '#283341', padding: '2em', borderRadius: '20px', color: 'white'}}>Welcome on the forma green management dashboard, throught this application you can manage your volunteers, your green areas and your partnerships. Take a look on the left side drawer.</p>
              </div>
            )}
        </div>
      </>
    );
  }
}

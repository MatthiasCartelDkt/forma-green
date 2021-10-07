import React from "react";
import QRCode from "react-qr-code";
import { getAllVolunteers, removeVolunteer } from "../_functions/users/index";
import Table from "rc-table";
import {FaTrashAlt} from "react-icons/fa"
import _ from "lodash";
import "../style/style.css";

export default class Volunteers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      newUser: {},
      isCreateMemberFormOpen: false,
      isLoading: false,
    };
  }

  handleQrCodeHtml = (subscriptionData, newUser) => {
    return `
          Name : ${newUser.name}
          Address : ${newUser.address}
          Country : ${newUser.country}
          Type : ${subscriptionData.type}
          Subscription date : ${Date(subscriptionData.subscription_date)}
          Subscription active : ${subscriptionData.subscription_active}
          Subscription duration : ${
            subscriptionData.subscription_duration
          } years
    `;
  };

  async componentDidMount() {
    const volunteers = await getAllVolunteers();
    this.setState({ users: volunteers });
  }
  async removeVolunteer(id) {
    await removeVolunteer(id)
  }

  render() {
    const { users } = this.state;
    const columns = [
      {
        title: "Firstname",
        dataIndex: "firstname",
        key: "firstname",
        width: 200,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 200,
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: 100,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200,
      },
      {
        title: "Subcription Date",
        dataIndex: "subscription_date",
        key: "subscription_date",
        width: 200,
      },
      {
        title: "Subcription Duration",
        dataIndex: "subscription_duration",
        key: "subscription_duration",
        width: 200,
      },
      {
        title: "Subcription Activate",
        dataIndex: "subscription_active",
        key: "subscription_active",
        width: 200,
      },
      {
        title: "QR code volunteer",
        dataIndex: "qr_code",
        key: "qr_code",
        width: 200,
        render: (qrcode) =>
          qrcode && (
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <QRCode value={qrcode} size={128} />
            </div>
          ),
      },
      {
        title: "Remove Volunteer",
        dataIndex: "id",
        key: `id_${Math.random()}`,
        width: 50,
        render: (id) =>
         (
              <FaTrashAlt  style={{cursor: "pointer"}} onClick={() => { this.removeVolunteer(id)}}/>
          ),
      },
    ];

    const data = !_.isEmpty(users) && users;
    const { volunteersScreenActive } = this.props;
    return (
      <div style={{width: 'content'}}>
        {volunteersScreenActive && (
          <div style={{ overflow: 'scroll', height: '100vh', width: '79vw'}}>
            <Table columns={columns} data={data} />
          </div>
        )}
      </div>
    );
  }
}

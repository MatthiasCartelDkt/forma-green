import React from "react";
import QRCode from "react-qr-code";
import { getAllMembers, createMember } from "../_functions/users/index";
import Table from "rc-table";
import _ from "lodash";
import "../style/style.css"

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      newUser: {},
      isCreateMemberFormOpen: false,
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
          Subscription duration : ${subscriptionData.subscription_duration} years
    `
  };

  async componentDidMount() {
    const members = await getAllMembers();
    this.setState({ users: members });
  }

  openCreateMemberForm = () => {
    this.setState({ isCreateMemberFormOpen: true });
  };

  closeCreateMemberForm = () => {
    this.setState({ isCreateMemberFormOpen: false });
  };

  handleSubmit = () => {
    const { newUser } = this.state;
    const subscriptionData = {
      subscription_date: Date.now(),
      subscription_duration: 2,
      subscription_active: "true",
      type: "members",
    };
    const userData = {
      ...subscriptionData,
      qr_code: this.handleQrCodeHtml(subscriptionData, newUser),
    };
    createMember(_.merge(newUser, userData));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value,
      },
    });
  };

  render() {
    const { users, isCreateMemberFormOpen } = this.state;

    const columns = [
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
        render: (qrcode) => qrcode && <QRCode value={qrcode} size={128}/>,
      },
    ];

    const data = !_.isEmpty(users) && users;

    return !isCreateMemberFormOpen ? (
      <div>
        <Table columns={columns} data={data} />
        <button onClick={this.openCreateMemberForm}>Create a member</button>
      </div>
    ) : (
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" onChange={this.handleChange} />
          </label>
          <label>
            Country:
            <input type="text" name="country" onChange={this.handleChange} />
          </label>
          <input type="button" value="Create" onClick={this.handleSubmit} />
        </form>
        <button onClick={this.closeCreateMemberForm}>Cancel</button>
      </div>
    );
  }
}

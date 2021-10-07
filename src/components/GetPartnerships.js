import React from "react";
import QRCode from "react-qr-code";
import {getPartnerAll} from "../_functions/partnerships/index";
import Table from "rc-table";
import _ from "lodash";
import "../style/style.css";
import AddPartnership from "./AddPartnership"

export default class GetPartnerships extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerships: {},
      newUser: {},
      isCreateMemberFormOpen: false,
      isLoading: false,
    };
  }


  async componentDidMount() {
    const partnerships = await getPartnerAll();
    this.setState({ partnerships: partnerships });
  }

  render() {
    const { partnerships } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 200,
      },
      {
        title: "Discount",
        dataIndex: "gifts",
        key: "gifts",
        width: 200,
      },
    ];

    const data = !_.isEmpty(partnerships) && partnerships;
    const { partnershipsScreenActive, partnershipAddScreen } = this.props;
    if(partnershipAddScreen){
      return(
        <AddPartnership />
      )
    }
    return (
      <div>
        {partnershipsScreenActive && (
          <div style={{width: '80%'}}>
            <Table style={{width: '80%'}} columns={columns} data={data} />
          </div>
        )}
      </div>
    );
  }
}

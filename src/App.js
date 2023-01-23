import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAbsentees, getAllMembers } from "./redux/actions/App/actions";
import { DatePicker, Table } from "antd";
import Moment from "moment";

const App = () => {
  const [combinedArr, setCombinedArr] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type of absence",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "sickness",
          value: "sickness",
        },
        {
          text: "vacation",
          value: "vacation",
        },
      ],
      onFilter: (value, record) => record.type == value,
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => {
        return Moment(new Date(date)).format("MMM DD YYYY");
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          <DatePicker
            format={"MMM DD"}
            allowClear={true}
            onChange={(e) => {
              setSelectedKeys([e]);
              confirm();
            }}
          />
        </div>
      ),
      onFilter: (value, record) => {
        if (value) {
          return (
            Moment(new Date(record.startDate)).format("MMM DD") ==
            Moment(new Date(value)).format("MMM DD")
          );
        } else {
          return Moment(new Date(record.startDate)).format("MMM DD") !== null;
        }
      },
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => {
        return Moment(new Date(date)).format("MMM DD YYYY");
      },
      // onFilter: (value, record) => <DatePicker />,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          <DatePicker
            format={"MMM DD"}
            allowClear={true}
            onChange={(e) => {
              setSelectedKeys([e]);
              confirm();
            }}
          />
        </div>
      ),
      onFilter: (value, record) => {
        if (value) {
          return (
            Moment(new Date(record.endDate)).format("MMM DD") ==
            Moment(new Date(value)).format("MMM DD")
          );
        } else {
          return Moment(new Date(record.endDate)).format("MMM DD") !== null;
        }
      },
    },
    {
      title: "Member note",
      dataIndex: "memberNote",
      key: "memberNote",
      render: (value) => {
        if (value) {
          return value;
        } else {
          return "Note unavailable";
        }
      },
    },
    {
      title: "Status",
      dataIndex: "type",
      key: "type",
      render: (value, record) => {
        if (record.rejectedAt) {
          return "Rejected";
        } else if (record.confirmedAt) {
          return "Confirmed";
        } else {
          return "Created";
        }
      },
    },
    {
      title: "Admitter note",
      dataIndex: "admitterNote",
      key: "admitterNote",
      render: (value) => {
        if (value) {
          return value;
        } else {
          return "Note unavailable";
        }
      },
    },
  ];

  const dispatch = useDispatch();
  const { members, absentees } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getAllAbsentees());
  }, []);

  useEffect(() => {
    if (members && absentees) {
      let res = [];
      members.payload.map((member) => {
        absentees.payload.map((e) => {
          if (member.userId == e.userId) {
            res.push({ ...member, ...e });
          }
        });
      });
      console.log("res ==>", res);
      setCombinedArr(res);
    }
  }, [members, absentees]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Absence Manager</h1>

      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Total Absentees: {combinedArr ? combinedArr.length : 0}
        </h3>
        <Table dataSource={combinedArr} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAbsentees, getAllMembers } from "./redux/actions/App/actions";
import { DatePicker, Table } from "antd";
import Moment from "moment";

const App = () => {
  // const data = useMemo(
  //   () => [
  //     {
  //       col1: "Hello",
  //       col2: "World",
  //     },
  //     {
  //       col1: "react-table",
  //       col2: "rocks",
  //     },
  //     {
  //       col1: "whatever",
  //       col2: "you want",
  //     },
  //   ],
  //   []
  // );

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Column 1",
  //       accessor: "col1", // accessor is the "key" in the data
  //     },
  //     {
  //       Header: "Column 2",
  //       accessor: "col2",
  //     },
  //   ],
  //   []
  // );

  // const tableInstance = useTable({ columns, data });

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;
  const [combinedArr, setCombinedArr] = useState("");
  const [slicedArr, setSlicedArr] = useState("");
  const [sliceIndex, setSliceIndex] = useState(10);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

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
        console.log("sate", date);
        return Moment(new Date(date)).format("MMM DD");
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
          <p onClick={() => confirm()}>hi</p>
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
        // return (
        //   Moment(new Date(record.endDate)).format("MMM DD") ==
        //   Moment(new Date(value)).format("MMM DD")
        // );
      },
    },
    {
      title: "Member note",
      dataIndex: "memberNote",
      key: "memberNote",
    },
    {
      title: "Status",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Admitter note",
      dataIndex: "admitterNote",
      key: "admitterNote",
    },
  ];

  const dispatch = useDispatch();
  const { members, absentees } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getAllAbsentees());
  }, []);

  // useEffect(() => {
  //   if (members && absentees) {
  //     let res = absentees.payload.map((absentee) => {
  //       return members.payload.filter((e) => e.userId == absentee.userId);
  //     });
  //     console.log("res in useEffect", res);
  //   }
  // }, [members, absentees]);

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

  useEffect(() => {
    if (combinedArr) {
      setSlicedArr(combinedArr.slice(0, sliceIndex));
    }
  }, [combinedArr]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h1>Absentees {combinedArr ? combinedArr.length : 0}</h1>
      <div style={{ width: "90%", display: "flex", justifyContent: "center" }}>
        <table border={1} width={"90%"} style={{ tableLayout: "fixed" }}>
          <tr>
            <th>Name</th>
            <th>Type of absence</th>
            <th>Period</th>
            <th>Member note</th>
            <th>Status</th>
            <th>Admitter note</th>
          </tr>
          {slicedArr &&
            slicedArr?.map((absentMember) => (
              <tr>
                <td style={{ textAlign: "center" }}>{absentMember.name}</td>
                <td style={{ textAlign: "center" }}>{absentMember.type}</td>
                <td style={{ textAlign: "center" }}>{absentMember.type}</td>
                <td style={{ textAlign: "center" }}>
                  {absentMember.memberNote}
                </td>
                <td style={{ textAlign: "center" }}>status</td>
                <td style={{ textAlign: "center" }}>
                  {absentMember.admitterNote}
                </td>
              </tr>
            ))}
          {/*
            <td style={{ textAlign: "center" }}>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
            <td>hi</td>
              */}
        </table>
      </div>

      <div>
        <button
          onClick={() => {
            setSlicedArr(combinedArr.slice(sliceIndex, sliceIndex + 10));
            setSliceIndex(sliceIndex + 10);
          }}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            setSlicedArr(combinedArr.slice(sliceIndex - 10, sliceIndex));
            setSliceIndex(sliceIndex - 10);
          }}
        >
          {">"}
        </button>
        <Table dataSource={combinedArr} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default App;

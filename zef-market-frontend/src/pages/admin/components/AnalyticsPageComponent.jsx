import socketIOClient from "socket.io-client";
import { Col, Form, Row, Tooltip } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersForFirstDate, fetchOrdersForSecondtDate } from "../../../redux/actions/orderAction";
import { serverUrl } from "../../../utils/serverUrl";
const socket = socketIOClient(serverUrl, { transports: ["websocket"] });

const AnalyticsPageComponent = () => {
  const dispatch = useDispatch();

  const {firstDateOrders , secondDateOrders} = useSelector(state => state.orders);
  const [firstDateToCompare, setFirstDateToCompare] = useState(new Date().toISOString().substring(0 , 10));
  var previousaDay = new Date();
  previousaDay.setDate(previousaDay.getDate() - 1 );

  const [secondDateToCompare, setSecondDateToCompare] = useState(new Date(previousaDay).toISOString().substring(0 , 10));

  const firstDateHandler = (e) => {
  setFirstDateToCompare(e.target.value);
  }
  
  const secondDateHandler = (e) => {
  setSecondDateToCompare(e.target.value);
  }

  useEffect(()=>{
    // const socket = socketId;
    // let today = new Date().toDateString();
    // const handler = (newOrder) => {
    //   if (new Date(newOrder?.createdAt).toDateString() === today) {
    //     if (today === new Date(firstDateToCompare).toDateString()) {

    //     } else if (today === new Date(secondDateToCompare).toDateString()) {

    //     }
    //   }
    // }
    socket.on("newOrder" , data => console.log(data));
    // return socket.off("newOrder" , handler);
  },[firstDateToCompare , secondDateToCompare , firstDateOrders , secondDateOrders])

  useEffect(()=>{
    const abcCtrl = new AbortController();
dispatch(fetchOrdersForFirstDate( abcCtrl ,firstDateToCompare  ));
dispatch(fetchOrdersForSecondtDate(abcCtrl ,secondDateToCompare));
  },[firstDateToCompare , secondDateToCompare])

//   const data = [
//     {
//   name: "12:00 AM",
//   "2022 year": 4000,
//   "2021 year": 4100,
// },
// {
//   name: "1:00 AM",
//   "2022 year": 4200,
//   "2021 year": 4300,
// },
// {
//   name: "2:00 AM",
//   "2022 year": 4400,
//   "2021 year": 4500,
// },
// {
//   name: "3:00 AM",
//   "2022 year": 4600,
//   "2021 year": 4600,
// },
// {
//   name: "4:00 AM",
//   "2022 year": 4800,
//   "2021 year": 5000,
// },
// {
//   name: "5:00 AM",
//   "2022 year": 5000,
//   "2021 year": 5200,
// },
// {
//   name: "6:00 AM",
//   "2022 year": 5200,
//   "2021 year": 5400,
// },
// {
//   name: "7:00 AM",
//   "2022 year": 5600,
//   "2021 year": 6000,
// },
// {
//   name: "8:00 AM",
//   "2022 year": 6000,
//   "2021 year": 6300,
// },
// {
//   name: "9:00 AM",
//   "2022 year": 6400,
//   "2021 year": 7000,
// },
// {
//   name: "10:00 AM",
//   "2022 year": 6800,
//   "2021 year": 7200,
// },
// {
//   name: "11:00 AM",
//   "2022 year": 7000,
//   "2021 year": 7800,
// },
// {
//   name: "12:00 PM",
//   "2022 year": 7200,
//   "2021 year": 8200,
// },
// {
//   name: "1:00 PM",
//   "2022 year": 7500,
//   "2021 year": 8400,
// },
// {
//   name: "2:00 PM",
//   "2022 year": 7700,
//   "2021 year": 9000,
// },
// {
//   name: "3:00 PM",
//   "2022 year": 8000,
//   "2021 year": 9500,
// },
// {
//   name: "4:00 PM",
//   "2022 year": 8400,
//   "2021 year": 10000,
// },
// {
//   name: "5:00 PM",
//   "2022 year": 9000,
//   "2021 year": 12000,
// },
// {
//   name: "6:00 PM",
//   "2022 year": 10500,
//   "2021 year": 17000,
// },
// {
//   name: "7:00 PM",
//   "2022 year": 16000,
//   "2021 year": 20000,
// },
// {
//   name: "8:00 PM",
//   "2022 year": 17000,
//   "2021 year": 21000,
// },
// {
//   name: "9:00 PM",
//   "2022 year": 17400,
//   "2021 year": 22000,
// },
// {
//   name: "10:00 PM",
//   "2021 year": 23000,
// },
// {
//   name: "11:00 PM",
//   "2021 year": 23500,
// },
// ];
  
  return (
    <Row className="mt-5 w-100">
    <Col md={2}>
    <AdminLinksComponent/>
    </Col>
    
    <Col md={10} >
    <h1>Black Friday Cumulative Revenue {firstDateToCompare} VS {secondDateToCompare}</h1>
    <Form.Group controlId="firstDateToCompare">
              <Form.Label>Select First Date To Compare</Form.Label>
              <Form.Control
              onChange={firstDateHandler}
                type="date"
                name="firstDateToCompare"
                placeholder="First Date To Compare"
                defaultValue={firstDateToCompare}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="secondDateToCompare">
              <Form.Label>Select Second Date To Compare</Form.Label>
              <Form.Control
              onChange={secondDateHandler}
                type="date"
                name="secondDateToCompare"
                placeholder="Second Date To Compare"
                defaultValue={secondDateToCompare}
              />
            </Form.Group>
    
    <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={300}
              // data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"  label={{value : "TIME" , offset : "50" , position : "insideBottomRight" }}/>
              <YAxis label={{value : "Revenue $" , angle : "-90" , position : "insideLeft"}} allowDuplicatedCategory={false}/>
              <Tooltip />
              <Legend  verticalAlign="top" height={36}/>
              {firstDateOrders?.length > secondDateOrders.length ? (
          <>
          <Line data={firstDateOrders} type="monotone" dataKey={firstDateToCompare} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4} />
              <Line data={secondDateOrders} type="monotone" dataKey={secondDateToCompare} stroke="#82ca9d" strokeWidth={4} />
          </>
              ) : (
                <>
                <Line data={secondDateOrders} type="monotone" dataKey={secondDateToCompare} stroke="#82ca9d" strokeWidth={4} />
          <Line data={firstDateOrders} type="monotone" dataKey={firstDateToCompare} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4} />
          
          </>
              )}
              
            </LineChart>
          </ResponsiveContainer>
    </Col>
        </Row>
  )
}

export default AnalyticsPageComponent
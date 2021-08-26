/* =================================================================== */
/* =========================================================== IMPORTS */
/* =================================================================== */
import React, { useState, useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { useHistory } from 'react-router-dom';
import { getIncomingOrders, getAcceptedOrders, markOrderAccepted, markOrderComplete } from '../../utils/dbQuery.mjs';
import { getCookie } from '../../utils/cookie.mjs';

/* =================================================================== */
/* ================================================ CONTEXT / REDUCERS */
/* =================================================================== */
import { isLoggedInContext } from '../../context/IsLoggedIn.jsx';
import { SocketContext, socket } from '../../context/Socket.jsx';

/* =================================================================== */
/* ============================================================== MAIN */
/* =================================================================== */

export default function StoreApp() {
  // On page load. If user is not logged in, route to login page
  const { isLoggedIn } = useContext(isLoggedInContext);
  const history = useHistory();
  if (!isLoggedIn) {
    history.push('/login');
  }

  // State management
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [triggerRender, setTriggerRender] = useState([]);

  useEffect(() => {
    console.log('re-rendering');
    // ================================================= SOCKET MVP
    // For MVP Socket updates all stores when a customer places an order
    // Goal is to have socket only update the relavant store
    socket.on('INCOMING-ORDER', (message) => {
      console.log(message);
      fetchData();
    });
    // ================================================= SOCKET MVP

    // fetch data on page load
    const fetchData = async () => {
      const storeId = getCookie('storeId');
      const incomingOrdersData = await getIncomingOrders(storeId);
      setIncomingOrders(() => incomingOrdersData);
      const acceptedOrdersData = await getAcceptedOrders(storeId);
      setAcceptedOrders(() => acceptedOrdersData);
      // const allOrders = await getOrders(getCookie('storeId'));
      // setStoreOrders(() => allOrders);
    };
    fetchData();
  }, [triggerRender]);

  const handleAcceptClick = async (orderId) => {
    await markOrderAccepted(orderId);
    setTriggerRender(() => Math.random());
  };

  const handleCompleteClick = async (orderId) => {
    await markOrderComplete(orderId);
    setTriggerRender(() => Math.random());
  };

  /* =========================================================== RENDER */
  return (
    <SocketContext.Provider value={socket}>
      <h1>INCOMING ORDERS</h1>
      {incomingOrders.map((order) => (
        <div key={order.orderTableData.id}>
          <p>
            {`Receipt Num: ${order.orderTableData.receiptNum}`}
          </p>
          <p>
            {`Order Time: ${order.orderTableData.pickUpTime}`}
          </p>
          <p>
            {`Items in order: ${order.orderItemsTableData.length}`}
          </p>
          <button type="button" onClick={() => handleAcceptClick(order.orderTableData.id)}>Accept order</button>
          <hr />
        </div>
      ))}
      <h1>ACCEPTED ORDERS</h1>
      {acceptedOrders.map((order) => (
        <div key={order.orderTableData.id}>
          <p>
            {`Receipt Num: ${order.orderTableData.receiptNum}`}
          </p>
          <p>
            {`Order Time: ${order.orderTableData.pickUpTime}`}
          </p>
          <p>
            {`Items in order: ${order.orderItemsTableData.length}`}
          </p>
          <button type="button" onClick={() => handleCompleteClick(order.orderTableData.id)}>Completed</button>
          <hr />
        </div>
      ))}
    </SocketContext.Provider>
  );
}

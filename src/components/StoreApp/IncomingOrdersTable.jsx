/* =================================================================== */
/* =========================================================== IMPORTS */
/* =================================================================== */
import React, { useState, useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCookie } from '../../utils/cookie.mjs';
import { getIncomingOrders, getAcceptedOrders, markOrderAccepted, markOrderComplete } from '../../utils/dbQuery.mjs';

/* =================================================================== */
/* ================================================ CONTEXT / REDUCERS */
/* =================================================================== */
import { isLoggedInContext } from '../../context/IsLoggedIn.jsx';
import { SocketContext, socket } from '../../context/Socket.jsx';

/* =========================================================== HELPERS */
function createData(receiptNum, pickUpTime, totalItems, id) {
  return { receiptNum, pickUpTime, totalItems, id };
}

/* =================================================================== */
/* ============================================================== MAIN */
/* =================================================================== */

export default function IncomingOrdersTable({ setTriggerRender }) {
  // On page load. If user is not logged in, route to login page
  const { isLoggedIn } = useContext(isLoggedInContext);
  const history = useHistory();
  if (!isLoggedIn) {
    history.push('/login');
  }

  // State management
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [tableRows, setTableRows] = useState([[]]);

  useEffect(() => {
    console.log('re-rendering incoming orders');
    // ================================================= SOCKET MVP
    // For MVP Socket updates all stores when a customer places an order
    // Goal is to have socket only update the relavant store
    socket.on('INCOMING-ORDER', (message) => {
      fetchData();
    });
    // ================================================= SOCKET MVP

    // fetch data on page load
    const fetchData = async () => {
      const storeId = getCookie('storeId');
      const incomingOrdersData = await getIncomingOrders(storeId);
      setIncomingOrders(() => incomingOrdersData);

      // create table
      const rows = incomingOrdersData.map((data) => {
        const { orderTableData, orderItemsTableData } = data;
        const rowToAdd = createData(orderTableData.receiptNum, orderTableData.pickUpTime, orderItemsTableData.length, orderTableData.id);
        return rowToAdd;
      });
      setTableRows(() => rows);
    };

    fetchData();
  }, []);

  const handleAcceptClick = async (orderId) => {
    await markOrderAccepted(orderId);
    setTriggerRender(() => Math.random());
  };

  /* =========================================================== RENDER */
  return (
    <SocketContext.Provider value={socket}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Receipt Num</TableCell>
              <TableCell>Pick Up Time</TableCell>
              <TableCell>Items</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <TableRow
                key={row.receiptNum}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  #
                  {row.receiptNum}
                </TableCell>
                <TableCell>{row.pickUpTime}</TableCell>
                <TableCell>{row.totalItems}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptClick(row.id)}
                  >
                    Accept Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SocketContext.Provider>
  );
}

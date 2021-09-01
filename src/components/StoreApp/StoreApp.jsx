/* =================================================================== */
/* =========================================================== IMPORTS */
/* =================================================================== */
import React, { useState, useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { getIncomingOrders, getAcceptedOrders, markOrderAccepted, markOrderComplete } from '../../utils/dbQuery.mjs';
import { getCookie } from '../../utils/cookie.mjs';
import IncomingOrdersTable from './IncomingOrdersTable.jsx';
import AcceptedOrdersTable from './AcceptedOrdersTable.jsx';
import SingleAcceptedOrder from './SingleAcceptedOrder.jsx';
import NavBar from '../NavBar/NavBar.jsx';

/* =================================================================== */
/* ================================================ CONTEXT / REDUCERS */
/* =================================================================== */
import { isLoggedInContext } from '../../context/IsLoggedIn.jsx';
import { SocketContext, socket } from '../../context/Socket.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem',
  },
  tableParent: {
    marginBottom: '2rem',
  },
  acceptedOrders: {
    color: '#FA275A',
  },
  incomingdOrders: {
    color: '#008000',
  },

}));

/* =================================================================== */
/* ============================================================== MAIN */
/* =================================================================== */

export default function StoreApp() {
  const classes = useStyles();
  // On page load. If user is not logged in, route to login page
  const { isLoggedIn } = useContext(isLoggedInContext);
  const history = useHistory();
  if (!isLoggedIn) {
    history.push('/login');
  }

  // State management
  const [openModel, setOpenModel] = useState(false);
  const [viewSingleAcceptedOrder, setViewSingleAcceptedOrder] = useState();
  const [triggerRender, setTriggerRender] = useState([]);

  const ComponentToRender = () => {
    if (openModel) {
      return (
        <SingleAcceptedOrder orderData={viewSingleAcceptedOrder} setOpenModel={setOpenModel} setTriggerRender={setTriggerRender} />
      );
    }
    return (
      <>
        <Box className={classes.tableParent}>
          <Typography variant="h6" noWrap className={classes.incomingdOrders}>
            INCOMING ORDERS
          </Typography>
          <IncomingOrdersTable setTriggerRender={setTriggerRender} />
        </Box>

        <Box className={classes.tableParent}>
          <Typography variant="h5" noWrap className={classes.acceptedOrders}>
            ACCEPTED ORDERS
          </Typography>
          <AcceptedOrdersTable setOpenModel={setOpenModel} setViewSingleAcceptedOrder={setViewSingleAcceptedOrder} setTriggerRender={setTriggerRender} />
        </Box>
      </>
    );
  };

  /* =========================================================== RENDER */
  return (
    <SocketContext.Provider value={socket}>
      <NavBar />
      <div className={classes.root}>
        <ComponentToRender />
      </div>
    </SocketContext.Provider>
  );
}

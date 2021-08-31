import axios from 'axios';
import { BACKEND_URL } from '../config/config.mjs';
/**
 * Checks Store Login Details
 * @param {String} login
 * @param {String} password
 */
export const checkLogin = async (loginDetails) => {
  const loginResponse = await axios.post(`${BACKEND_URL}/api/store/login`, loginDetails);

  if (!loginResponse) {
    // login details wrong
    return false;
  }

  return loginResponse;
};

/**
 * Get All Store Orders
 */
export const getOrders = async (storeId) => {
  const { data: allOrders } = await axios.get(`${BACKEND_URL}/api/store/orders/${storeId}`);
  return allOrders;
};

/**
 * Get Incoming Store Orders
 */
export const getIncomingOrders = async (storeId) => {
  const { data: incomingOrdersData } = await axios.get(`${BACKEND_URL}/api/store/incomingorders/${storeId}`);
  return incomingOrdersData;
};

/**
 * Get Accepted Store Orders
 */
export const getAcceptedOrders = async (storeId) => {
  const { data: acceptedOrdersData } = await axios.get(`${BACKEND_URL}/api/store/acceptedorders/${storeId}`);
  return acceptedOrdersData;
};

/**
 * Mark Order As Accepted
 */
export const markOrderAccepted = async (orderId) => {
  await axios.put(`${BACKEND_URL}/api/store/acceptorder/${orderId}`);
};

/**
 * Mark Order As Complete
 */
export const markOrderComplete = async (orderId) => {
  await axios.put(`${BACKEND_URL}/api/store/completeorder/${orderId}`);
};

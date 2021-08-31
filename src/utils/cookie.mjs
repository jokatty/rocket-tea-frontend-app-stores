/**
 * Returns value of cookie
 * @param {String} key Key of cookie
 * @return {String} value of cookie or false if cookie does not exist
 */
export const getCookie = (key) => {
  let cookieValue;
  const cookies = document.cookie;
  // check if cookie exists
  if (cookies.includes(key)) {
    // if many cookies
    if (cookies.includes(';')) {
      // eslint-disable-next-line prefer-destructuring
      cookieValue = cookies.split('; ')
        .find((row) => row.startsWith(`${key}=`))
        .split('=')[1];
    } else {
      // eslint-disable-next-line prefer-destructuring
      cookieValue = cookies.split('=')[1];
    }
  } else {
    cookieValue = false;
  }
  return cookieValue;
};

/**
 * Deletes cookie
 * @param {String} key Key of cookie
 * @param {String} path Path of cookie [OPTIONAL]
 */
export const deleteCookie = (name, path) => {
  if (getCookie(name)) {
    document.cookie = `${name}=${
      (path) ? `;path=${path}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

/**
 * Creates cookie
 * @param {String} key Key of cookie
 * @param {String} value value of cookie
 */
export const createCookie = (key, value) => {
  document.cookie = `${key}=${value}`;
};

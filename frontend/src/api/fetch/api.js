export const API_HOST =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_HOST
    : process.env.REACT_APP_DEV_API_HOST;
const accessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 3,
  path: '/',
  domain: 'https://my.sjcpop.com/',
};

const refreshTokenOption = {
  // httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: '/',
  domain: 'https://my.sjcpop.com/',
};

const clearAccessTokenOption = {
  // httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
  domain: 'https://my.sjcpop.com/',
};

const clearRefreshTokenOption = {
  // httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
  domain: 'https://my.sjcpop.com/',
};

export {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
};

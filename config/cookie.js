const accessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 3,
  path: '/',
};

const refreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: '/',
};

const clearAccessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
};

const clearRefreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
};

export {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
};

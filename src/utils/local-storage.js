
const ACCESS_TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';


export function getTokens() {
  const accessTokenData = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshTokenData = localStorage.getItem(REFRESH_TOKEN_KEY);

  return {
    accessTokenData: accessTokenData
        ? JSON.parse(accessTokenData)
        : { token: null, date: null },
    refreshTokenData: refreshTokenData
        ? JSON.parse(refreshTokenData)
        : { token: null, date: null },
  }
}

export function setTokens(tokens) {
    if (tokens.accessTokenData) {
        localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(tokens.accessTokenData));
    }
    if (tokens.refreshTokenData) {
        localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(tokens.refreshTokenData));
    }
  }
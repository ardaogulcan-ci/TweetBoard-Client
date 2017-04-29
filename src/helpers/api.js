
function handleResponse(response) {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}
const paginationLimit = 30;

export default class Api {
  constructor(url, token = null) {
    this._url = url;
    this._token = token;
  }

  get token() {
    return this._token;
  }

  set token(newToken) {
    this._token = newToken;
  }

  header(customHeader) {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (this._token) {
      headers['Authorization'] = `Bearer ${this._token}`;
    }

    if (customHeader) {
      headers = {
        ...headers,
        ...customHeader
      };
    }

    return headers;
  }

}

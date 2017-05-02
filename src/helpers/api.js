
function handleResponse(response) {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}

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

  getBoardsOfUser(userSlug) {
    return fetch(`${this._url}/${userSlug}/boards`, {
      method: 'get',
      headers: this.header(),
    })
    .then(handleResponse);
  }

}

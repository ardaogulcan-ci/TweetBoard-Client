
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

  getBoardOfUser(userSlug, boardSlug) {
    return fetch(`${this._url}/${userSlug}/boards/${boardSlug}`, {
      method: 'get',
      headers: this.header(),
    })
    .then(handleResponse);
  }

  getBoard(boardId) {
    return fetch(`${this._url}/boards/${boardId}`, {
      method: 'get',
      headers: this.header(),
    })
    .then(handleResponse);
  }

  saveBoard(board) {
    const id = board._id ? board._id : '';
    return fetch(`${this._url}/boards/${id}`, {
      method: board._id ? 'put' : 'post',
      headers: this.header(),
      body: JSON.stringify(board)
    })
    .then(handleResponse)
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(rejection => {
      return Promise.reject(rejection);
    })
  }

  saveBox(boardId, box) {
    const id = box._id ? box._id : '';
    return fetch(`${this._url}/boards/${boardId}/boxes/${id}`, {
      method: box._id ? 'put' : 'post',
      headers: this.header(),
      body: JSON.stringify(box)
    })
    .then(handleResponse)
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(rejection => {
      return Promise.reject(rejection);
    })
  }

  searchTweetsWithQuery(query) {
    return fetch(`${this._url}/twitter/search?q=${query}`, {
      method: 'get',
      headers: this.header(),
    })
    .then(handleResponse);
  }

}

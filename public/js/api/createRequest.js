/** Основная функция для совершения запросов на сервер. */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let formData = null;
  let url = options.url;
  
  if (options.data) {
    if (options.method === 'GET') {
      url += '?' + Object.entries(options.data).map(entry => entry.map(encodeURIComponent).join('=')).join('&');
    } else {
      formData = new FormData();
      Object.entries(options.data).forEach(v => formData.append(...v));
    }
  }
  if (options.callback) {
    let err = null;
    let response = null;
    xhr.onload = () => {
      if (xhr.response && xhr.response.success) {
        response = xhr.response;
      } else {
        err = xhr.response;
      }
      options.callback(err, response);
    }
  }
xhr.open(options.method, url);
xhr.send(formData);
};
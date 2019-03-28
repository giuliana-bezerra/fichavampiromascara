export default class HttpService {
    _handleErrors(res) {
        if (res.ok)
            return res;
        throw res;
    }

    _getRequestInfo(body, method, publico) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': publico ? '' : localStorage.getItem('auth-token')
            },
            method: method,
            body: JSON.stringify(body)
        };
    }

    get(url) {
        let publico = (url.includes('public')) ? true : false;

        return fetch(url, this._getRequestInfo(undefined, 'get', publico))
            .then(this._handleErrors)
            .then(res => res.json())
            .catch(res => {
                console.log(res);
                throw res;
            });
    }

    post(url, body) {
        let publico = (url.includes('public')) ? true : false;

        return fetch(url, this._getRequestInfo(body, 'post', publico))
            .then(this._handleErrors)
            .then(res => res.json())
            .catch(res => {
                console.log(res);
                throw res;
            });
    }
}
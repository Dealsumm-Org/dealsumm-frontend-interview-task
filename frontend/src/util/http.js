import axios from 'axios';
import _ from 'lodash';

const apiUrl = (process.env.REACT_APP_API_URL || '') + '/';

const get = (...params) => request('GET', ...params);
const post = (...params) => request('POST', ...params);
const put = (...params) => request('PUT', ...params);
const del = (...params) => request('DELETE', ...params);

const getHeaders = () => {
    const headers = {
        "Content-type": "application/json",
    };

    return headers;
};

const getURL = (url) => apiUrl + url;

async function request(method, url, data, cancelToken) {
    const headers = getHeaders();
    try {
        const result = await axios({
            url: getURL(url),
            method,
            data,
            cancelToken,
            headers,
        });
        return result.data;
    } catch (err) {
        if (_.get(err, 'response.status') === 404) {
            window.location.href = '/';
        }
        if (axios.isCancel(err)) {
            return {
                error: 'cancelled',
            };
        }
        const code = err.response && err.response.status;
        return {
            error: err.response && err.response.data,
            code,
        };
    }
}

export default {
    get,
    post,
    put,
    del,
};

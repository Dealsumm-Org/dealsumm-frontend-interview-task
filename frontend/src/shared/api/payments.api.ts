import { API_URL } from '../constants'
import { Api } from './api'

export class PaymentsApi extends Api{
    public static loadPayments() {
        return fetch(`${API_URL}get_dataset`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
        .then(PaymentsApi.handleResponse)
        .catch(PaymentsApi.handleError)
    }
}
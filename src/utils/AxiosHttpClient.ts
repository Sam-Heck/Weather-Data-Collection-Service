import axios from 'axios';
import { HttpClient } from './HttpClient.js';

export class AxiosHttpClient implements HttpClient {
    async get(url: string, config?: any): Promise<any> {
        try {
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            throw new Error(`Http request failed: ${error}`);
        }
    }
}
export interface HttpClient {
    get(url: string, config?: any): Promise<any>;
}
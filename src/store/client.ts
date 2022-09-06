export const API_ADDRESS = process.env.REACT_APP_API_ADDRESS!;

export class ApiClient {
    public static async get(path: string): Promise<Response> {
        const response = await fetch(API_ADDRESS + path, {
            method: 'GET',
            credentials: 'include',
            headers: this.getHeaders(),
        });

        return response;
    }

    public static async post<T>(path: string, payload: T): Promise<Response> {
        const response = await fetch(API_ADDRESS + path, {
            method: 'POST',
            credentials: 'include',
            headers: this.getHeaders(),
            body: JSON.stringify(payload),
        });

        return response;
    }

    public static async put<T>(path: string, payload: T): Promise<Response> {
        const response = await fetch(API_ADDRESS + path, {
            method: 'PUT',
            credentials: 'include',
            headers: this.getHeaders(),
            body: JSON.stringify(payload),
        });
        return response;
    }

    public static async delete<T>(path: string, payload: T): Promise<Response> {
        const response = await fetch(API_ADDRESS + path, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.getHeaders(),
            body: JSON.stringify(payload),
        });

        return response;
    }

    private static getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem('authToken');
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }
}

export default ApiClient;

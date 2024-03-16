export default class HttpClient {
    public static async get(func: string): Promise<string> {
        return HttpClient.makeRequest('GET', func);
    }


    public static async post(func: string, args?: object) {
        return HttpClient.makeRequest('POST', func, args);
    }

    private static async makeRequest(method: string, func: string, args: object = {}) {
        const url = HttpClient.camelToSnakeCase(func);
        const body = method === 'POST' && JSON.stringify(args);

        const response = await fetch(`http://127.0.0.1:3000/${url}`, {
            method,
            ...(body && { body }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }

    private static camelToSnakeCase(str: string) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
}

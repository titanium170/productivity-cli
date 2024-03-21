export default class HttpService {
    public static async get(func: string): Promise<object> {
        return HttpService.makeRequest('GET', func);
    }

    public static async post(func: string, args?: object) {
        return HttpService.makeRequest('POST', func, args);
    }

    private static async makeRequest(method: string, func: string, args: object = {}): Promise<object> {
        const url = HttpService.camelToSnakeCase(func);
        const body = method === 'POST' && JSON.stringify(args);

        const response = await fetch(`http://127.0.0.1:3000/${url}`, {
            method,
            ...(body && { body }),
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Request-Headers': 'Content-Type',
                'Access-Control-Request-Method': `${method}`
            },
        });

        const data = await response.json();
        return JSON.parse(data);
    }

    private static camelToSnakeCase(str: string) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
}

import jwtDecode from 'jwt-decode';


export default class LocalStorageService {
    public static setItem(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    public static getItem(key: string): string | null {
        const item = window.localStorage.getItem(key);
        return item;
    }

    public static removeItem(key: string) {
        window.localStorage.removeItem(key);
    }

    public static decodeToken(): string | null {
        const token = this.getItem('token');
        if (!token) return null;

        return jwtDecode(token);
    }

    public static clear() {
        window.localStorage.clear();
    }
}

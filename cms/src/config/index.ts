class ConfigService {
    constructor(private env: { [key: string]: string | undefined }) {}

    getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`Config Error - missing env.${key}`);
        }

        return value!;
    }

    ensureValues(keys: string[]) {
        keys.forEach((key) => this.getValue(key));
        return this;
    }
}

export const configService = new ConfigService(process.env).ensureValues([
    "REACT_APP_FIREBASE_MODE",
    "REACT_APP_FIREBASE_API_KEY",
    "REACT_APP_FIREBASE_AUTH_DOMAIN",
    "REACT_APP_FIREBASE_PROJECT_ID",
    "REACT_APP_FIREBASE_STORAGE_BUCKET",
    "REACT_APP_FIREBASE_MESS_SENDER_ID",
    "REACT_APP_FIREBASE_APP_ID",
    "REACT_APP_FIREBASE_MEASUAREMENT_ID",
]);

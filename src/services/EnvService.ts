const get = (varName: string) => (window as any)._env_[varName];

export const EnvService = {
    accessToken: () => get('ACCESS_TOKEN'),
    apiUrl: () => get('API_URL')
};

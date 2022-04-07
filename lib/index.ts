import type { App } from 'vue';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export function createManager(config: any): UserManager {
    const cfg = {
        response_type: 'id_token',
        scope: 'openid profile',
        automaticSilentRenew: true,
        userStore: new WebStorageStateStore({ store: localStorage }),
        ...config,
    };
    return new UserManager(cfg);
}

export function createPlugin(mgr: any) {
    return {
        install(app: App<Element>) {
            app.provide('oidc', mgr);
        },
    };
}

export { UserManager };

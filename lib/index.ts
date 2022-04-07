import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export function createManager(config: any): any {
    const cfg = {
        response_type: 'id_token',
        scope: 'openid profile',
        automaticSilentRenew: true,
        userStore: new WebStorageStateStore({ store: localStorage }),
        ...config,
    };
    return new UserManager(cfg);
}


export function createPlugin(authName: string, router: any, mgr: any) {
    console.log(router.options.history.base);
    router.addRoute({
        path: `/auth/signinwin/${authName}`,
        name: `signinwin-${authName}`,
        component: {
            render: () => '',
            async created() {
                const location = window.location.href.replace(/dash\/#/, 'dash');
                const data: any = await mgr.signinRedirectCallback(location).catch(() => ({ state: { to: '/' } }));
                router.replace(data.state?.to || '/');
            },
        },
    });
    router.beforeEach(async(to: any, from: any, next: any) => {
        if (to.meta?.auth) {
            const user = await mgr.getUser();
            if (to.meta.auth.group) {
                if (user) {
                    if (user.profile.groups?.includes(to.meta.auth.group)) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                } else {
                    next({ name: 'home' });
                }
            } else {
                // unknown auth type
            }
        } else {
            next();
        }
    });
    return {
        install(app: any) {
            app.config.globalProperties.$oidc = mgr;
        },
    };
}

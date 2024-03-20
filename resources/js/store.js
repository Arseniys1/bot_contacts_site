import {defineStore} from "pinia";

export const appStore = defineStore("app-store", {
    state: () => ({
        user: null,
        session: null,
        subscription: null,
        initialized: false,
        apiConfig: null,
    }),
    getters: {
        isAuth: (state) => !!state.session && !!state.user,
        haveSubscription: (state) => !!state.subscription,

        username: (state) => state.user.username ? '@' + state.user.username : null,
        userFirstLastNames: (state) => {
            let username = "";

            if (state.user.first_name) username += state.user.first_name;
            if (state.user.last_name) username += " " + state.user.last_name;

            return username;
        },
        fullUsername: (state) => state.username ? state.username + ' ' + state.userFirstLastNames : state.userFirstLastNames,
    },
    actions: {
        init() {
            if (this.initialized) return;

            console.log('store init');

            let session = localStorage.getItem("session");
            let user = localStorage.getItem("user");
            let subscription = localStorage.getItem("subscription");
            if (session) this.setSession(JSON.parse(session));
            if (user) this.setUser(JSON.parse(user));
            if (subscription) this.setSubscription(JSON.parse(subscription));

            this.initialized = true;
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        setSession(session) {
            this.session = session;
            localStorage.setItem("session", JSON.stringify(session));

            if (session && typeof session['session_token'] !== 'undefined')
                window.axios.defaults.headers.common['Bearer-Token'] = session.session_token;
        },
        setSubscription(subscription) {
            this.subscription = subscription;

            if (subscription) {
                let now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
                subscription.created_at = new Date(subscription.created_at);
                subscription.stop_at = new Date(subscription.stop_at);
                if (now.getTime() >= subscription.stop_at.getTime()) {
                    localStorage.removeItem("subscription");
                    return;
                }
            }

            localStorage.setItem("subscription", JSON.stringify(subscription));
        },
        setApiConfig(apiConfig) {
            this.apiConfig = apiConfig;
        }
    },
})

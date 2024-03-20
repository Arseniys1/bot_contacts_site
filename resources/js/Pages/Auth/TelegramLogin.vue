<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons";
import {load as FingerPrintJS} from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import {inject, ref} from "vue";

const show_error = ref(false);
const show_message = ref(false);
const message = ref("");

const store = inject('store');

function click() {
    createSession().then(response => {
        if (response.status !== 200 && !response.data.success) error.value = true;
        let data = response.data.data;
        let session = data.session;

        store.setSession(session);

        openTelegramBot(session);

        show_message.value = true;
        message.value = 'Подтвердите вход в Telegram боте';

        setTimeout(() => {
            getSessionToken(session);
        }, 5000);
    }).catch(err => {
        console.error(err);
        show_error.value = true;
    })
}

function createSession() {
    return new Promise((resolve) => {
        FingerPrintJS().then(fp => fp.get()).then(result => {
            let req = axios.post(`${store.apiConfig.api_server_url}/create-session`, {
                fingerprint_result: result,
            });
            resolve(req);
        });
    });
}

 function getSessionToken(session, attempts = 0) {
     if (attempts >= 10) {
         show_error.value = true;
         return;
     } else if (store.isAuth) return;

     axios.post(`${store.apiConfig.api_server_url}/get-token`, {
         session_id: session.session_id,
     }).then((res) => {
         if (res.status === 200 && res.data.success && res.data.data.session.confirmed) {
             let data = res.data.data;

             store.setUser(data.user);
             store.setSession(data.session);
             store.setSubscription(data.subscription);

             message.value = 'Успешная авторизация';
             show_message.value = true;

             window.location = route('dashboard');
         }
     }).catch((error) => {
         console.error(error);
     })

     setTimeout(() => {
         getSessionToken(session, attempts += 1)
     }, 5000);
 }

function openTelegramBot(session) {
    let url = `tg://resolve?domain=${store.apiConfig.bot_address}&start=${btoa(session.session_id)}`;
    window.open(url, "_blank");
}

</script>

<template>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="click">
        Войти через Telegram
        <FontAwesomeIcon :icon="faTelegramPlane" />
    </button>

    <p v-if="show_error" class="text-red-600">Ошибка попробуйте позже</p>
    <p v-if="show_message" class="text-green-600">{{ message }}</p>
</template>

<style scoped>

</style>

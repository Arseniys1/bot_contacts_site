<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import {appStore} from "@/store.js";
import {provide} from "vue";

const props = defineProps({
    apiConfig: {
        type: Object,
        required: true,
    },
});

const store = appStore();
store.init();
store.setApiConfig(props.apiConfig);

provide('store', store);

</script>

<template>
    <Head title="Loads" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Loads</h2>
        </template>

        <div class="pt-5 pb-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

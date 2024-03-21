<script setup>
import {ref} from "vue";

const enabled = ref(null);
const enabled_previous = ref(null);

const ellipse_max_route_length = ref(15);
const ellipse_max_route_unity = ref('km');
const ellipse_min_route_length = ref(30);
const ellipse_min_route_unity = ref('km');

const route_min_length = ref(150);
const route_max_length = ref(3000);

function enabled_click(value) {
    if (enabled_previous.value === value) enabled.value = null;
    enabled_previous.value = value;
}

</script>

<template>
    <div class="p-6">
        <div>
            <a-radio-group v-model:value="enabled">
                <a-radio @click="enabled_click('ellipse')" v-model="enabled" value="ellipse">Искать грузы в «эллипсе» маршрута</a-radio>
                <a-radio @click="enabled_click('route')" v-model="enabled" value="route">Длина маршрута</a-radio>
            </a-radio-group>

            <div v-if="enabled === 'ellipse'" class="pt-3">
                <a-form layout="inline">
                    <a-form-item label="Максимальное увеличение пути">
                        <a-input-number v-model:value="ellipse_max_route_length"/>
                    </a-form-item>
                    <a-form-item>
                        <a-select v-model:value="ellipse_max_route_unity">
                            <a-select-option value="km">км</a-select-option>
                            <a-select-option value="%">%</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Минимальное расстояние перевозки">
                        <a-input-number v-model:value="ellipse_min_route_length"/>
                    </a-form-item>
                    <a-form-item>
                        <a-select v-model:value="ellipse_min_route_unity">
                            <a-select-option value="km">км</a-select-option>
                            <a-select-option value="%">%</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>

            <div v-if="enabled === 'route'" class="pt-3">
                <a-form layout="inline">
                    <a-form-item label="Минимальное расстояние">
                        <a-input-number v-model:value="route_min_length" addon-after="км"/>
                    </a-form-item>
                    <a-form-item label="Максимальное расстояние">
                        <a-input-number v-model:value="route_max_length" addon-after="км"/>
                    </a-form-item>
                </a-form>
            </div>
        </div>

        <div class="pt-3">

        </div>
    </div>
</template>

<style scoped>

</style>

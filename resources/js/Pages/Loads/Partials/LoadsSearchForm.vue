<script setup>
import {ref} from "vue";

const enabled = ref(null);
const enabled_previous = ref(null);

function enabled_click(value) {
    if (enabled_previous.value === value) enabled.value = null;
    enabled_previous.value = value;
}

</script>

<template>
    <div class="p-6">
        <fieldset>
            <div class="flex gap-x-3">
                <div class="flex items-center gap-x-3">
                    <input v-model="enabled" @click="enabled_click('ellipse_enabled')" id="ellipse_enabled" value="ellipse_enabled" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="ellipse_enabled" class="block text-sm font-medium leading-6 text-gray-900">Искать грузы в «эллипсе» маршрута</label>
                </div>
                <div class="flex items-center gap-x-3">
                    <input v-model="enabled" @click="enabled_click('route_length_enabled')" id="route_length_enabled" value="route_length_enabled" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="route_length_enabled" class="block text-sm font-medium leading-6 text-gray-900">Длина маршрута</label>
                </div>
            </div>
        </fieldset>

        <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3" v-if="enabled === 'ellipse_enabled'">
            <div>
                <p class="text-sm">Укажите, на сколько вы можете отклониться от желаемого маршрута и минимальное расстояние перевозки</p>
            </div>
            <div class="flex gap-3 items-center">
                <p class="flex-1 w-32 text-xs"><b>Максимальное</b> увеличение пути</p>
                <div class="flex-1 w-32">
                    <input type="number" name="ellipse-max-route-length" id="ellipse-max-route-length" value="15" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="flex-1 w-32">
                    <select id="ellipse-max-route-length-unity" name="ellipse-max-route-length-unity" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>%</option>
                        <option>км</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-3 items-center">
                <p class="flex-1 w-32 text-xs"><b>Минимальное</b> расстояние перевозки</p>
                <div class="flex-1 w-32">
                    <input type="number" name="ellipse-min-route-length" id="ellipse-min-route-length" value="30" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="flex-1 w-32">
                    <select id="ellipse-min-route-length-unity" name="ellipse-min-route-length-unity" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>%</option>
                        <option>км</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3" v-if="enabled === 'route_length_enabled'">
            <div>
                <p class="text-sm">Укажите, в каких пределах должна находиться длина маршрута перевозки</p>
            </div>
            <div class="flex gap-3 items-start">
                <p class="flex-1 w-32 text-xs"><b>Минимальное</b> расстояние</p>
                <div class="flex-1 w-32">
                    <label for="route-length-min" class="block text-sm font-medium leading-6 text-gray-900">км</label>
                    <input type="number" name="route-length-min" id="route-length-min" value="150" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <div class="flex gap-3 items-start">
                <p class="flex-1 w-32 text-xs"><b>Максимальное</b> расстояние</p>
                <div class="flex-1 w-32">
                    <label for="route-length-max" class="block text-sm font-medium leading-6 text-gray-900">км</label>
                    <input type="number" name="route-length-max" id="route-length-max" value="3000" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3">
            <div class="grid grid-cols-3 gap-3">
                <div class="col-span-2">
                    <label for="from" class="block text-sm font-medium leading-6 text-gray-900">Откуда</label>
                    <input type="text" name="from" id="from" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div>
                    <label for="from_radius" class="block text-sm font-medium leading-6 text-gray-900">Радиус</label>
                    <input type="number" name="from_radius" id="from_radius" placeholder="км" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="col-span-3">
                    <input id="from_exactly" name="from_exactly" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="from_exactly" class="font-medium text-gray-900 ml-3">Точно по загрузке</label>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div class="col-span-2">
                    <label for="to" class="block text-sm font-medium leading-6 text-gray-900">Куда</label>
                    <input type="text" name="to" id="to" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div>
                    <label for="to_radius" class="block text-sm font-medium leading-6 text-gray-900">Радиус</label>
                    <input type="number" name="to_radius" id="to_radius" placeholder="км" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="col-span-3">
                    <input id="to_exactly" name="to_exactly" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label for="to_exactly" class="font-medium text-gray-900 ml-3">Точно по разгрузке</label>
                </div>
            </div>
            <div class="grid grid-cols-8 gap-3">
                <div class="col-span-2">
                    <label for="weight_from" class="block text-sm font-medium leading-6 text-gray-900">Вес, т от</label>
                    <input type="number" name="weight_from" id="weight_from" placeholder="от" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="col-span-2">
                    <label for="weight_to" class="block text-sm font-medium leading-6 text-gray-900">Вес, т до</label>
                    <input type="number" name="weight_to" id="weight_to" placeholder="до" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="col-span-2">
                    <label for="volume_from" class="block text-sm font-medium leading-6 text-gray-900">Объем, м3 от</label>
                    <input type="number" name="volume_from" id="volume_from" placeholder="от" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="col-span-2">
                    <label for="volume_to" class="block text-sm font-medium leading-6 text-gray-900">Объем, м3 до</label>
                    <input type="number" name="volume_to" id="volume_to" placeholder="до" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

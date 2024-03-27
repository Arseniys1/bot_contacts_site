<script setup>
import {ref} from "vue";
import dayjs from "dayjs";
import ru_RU from "ant-design-vue/es/date-picker/locale/ru_RU";
import car_types from "@/Data/CarTypes.json";
import pay_types from "@/Data/PayTypes.json";
import cargo_types from "@/Data/CargoTypes.json";
import loading_types from "@/Data/LoadingTypes.json";
import extra_types from "@/Data/ExtraTypes.json";
import currency_types from "@/Data/CurrencyTypes.json";
import {
    car_types_data_transform,
    car_types_parents,
    cargo_types_data_transform, currency_types_data_transform, extra_types_data_transform, loading_types_data_transform,
    pay_types_data_transform,
    pay_types_settings
} from "@/DataTransform/DataTransform.js";
import MultiSelect from "@/Pages/Loads/Partials/MultiSelect.vue";

const enabled = ref(null);
const enabled_previous = ref(null);

const ellipse_max_route_length = ref(15);
const ellipse_max_route_unity = ref('km');
const ellipse_min_route_length = ref(30);
const ellipse_min_route_unity = ref('km');

const route_min_length = ref(150);
const route_max_length = ref(3000);

const date_from = ref(dayjs());
const date_to = ref(null);

function enabled_click(value) {
    if (enabled_previous.value === value) enabled.value = null;
    enabled_previous.value = value;
}

const value = ref('');
const options = ref([]);
const handleSearch = val => {
    let res;
    if (!val || val.indexOf('@') >= 0) {
        res = [];
    } else {
        res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
            value: `${val}@${domain}`,
        }));
    }
    options.value = res;
};



const options_car_type = ref(car_types_data_transform(car_types));
const options_pay_type = ref(pay_types_data_transform(pay_types));
const options_cargo_type = ref(cargo_types_data_transform(cargo_types));
const options_loading_type = ref(loading_types_data_transform(loading_types));
const options_extra_type = ref(extra_types_data_transform(extra_types));
const options_currency_type = ref(currency_types_data_transform(currency_types));

const rate_pay_extra = ref(8);

const value_cargo_type = ref('lucy');
// const options_cargo_type = ref([
//     {
//         id: 'jack',
//         name: 'Jack',
//     },
//     {
//         id: 'lucy',
//         name: 'Lucy',
//     },
//     {
//         id: 'disabled',
//         name: 'Disabled',
//         disabled: true,
//     },
//     {
//         id: 'yiminghe',
//         name: 'Yiminghe',
//     },
// ]);

const value_load_type = ref('lucy');
const options_load_type = ref([
    {
        id: 'jack',
        name: 'Jack',
    },
    {
        id: 'lucy',
        name: 'Lucy',
    },
    {
        id: 'disabled',
        name: 'Disabled',
        disabled: true,
    },
    {
        id: 'yiminghe',
        name: 'Yiminghe',
    },
]);

</script>

<template>
    <div class="p-6">
        <div>
            <a-radio-group v-model:value="enabled">
                <a-radio @click="enabled_click('ellipse')" v-model="enabled" value="ellipse">Искать грузы в «эллипсе»
                    маршрута
                </a-radio>
                <a-radio @click="enabled_click('route')" v-model="enabled" value="route">Длина маршрута</a-radio>
            </a-radio-group>

            <div v-if="enabled === 'ellipse'" class="pt-3">
                <a-form layout="vertical" :label-col="{xs: 24, sm: 24, md: 24, lg: 8, xl: 8}" :wrapper-col="{xs: 24, sm: 24, md: 24, lg: 8, xl: 8}">
                    <a-form-item>
                        Укажите, на сколько вы можете отклониться
                        от желаемого маршрута и минимальное расстояние перевозки
                    </a-form-item>
                    <a-form-item>
                        <b>Максимальное</b>
                        увеличение пути
                    </a-form-item>
                    <a-form-item>
                        <a-input-number v-model:value="ellipse_max_route_length" style="width: 100%;"/>
                    </a-form-item>
                    <a-form-item>
                        <a-select v-model:value="ellipse_max_route_unity">
                            <a-select-option value="km">км</a-select-option>
                            <a-select-option value="%">%</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <b>Минимальное</b>
                        расстояние перевозки
                    </a-form-item>
                    <a-form-item>
                        <a-input-number v-model:value="ellipse_min_route_length" style="width: 100%;"/>
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
                <a-form layout="vertical" :label-col="{xs: 24, sm: 24, md: 24, lg: 8, xl: 8}" :wrapper-col="{xs: 24, sm: 24, md: 24, lg: 8, xl: 8}">
                    <a-form-item>
                        Укажите, в каких пределах должна
                        находиться длина маршрута перевозки
                    </a-form-item>
                    <a-form-item>
                        <b>Минимальное</b>
                        расстояние
                    </a-form-item>
                    <a-form-item>
                        <a-input-number v-model:value="route_min_length" style="width: 100%;" addon-after="км"/>
                    </a-form-item>
                    <a-form-item>
                        <b>Максимальное</b>
                        расстояние
                    </a-form-item>
                    <a-form-item>
                        <a-input-number v-model:value="route_max_length" style="width: 100%;" addon-after="км"/>
                    </a-form-item>
                </a-form>
            </div>
        </div>

        <div :class="enabled ? 'pt-8' : 'pt-3'">
            <a-row :gutter="[8,16]">
                <a-divider v-if="enabled"></a-divider>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <a-form layout="vertical">
                        <a-form-item label="Откуда">
                            <a-auto-complete
                                v-model:value="value"
                                placeholder="Откуда"
                                size="large"
                                :options="options"
                                @search="handleSearch"
                                allow-clear
                            >
                                <template #option="{ value: val }">
                                    {{ val.split('@')[0] }} @
                                    <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
                                </template>
                            </a-auto-complete>
                        </a-form-item>
                        <a-form-item>
                            <a-input-number placeholder="Радиус" disabled style="width: 100%;" addon-after="км"/>
                        </a-form-item>
                        <a-form-item>
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                @focus="focus"
                                @change="handleChange"
                                placeholder="Выбрать список"
                            >
                                <a-select-option value="jack">Jack</a-select-option>
                                <a-select-option value="lucy">Lucy</a-select-option>
                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox>Точно по загрузке</a-checkbox>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <a-form layout="vertical">
                        <a-form-item label="Куда">
                            <a-auto-complete
                                v-model:value="value"
                                placeholder="Куда"
                                size="large"
                                :options="options"
                                @search="handleSearch"
                                allow-clear
                            >
                                <template #option="{ value: val }">
                                    {{ val.split('@')[0] }} @
                                    <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
                                </template>
                            </a-auto-complete>
                        </a-form-item>
                        <a-form-item>
                            <a-input-number placeholder="Радиус" disabled style="width: 100%;" addon-after="км"/>
                        </a-form-item>
                        <a-form-item>
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                @focus="focus"
                                @change="handleChange"
                                placeholder="Выбрать список"
                            >
                                <a-select-option value="jack">Jack</a-select-option>
                                <a-select-option value="lucy">Lucy</a-select-option>
                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox>Точно по загрузке</a-checkbox>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Вес, т">
                            <a-input-number placeholder="от" style="width: 100%;"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input-number placeholder="до" style="width: 100%;"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Объем, м3">
                            <a-input-number placeholder="от" style="width: 100%;"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input-number placeholder="до" style="width: 100%;"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-divider></a-divider>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Дата погрузки">
                            <a-date-picker v-model:value="date_from" placeholder="с" :locale="ru_RU" style="width: 100%;"/>
                        </a-form-item>
                        <a-form-item>
                            <a-date-picker v-model:value="date_to" placeholder="по" :locale="ru_RU" style="width: 100%;"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Тип кузова">
                            <MultiSelect :options="options_car_type" :parent_options="car_types_parents" @change="(selected) => console.log(selected)" placeholder="Тип кузова"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Наименование груза">
                            <MultiSelect :options="options_cargo_type" placeholder="Наименование груза"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Тип загрузки">
                            <MultiSelect :options="options_loading_type" placeholder="Тип загрузки"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Оплата">
                            <MultiSelect :options="options_pay_type" :setting_options="pay_types_settings" placeholder="Оплата"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input-number placeholder="от" style="width: 100%;"/>
                        </a-form-item>
                        <a-form-item>
                            <a-select
                                ref="select"
                                v-model:value="rate_pay_extra"
                            >
                                <a-select-option v-for="option_currency of options_currency_type" :value="option_currency.id">{{ option_currency.name }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <a-form layout="vertical">
                        <a-form-item label="Доп параметры">
                            <MultiSelect :options="options_extra_type" placeholder="Доп параметры"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-divider></a-divider>
                <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <a-form layout="vertical">
                        <a-form-item label="Габариты и догруз">
                            <a-checkbox v-model:checked="checked">Скрыть без габаритов</a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Длина от" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Длина до" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Ширина от" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Ширина до" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Высота от" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Высота до" addon-after="м"/>
                        </a-form-item>
                        <a-form-item>
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                @focus="focus"
                                @change="handleChange"
                                placeholder="Догруз"
                            >
                                <a-select-option value="jack">Jack</a-select-option>
                                <a-select-option value="lucy">Lucy</a-select-option>
                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-model:value="value" placeholder="Паллеты" addon-after="шт"/>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <a-form layout="vertical">
                        <a-form-item label="Торги">
                            <a-checkbox v-model:checked="checked">Только с торгами</a-checkbox>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <a-form layout="vertical">
                        <a-form-item label="Поиск по фирмам">
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                @focus="focus"
                                @change="handleChange"
                                placeholder="Любой балл участника"
                            >
                                <a-select-option value="jack">Jack</a-select-option>
                                <a-select-option value="lucy">Lucy</a-select-option>
                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <a-form layout="vertical">
                        <a-form-item label="Добавлены">
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                @focus="focus"
                                @change="handleChange"
                                placeholder="Когда угодно"
                            >
                                <a-select-option value="jack">Jack</a-select-option>
                                <a-select-option value="lucy">Lucy</a-select-option>
                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </div>

        <div class="pt-3">
            <a-flex justify="flex-end">
                <a-button type="primary" size="large">Найти грузы</a-button>
            </a-flex>
        </div>
    </div>
</template>

<style scoped>

</style>

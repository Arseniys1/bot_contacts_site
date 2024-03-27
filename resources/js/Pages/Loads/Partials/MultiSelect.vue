<script setup>
import {reactive} from "vue";
import {get_transformed_dict_item_by_id} from "@/DataTransform/DataTransform.js";

const props = defineProps({
    options: {
        type: Array,
        default: [],
    },
    parent_options: {
        type: Array,
        default: [],
    },
    setting_options: {
        type: Array,
        default: [],
    },
    placeholder: {
        type: String,
        default: null,
    }
});

const filed_names = reactive({ label: 'name', value: 'id', options: 'children' });

const data = reactive({
    options: props.options,
    value: [],
    selected_parent_types: [],
    search: false,
});

function change(ids, selected_types) {
    if (ids.length === 0) data.options = props.options;
    if (data.search) {
        data.options = props.options;
        data.search = false;
    }

    for (let selected_type of selected_types) {
        if (selected_type.parent) {
            if (!data.selected_parent_types.includes(selected_type.id)) {
                selected_type = get_transformed_dict_item_by_id(selected_type.id, props.options);
                data.selected_parent_types.push(selected_type.id);
                for (let children of selected_type.children) {
                    if (!data.value.includes(children.id)) {
                        data.value.push(children.id);
                    }
                }
                for (let field of selected_type.fields) {
                    if (!data.value.includes(field.id)) {
                        data.value.push(field.id);
                    }
                }
            }
        }
    }

    const fields_intersect = data.selected_parent_types.includes(1) &&
        data.selected_parent_types.includes(2);

    for (let selected_parent_type_id of data.selected_parent_types) {
        let found = false;
        for (let selected_type of selected_types) {
            if (selected_type.id === selected_parent_type_id) {
                found = true;
                break;
            }
        }
        if (!found) {
            let dict_item = get_transformed_dict_item_by_id(selected_parent_type_id, props.options);
            for (let children of dict_item.children) {
                let idx = data.value.indexOf(children.id)
                if (idx !== -1) data.value.splice(idx, 1);
            }
            if ((!fields_intersect && (selected_parent_type_id === 1 || selected_parent_type_id === 2)) || (selected_parent_type_id !== 1 && selected_parent_type_id !== 2)) {
                for (let field of dict_item.fields) {
                    let idx = data.value.indexOf(field.id)
                    if (idx !== -1) data.value.splice(idx, 1);
                }
            }
            data.selected_parent_types.splice(data.selected_parent_types.indexOf(selected_parent_type_id), 1);
        }
    }

    for (let selected_type of selected_types) {
        let delete_parent = false;
        if (selected_type.parent) {
            selected_type = get_transformed_dict_item_by_id(selected_type.id, props.options);
            for (let children of selected_type.children) {
                if (data.value.indexOf(children.id) === -1) delete_parent = true;
            }
            for (let field of selected_type.fields) {
                if (data.value.indexOf(field.id) === -1) delete_parent = true;
            }
            if (delete_parent) {
                data.selected_parent_types.splice(data.selected_parent_types.indexOf(selected_type.id), 1);
                data.value.splice(data.value.indexOf(selected_type.id), 1);
            }
        }
    }

    for (let parent_option of props.parent_options) {
        if (!data.value.includes(parent_option.id)) {
            let add_parent = true;

            for (let children_id of parent_option.children_ids) {
                if (!data.value.includes(children_id)) add_parent = false;
            }

            for (let field_id of parent_option.field_ids) {
                if (!data.value.includes(field_id)) add_parent = false;
            }

            if (add_parent) {
                let dict_item = get_transformed_dict_item_by_id(parent_option.id, props.options);
                data.selected_parent_types.push(dict_item.id);
                data.value.push(dict_item.id);
            }
        }
    }


}

function search(value) {
    if (value.length === 0) return data.options = props.options;

    data.search = true;

    const new_options = [];
    props.options.map(option => {
        if (option.name.toLowerCase().includes(value.toLowerCase()))
            new_options.push(option);
    });
    data.options = new_options;
}

function focus() {
    if (data.options.length !== props.options.length) data.options = props.options;
}
</script>

<template>
    <a-select
        ref="select"
        v-model:value="data.value"
        :options="data.options"
        :field-names="filed_names"
        @change="change"
        @search="search"
        @focus="focus"
        :filter-option="false"
        mode="multiple"
        :placeholder="props.placeholder"
    ></a-select>
</template>

<style scoped>

</style>

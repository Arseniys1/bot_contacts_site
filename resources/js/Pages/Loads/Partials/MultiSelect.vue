<script setup>
import {reactive, ref} from "vue";
import {get_transformed_dict_item_by_id} from "@/DataTransform/DataTransform.js";

const props = defineProps({
    options: {
        type: Array,
        default: [],
    },
    parent_options: {
        type: Array,
        default: [],
    }
});

const filed_names = reactive({ label: 'name', value: 'id', options: 'children' });

const selected_value = ref([]);
const selected_parent_types = ref([]);

function change(ids, selected_types) {
    for (let selected_type of selected_types) {
        if (selected_type.parent) {
            if (!selected_parent_types.value.includes(selected_type.id)) {
                selected_type = get_transformed_dict_item_by_id(selected_type.id, props.options);
                selected_parent_types.value.push(selected_type.id);
                for (let children of selected_type.children) {
                    if (!selected_value.value.includes(children.id)) {
                        selected_value.value.push(children.id);
                    }
                }
                for (let field of selected_type.fields) {
                    if (!selected_value.value.includes(field.id)) {
                        selected_value.value.push(field.id);
                    }
                }
            }
        }
    }

    const fields_intersect = selected_parent_types.value.includes(1) &&
        selected_parent_types.value.includes(2);

    for (let selected_parent_type_id of selected_parent_types.value) {
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
                let idx = selected_value.value.indexOf(children.id)
                if (idx !== -1) selected_value.value.splice(idx, 1);
            }
            if ((!fields_intersect && (selected_parent_type_id === 1 || selected_parent_type_id === 2)) || (selected_parent_type_id !== 1 && selected_parent_type_id !== 2)) {
                for (let field of dict_item.fields) {
                    let idx = selected_value.value.indexOf(field.id)
                    if (idx !== -1) selected_value.value.splice(idx, 1);
                }
            }
            selected_parent_types.value.splice(selected_parent_types.value.indexOf(selected_parent_type_id), 1);
        }
    }

    for (let selected_type of selected_types) {
        let delete_parent = false;
        if (selected_type.parent) {
            selected_type = get_transformed_dict_item_by_id(selected_type.id, props.options);
            for (let children of selected_type.children) {
                if (selected_value.value.indexOf(children.id) === -1) delete_parent = true;
            }
            for (let field of selected_type.fields) {
                if (selected_value.value.indexOf(field.id) === -1) delete_parent = true;
            }
            if (delete_parent) {
                selected_parent_types.value.splice(selected_parent_types.value.indexOf(selected_type.id), 1);
                selected_value.value.splice(selected_value.value.indexOf(selected_type.id), 1);
            }
        }
    }

    for (let parent_option of props.parent_options) {
        if (!selected_value.value.includes(parent_option.id)) {
            let add_parent = true;

            for (let children_id of parent_option.children_ids) {
                if (!selected_value.value.includes(children_id)) add_parent = false;
            }

            for (let field_id of parent_option.field_ids) {
                if (!selected_value.value.includes(field_id)) add_parent = false;
            }

            if (add_parent) {
                let dict_item = get_transformed_dict_item_by_id(parent_option.id, props.options);
                selected_parent_types.value.push(dict_item.id);
                selected_value.value.push(dict_item.id);
            }
        }
    }
}
</script>

<template>
    <a-select
        ref="select"
        v-model:value="selected_value"
        :options="props.options"
        :field-names="filed_names"
        @change="change"
        mode="multiple"
    ></a-select>
</template>

<style scoped>

</style>



const car_types_parents = [
    {
        id: 30000,
        name: "все закр.+изотерм",
        children_ids: [200, 100, 500, 700],
        field_ids: [400],
        after_item_ids: [400],
    },
    {
        id: 50000,
        name: "реф.+изотерм",
        children_ids: [300, 310, 312],
        field_ids: [400],
        after_item_ids: [],
    },
    {
        id: 20000,
        name: "все открытые",
        children_ids: [1100, 1150, 1200, 1400, 1355],
        field_ids: [],
        after_item_ids: [],
    },
    {
        id: 5000,
        name: "негабарит",
        children_ids: [10500, 10700, 10550, 10570, 20560],
        field_ids: [],
        after_item_ids: [],
    },
];


const pay_types_settings = [
    {
        id: "cash",
        name: "За наличную оплату",
        together_ids: ["withRate"],
    },
    {
        id: "rateWithNDS",
        name: "Оплата б/н с НДС",
        together_ids: ["withRate"],
    },
    {
        id: "rateWithoutNDS",
        name: "Оплата б/н без НДС",
        together_ids: ["withRate"],
    }
];


const currency_types_only = [
    1, 12, 8, 19,
    5, 15, 10,
    2, 9,
    3, 11,
    21, 24,
    23,
    26, 28,
    29, 31,
    32, 34,
    36, 37,
    39,
];


const together_ids = [];


for (let setting of [...pay_types_settings]) {
    for (let together_id of setting.together_ids) {
        if (!together_ids.includes(together_id)) {
            together_ids.push(together_id);
        }
    }
}


function create_dict_item(id, name, parent = false, children = null, fields = null, together = null) {
    let dict_item = {
        id: id,
        name: name,
        parent: parent,
        is_together: !!(together && together.length > 0),
    };

    if (children) dict_item = {...dict_item, children: children};
    if (fields) dict_item = {...dict_item, fields: fields};
    if (together) dict_item = {...dict_item, together: together};

    return dict_item;
}


function data_transform(dict_items, dict_items_parents, settings, only, name_key) {
    let new_dict_items = [];
    let skip_dict_item_ids = [];
    let skip_after_item_ids = [];

    for (let dict_item_parent of dict_items_parents) {
        let new_dict_item = create_dict_item(dict_item_parent.id, dict_item_parent.name, true, [], []);
        new_dict_item.children.push(create_dict_item(dict_item_parent.id, dict_item_parent.name, true));
        skip_dict_item_ids.push(dict_item_parent.id);

        for (let children_id of dict_item_parent.children_ids) {
            for (let dict_item of dict_items) {
                if (dict_item.dictionary_item_id === children_id) {
                    new_dict_item.children.push(create_dict_item(dict_item.dictionary_item_id, dict_item.attributes_dictionary[name_key]));
                    skip_dict_item_ids.push(dict_item.dictionary_item_id);
                }
            }
        }

        for (let field_id of dict_item_parent.field_ids) {
            for (let dict_item of dict_items) {
                if (dict_item.dictionary_item_id === field_id) {
                    new_dict_item.fields.push(create_dict_item(dict_item.dictionary_item_id, dict_item.attributes_dictionary[name_key]));
                }
            }
        }

        new_dict_items.push(new_dict_item);

        for (let after_item_id of dict_item_parent.after_item_ids) {
            for (let dict_item of dict_items) {
                if (dict_item.dictionary_item_id === after_item_id) {
                    new_dict_items.push(create_dict_item(dict_item.dictionary_item_id, dict_item.attributes_dictionary[name_key]));
                    skip_after_item_ids.push(dict_item.dictionary_item_id);
                }
            }
        }
    }

    for (let setting of settings) {
        new_dict_items.push(create_dict_item(setting.id, setting.name, false, null, null, setting.together_ids))
        skip_dict_item_ids.push(setting.id);
    }

    if (only && only.length > 0) {
        for (let only_id of only) {
            for (let dict_item of dict_items) {
                if (dict_item.dictionary_item_id === only_id) {
                    new_dict_items.push(create_dict_item(dict_item.dictionary_item_id, dict_item.attributes_dictionary[name_key], false, null, null, null));
                    skip_dict_item_ids.push(dict_item.id);
                }
            }
        }

        return new_dict_items;
    }

    for (let dict_item of dict_items) {
        if (!skip_dict_item_ids.includes(dict_item.dictionary_item_id) && !skip_after_item_ids.includes(dict_item.dictionary_item_id))
            new_dict_items.push(create_dict_item(dict_item.dictionary_item_id, dict_item.attributes_dictionary[name_key]));
    }

    return new_dict_items;
}


function car_types_data_transform(dict_items) {
    return data_transform(dict_items, car_types_parents, [], [],"car_type");
}


function pay_types_data_transform(dict_items) {
    return data_transform(dict_items, [], pay_types_settings, [], "name");
}


function cargo_types_data_transform(dict_items) {
    return data_transform(dict_items, [], [], [], "cargo_name");
}


function loading_types_data_transform(dict_items) {
    return data_transform(dict_items, [], [], [], "name");
}


function extra_types_data_transform(dict_items) {
    return data_transform(dict_items, [], [], [], "name");
}


function currency_types_data_transform(dict_items) {
    return data_transform(dict_items, [], [], currency_types_only, "curr_name");
}


function get_transformed_dict_item_by_id(id, dict_items) {
    for (let dict_item of dict_items) {
        if (dict_item.id === id) return dict_item;
    }
}


export {
    car_types_data_transform,
    car_types_parents,
    create_dict_item,
    get_transformed_dict_item_by_id,
    pay_types_data_transform,
    pay_types_settings,
    cargo_types_data_transform,
    loading_types_data_transform,
    extra_types_data_transform,
    currency_types_data_transform,
    currency_types_only,
    together_ids,
};

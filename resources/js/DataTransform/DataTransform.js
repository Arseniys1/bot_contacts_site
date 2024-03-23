

const car_types_parents = [
    {
        id: 1,
        name: "все закр.+изотерм",
        children_ids: [200, 100, 500, 700],
        field_ids: [400],
    },
    {
        id: 2,
        name: "реф.+изотерм",
        children_ids: [300, 310, 312],
        field_ids: [400],
    },
    {
        id: 3,
        name: "все открытые",
        children_ids: [1100, 1150, 1200, 1400, 1355],
        field_ids: [],
    },
    {
        id: 4,
        name: "негабарит",
        children_ids: [10500, 10700, 10550, 10570, 20560],
        field_ids: [],
    },
];


function create_dict_item(id, name, parent = false, children = null, fields = null) {
    let dict_item = {
        id: id,
        name: name,
        parent: parent,
    };

    if (children) dict_item = {...dict_item, children: children};
    if (fields) dict_item = {...dict_item, fields: fields};

    return dict_item;
}


function data_transform(dict_items, dict_items_parents, name_key) {
    let new_dict_items = [];
    let skip_dict_item_ids = [];

    for (let dict_item_parent of dict_items_parents) {
        let new_dict_item = create_dict_item(dict_item_parent.id, dict_item_parent.name, true, [], []);
        new_dict_item.children.push(create_dict_item(dict_item_parent.id, dict_item_parent.name, true));

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
    }

    for (let car_type of dict_items) {
        if (!skip_dict_item_ids.includes(car_type.dictionary_item_id))
            new_dict_items.push(create_dict_item(car_type.dictionary_item_id, car_type.attributes_dictionary[name_key]));
    }

    return new_dict_items;
}


function car_types_data_transform(dict_items) {
    return data_transform(dict_items, car_types_parents, "car_type");
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
    get_transformed_dict_item_by_id
};

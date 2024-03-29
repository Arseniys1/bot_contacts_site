
const car_types = [
    {
        id: 1,
        name: 'все закр.+изотерм',
        children: [
            {
                id: 2,
                name: 'все закр.+изотерм',
            },
            {
                id: 3,
                name: 'тентованный',
            },
            {
                id: 4,
                name: 'тентованный',
            },
            {
                id: 5,
                name: 'контейнер',
            },
            {
                id: 6,
                name: 'фургон',
            },
            {
                id: 7,
                name: 'цельнометалл.',
            },
        ],
    },
    {
        id: 8,
        name: 'изотермический',
    },
    {
        id: 9,
        name: 'реф.+изотерм',
        children: [
            {
                id: 10,
                name: 'реф.+изотерм',
            },
            {
                id: 11,
                name: 'рефрижератор',
            },
            {
                id: 12,
                name: 'реф. с перегородкой',
            },
            {
                id: 13,
                name: 'реф. мультирежимный',
            },
        ]
    },
    {
        id: 14,
        name: 'реф.-тушевоз',
    },
    {
        id: 15,
        name: 'все открытые',
        children: [
            {
                id: 16,
                name: 'все открытые',
            },
            {
                id: 17,
                name: 'бортовой',
            },
            {
                id: 18,
                name: 'открытый конт.',
            },
            {
                id: 19,
                name: 'самосвал',
            },
            {
                id: 20,
                name: 'шаланда',
            },
            {
                id: 21,
                name: 'площадка без бортов',
            },
        ]
    },
    {
        id: 22,
        name: 'негабарит',
        children: [
            {
                id: 23,
                name: 'негабарит',
            },
            {
                id: 24,
                name: 'низкорамный',
            },
            {
                id: 25,
                name: 'трал',
            },
            {
                id: 26,
                name: 'низкорам.платф.',
            },
            {
                id: 27,
                name: 'телескопический',
            },
            {
                id: 28,
                name: 'балковоз(негабарит)',
            },
        ]
    },
    {
        id: 29,
        name: 'автобус',
    },
    {
        id: 30,
        name: 'автовоз',
    },
    {
        id: 31,
        name: 'автовышка',
    },
    {
        id: 32,
        name: 'автотранспортер',
    },
    {
        id: 33,
        name: 'бетоновоз',
    },
    {
        id: 34,
        name: 'битумовоз',
    },
    {
        id: 35,
        name: 'бензовоз',
    },
    {
        id: 36,
        name: 'вездеход',
    },
    {
        id: 37,
        name: 'газовоз',
    },
    {
        id: 38,
        name: 'зерновоз',
    },
    {
        id: 39,
        name: 'коневоз',
    },
    {
        id: 40,
        name: 'контейнеровоз',
    },
    {
        id: 41,
        name: 'кормовоз',
    },
    {
        id: 42,
        name: 'кран',
    },
    {
        id: 43,
        name: 'лесовоз',
    },
    {
        id: 44,
        name: 'ломовоз',
    },
    {
        id: 45,
        name: 'манипулятор',
    },
    {
        id: 46,
        name: 'микроавтобус',
    },
    {
        id: 47,
        name: 'муковоз',
    },
    {
        id: 48,
        name: 'панелевоз',
    },
    {
        id: 49,
        name: 'пикап',
    },
    {
        id: 50,
        name: 'пухтовоз',
    },
    {
        id: 51,
        name: 'пирамида',
    },
    {
        id: 52,
        name: 'рулоновоз',
    },
    {
        id: 53,
        name: 'седельный тягач',
    },
    {
        id: 54,
        name: 'скотовоз',
    },
    {
        id: 55,
        name: 'стекловоз',
    },
    {
        id: 56,
        name: 'трубовоз',
    },
    {
        id: 57,
        name: 'цементовоз',
    },
    {
        id: 58,
        name: 'автоцистерна',
    },
    {
        id: 59,
        name: 'щеповоз',
    },
    {
        id: 60,
        name: 'эвакуатор',
    },
    {
        id: 61,
        name: 'грузопассажирский',
    },
    {
        id: 62,
        name: 'клюшковоз',
    },    {
        id: 63,
        name: 'мусоровоз',
    },    {
        id: 64,
        name: 'jumbo',
    },
    {
        id: 65,
        name: '20\' танк-контейнер',
    },
    {
        id: 66,
        name: '40\' танк-контейнер',
    },
    {
        id: 67,
        name: 'мега фура',
    },
    {
        id: 68,
        name: 'допельшток',
    },
    {
        id: 69,
        name: 'Раздвижной полуприцеп 20\'/40\'',
    },
];

function get_car_type_by_id(id) {
    for (let car_type of car_types) {
        console.log('c', car_type, id)
        if (car_type.id === id) return car_type;
    }
}

export {
    car_types,
    get_car_type_by_id,
};

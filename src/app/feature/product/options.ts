export const InternetOptions = {
    columns: [
        'მაქსიმალური სიჩქარე',
        'მინიმალური სიჩქარე',
        'ფაქტობრივი სიჩქარე',
        'ჯიტერი',
        'დაყოვნება',
        'დაკარგული პაკეტების კოეფიციენტი',
    ],
    keys: ['name', 'maxSpeed', 'minSpeed', 'actualSpeed', 'giter', 'timeout', 'lost'],
    packages: [
        {
            name: 'ოპტიკური ინტერნეტი',
            type_id: 1,
            prodcuts: [],
        },
        {
            name: 'DSL ინტერნეტი',
            type_id: 2,
            prodcuts: [],
        },
        {
            name: 'Wifi ინტერნეტი',
            type_id: 3,
            prodcuts: [],
        },
    ]
};

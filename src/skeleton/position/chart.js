import coverDevice from '~/utils/device.js'

const obj = {
    market: coverDevice([{
        left: 10,
        top: 15,
        bottom: 220,
        width: 45,
        height: 45,
        type: 'round',
    }, {
        left: 60,
        right: 365,
        top: 12,
        bottom: 220,
        width: 90,
        height: 19,
        type: 'rect',
    }, {
        left: 60,
        right: 365,
        top: 40,
        bottom: 220,
        width: 55,
        height: 19,
        type: 'rect',
    }, {
        left: 300,
        right: 365,
        top: 15,
        bottom: 220,
        width: 80,
        height: 40,
        type: 'rect',
    }]),
    market2: coverDevice([{
        left: 18,
        top: 15,
        bottom: 220,
        width: 36,
        height: 20,
        type: 'rect',
    },
    {
        left: 18,
        top: 40,
        bottom: 220,
        width: 70,
        height: 16,
        type: 'rect',
    },
    {
        left: 176,
        top: 15,
        bottom: 220,
        width: 36,
        height: 20,
        type: 'rect',
    },
    {
        left: 176,
        top: 40,
        bottom: 220,
        width: 70,
        height: 16,
        type: 'rect',
    },
    {
        left: 18,
        top: 75,
        bottom: 220,
        width: 36,
        height: 20,
        type: 'rect',
    },
    {
        left: 18,
        top: 100,
        bottom: 220,
        width: 70,
        height: 16,
        type: 'rect',
    },
    {
        left: 176,
        top: 75,
        bottom: 220,
        width: 46,
        height: 20,
        type: 'rect',
    },
    {
        left: 176,
        top: 100,
        bottom: 220,
        width: 70,
        height: 16,
        type: 'rect',
    },
    ]),

    market3: coverDevice([{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 390,
        height: 287,
        type: 'rect',
    }]),
}
export default obj
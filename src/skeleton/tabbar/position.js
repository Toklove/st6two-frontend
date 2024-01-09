import coverDevice from '~/utils/device.js'

const obj = {
    market: coverDevice([{
        left: 10,
        top: 15,
        bottom: 220,
        width: 44,
        height: 44,
        type: 'round',
    }, {
        left: 58,
        right: 365,
        top: 12,
        bottom: 220,
        width: 104,
        height: 19,
        type: 'rect',
    }, {
        left: 58,
        right: 365,
        top: 46,
        bottom: 220,
        width: 148,
        height: 19,
        type: 'rect',
    }, {
        left: 206,
        right: 365,
        top: 14,
        bottom: 220,
        width: 90,
        height: 19,
        type: 'rect',
    }, {
        left: 340,
        right: 365,
        top: 14,
        bottom: 220,
        width: 40,
        height: 19,
        type: 'rect',
    },
        {
            left: 364,
            right: 365,
            top: 46,
            bottom: 220,
            width: 16,
            height: 19,
            type: 'rect',
        },
    ]),
}
export default obj

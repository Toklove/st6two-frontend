import coverDevice from '~/utils/device.js'

const obj = {
    market: coverDevice([{
        left: 10,
        top: 24,
        bottom: 220,
        width: 44,
        height: 44,
        type: 'round',
    }, {
        left: 58,
        right: 365,
        top: 22,
        bottom: 220,
        width: 108,
        height: 19,
        type: 'rect',
    }, {
        left: 58,
        right: 365,
        top: 52,
        bottom: 220,
        width: 184,
        height: 19,
        type: 'rect',
    }, {
        left: 205,
        right: 365,
        top: 22,
        bottom: 220,
        width: 70,
        height: 19,
        type: 'rect',
    }, {
        left: 340,
        right: 365,
        top: 22,
        bottom: 220,
        width: 40,
        height: 19,
        type: 'rect',
    },
    {
        left: 364,
        right: 365,
        top: 54,
        bottom: 220,
        width: 16,
        height: 19,
        type: 'rect',
    },
    ]),
}
export default obj

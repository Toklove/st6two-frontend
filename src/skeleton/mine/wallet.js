import coverDevice from '~/utils/device.js'

const obj = {
    market: coverDevice([{
        left: 18,
        right: 365,
        top: 36,
        bottom: 220,
        width: 128,
        height: 23,
        type: 'rect',
    }, {
        left: 18,
        right: 365,
        top: 66,
        bottom: 220,
        width: 90,
        height: 24,
        type: 'rect',
    },
    {
        left: 340,
        right: 365,
        top: 48,
        bottom: 220,
        width: 26,
        height: 26,
        type: 'round',
    },
    ]),
}
export default obj

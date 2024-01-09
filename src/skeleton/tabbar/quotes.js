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
        left: 200,
        right: 365,
        top: 25,
        bottom: 220,
        width: 90,
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
}
export default obj

// 本文件由FirstUI授权予南宁风吹雨网络科技有限公司（会员ID：1 5  41，营业执照号：   9 1 4  5  0 1 0 0MAB   NH73 0 9B）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import {getTransferedObjectUUID} from './classUtils';

const name = 'WebGLProgram';

function uuid(id) {
    return getTransferedObjectUUID(name, id);
}

export default class WebGLProgram {
    className = name;

    constructor(id) {
        this.id = id;
    }

    static uuid = uuid;

    uuid() {
        return uuid(this.id);
    }
}
// 本文件由FirstUI授权予南宁风吹雨网络科技有限公司（会员ID：1  54 1，营业执照号：9 14 50  1 0  0M A     BN  H 73 09B）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
let incId = 1;

const noop = function () { };

class GImage {

    static GBridge = null;

    constructor() {
        this._id = incId++;
        this._width = 0;
        this._height = 0;
        this._src = undefined;
        this._onload = noop;
        this._onerror = noop;
        this.complete = false;
    }

    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
    }

    get height() {
        return this._height;
    }

    set height(v) {
        this._height = v;
    }

    get src() {
        return this._src;
    }

    set src(v) {

        if (v.startsWith('//')) {
            v = 'http:' + v;
        }

        this._src = v;

        GImage.GBridge.perloadImage([this._src, this._id], (data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.error) {
                var evt = { type: 'error', target: this };
                this.onerror(evt);
            } else {
                this.complete = true;
                this.width = typeof data.width === 'number' ? data.width : 0;
                this.height = typeof data.height === 'number' ? data.height : 0;
                var evt = { type: 'load', target: this };
                this.onload(evt);
            }
        });
    }

    addEventListener(name, listener) {
        if (name === 'load') {
            this.onload = listener;
        } else if (name === 'error') {
            this.onerror = listener;
        }
    }

    removeEventListener(name, listener) {
        if (name === 'load') {
            this.onload = noop;
        } else if (name === 'error') {
            this.onerror = noop;
        }
    }

    get onload() {
        return this._onload;
    }

    set onload(v) {
        this._onload = v;
    }

    get onerror() {
        return this._onerror;
    }

    set onerror(v) {
        this._onerror = v;
    }
}

export default GImage;
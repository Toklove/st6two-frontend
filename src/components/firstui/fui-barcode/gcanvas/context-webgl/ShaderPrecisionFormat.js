// 本文件由FirstUI授权予南宁风吹雨网络科技有限公司（会员ID： 1 54 1，营业执照号：9 1  4    50 100 MABNH   730    9 B）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
export default class WebGLShaderPrecisionFormat {
    className = 'WebGLShaderPrecisionFormat';

    constructor({
        rangeMin, rangeMax, precision
    }) {
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.precision = precision;
    }
}
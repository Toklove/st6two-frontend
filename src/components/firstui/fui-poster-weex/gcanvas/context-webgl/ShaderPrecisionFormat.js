// 本文件由FirstUI授权予南宁风吹雨网络科技有限公司（会员ID：15  4 1，营业执照号： 9  145 0  1 0 0 M  A    B  NH7309B）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
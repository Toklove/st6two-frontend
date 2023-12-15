// 本文件由FirstUI授权予南宁风吹雨网络科技有限公司（会员ID：15 4  1，营业执照号：914  5010 0M       ABN  H 73   09 B）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import GCanvas from './env/canvas';
import GImage from './env/image';

import GWebGLRenderingContext from './context-webgl/RenderingContext';
import GContext2D from './context-2d/RenderingContext';

import GBridgeWeex from './bridge/bridge-weex';

export let Image = GImage;

export let WeexBridge = GBridgeWeex;

export function enable(el, {
	bridge,
	debug,
	disableAutoSwap,
	disableComboCommands
} = {}) {

	const GBridge = GImage.GBridge = GCanvas.GBridge = GWebGLRenderingContext.GBridge = GContext2D.GBridge = bridge;

	GBridge.callEnable(el.ref, [
		0, // renderMode: 0--RENDERMODE_WHEN_DIRTY, 1--RENDERMODE_CONTINUOUSLY
		-1, // hybridLayerType:  0--LAYER_TYPE_NONE 1--LAYER_TYPE_SOFTWARE 2--LAYER_TYPE_HARDWARE
		false, // supportScroll
		false, // newCanvasMode
		1, // compatible
		'white', // clearColor
		false // sameLevel: newCanvasMode = true && true => GCanvasView and Webview is same level
	]);

	if (debug === true) {
		GBridge.callEnableDebug();
	}
	if (disableComboCommands) {
		GBridge.callEnableDisableCombo();
	}

	var canvas = new GCanvas(el.ref, {
		disableAutoSwap
	});
	let pixelRatio = uni.getSystemInfoSync().pixelRatio;
	canvas.width = el.style.width * pixelRatio;
	canvas.height = el.style.height * pixelRatio;

	return canvas;
};
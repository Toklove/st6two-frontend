// 将骨架屏转换成相应设备尺寸
function coverDevice(data) {
    const result = []
    // 设计宽度: 430 设计高度: 932
    // 设计宽度和高度
    const designWidth = 430
    const designHeight = 932
    const deviceWidth = uni.getWindowInfo().windowWidth
    const deviceHeight = uni.getWindowInfo().windowHeight
    // 计算宽度和高度的比例
    const widthRatio = deviceWidth / designWidth
    const heightRatio = deviceHeight / designHeight

    data.forEach((item) => {
        // 根据设备尺寸调整左边距、右边距、上边距、下边距、宽度和高度
        const record = {
            left: Number.parseInt(item.left * widthRatio),
            right: Number.parseInt(item.right * widthRatio),
            top: Number.parseInt(item.top * heightRatio),
            bottom: Number.parseInt(item.bottom * heightRatio),
            width: Number.parseInt(item.width * widthRatio),
            height: Number.parseInt(item.height * heightRatio),
        }
        result.push(record)
    })
    console.log(result)
    return result
}

export default coverDevice

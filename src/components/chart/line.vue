<script>
export default {
    onReady: function(e) {
        console.log(e)
        console.log(111)
        var context = uni.createCanvasContext('firstCanvas')
        context.setStrokeStyle('#00ff00')
        context.setLineWidth(5)
        context.rect(0, 0, 200, 200)
        context.stroke()
        context.setStrokeStyle('#ff0000')
        context.setLineWidth(2)
        context.moveTo(160, 100)
        context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        context.moveTo(140, 100)
        context.arc(100, 100, 40, 0, Math.PI, false)
        context.moveTo(85, 80)
        context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        context.moveTo(125, 80)
        context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        context.stroke()
        context.draw()
    },
    methods: {
        canvasIdErrorCallback: function(e) {
            console.error(e.detail.errMsg)
        },
    },
}
</script>

<template>
    <view>
        <canvas id='firstCanvas' canvas-id='firstCanvas' style='width: 300px; height: 200px;'></canvas>
        <canvas id='secondCanvas' canvas-id='secondCanvas' style='width: 400px; height: 500px;'></canvas>
        <canvas id='secondCanvas' canvas-id='secondCanvas' style='width: 400px; height: 500px;'
                @error='canvasIdErrorCallback'></canvas>
    </view>
</template>


<style scoped>

</style>

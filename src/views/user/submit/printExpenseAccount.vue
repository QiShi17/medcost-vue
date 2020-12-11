<template>
    <div>
            <div id="pdfCentent">
<!-- 在此处编写需要下载的东西              -->
                <vue-qr :text="downloadData.info" :margin="10" colorDark="#000" colorLight="#fff" :dotScale="1" :logoSrc="downloadData.icon" :logoScale="0.2" :size="200"></vue-qr>
            </div>
            <el-button type="danger" @click="ExportSavePdf(htmlTitle,nowTime)">导出PDF</el-button>
    </div>

</template>

<script>
    import vueQr from 'vue-qr'
    export default {
        components: {
            vueQr
        },
        data() {
            return {
                downloadData: {
                    info:"111",
                    url: 'https://www.baidu.com',  //需要转化成二维码的网址
                },
                htmlTitle: "PDF名称",
                nowTime: "",
            }
            //data里面的东西

        }//data右括号
    }
</script>
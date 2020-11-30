<template> 
  <div>
    <el-upload
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      :multiple="false"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">批量导入</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policyExcel} from '@/api/oss'
  import {importExcel} from "@/api/login";

  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        dialogVisible: false,
        useOss:true, //使用oss->true;使用MinIO->false
        ossUploadUrl:'http://medcost-oss.oss-cn-beijing.aliyuncs.com',
        minioUploadUrl:'http://localhost:8080/minio/upload',
        curTimeStamp:'',
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        if(!this.useOss){
          //不使用oss不需要获取策略
          return true;
        }
        return new Promise((resolve, reject) => {
          policyExcel().then(response => {
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
            _self.curTimeStamp=Date.now()
            _self.dataObj.key = response.data.dir + '/'+_self.curTimeStamp+'${filename}';
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            // _self.dataObj.callback = response.data.callback;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        this.showFileList = true;
        this.fileList.pop();
        let curFileName=this.curTimeStamp+file.name;
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + curFileName;
        if(!this.useOss){
          //不使用oss直接获取图片路径
          url = res.data.url;
        }
        let params = new URLSearchParams();
        params.append("filename",this.dataObj.dir + '/' + curFileName)
        importExcel(params).then(response=>{
          this.$emit('getList')
          this.$message({
            message: '导入成功！',
            type: 'success'
          });
        })
        this.fileList.push({name: file.name, url: url});
        this.emitInput(this.fileList[0].url);

      }


    }
  }
</script>
<style>

</style>



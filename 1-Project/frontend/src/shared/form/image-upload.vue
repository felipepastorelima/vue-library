<template>
  <div>
    <el-upload
      :accept="accept"
      :class="{ 'image-upload-hide-upload': isFull || loading }"
      :file-list="fileList"
      :http-request="uploadFromRequest"
      :on-error="onError"
      :on-preview="handlePictureCardPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      action
      list-type="picture-card"
      ref="files"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" alt width="100%">
    </el-dialog>
  </div>
</template>

<script>
import { FileUploader } from '@/shared/file-upload/file-uploader';
import Errors from '@/shared/error/errors';

export default {
  name: 'app-image-upload',
  props: ['path', 'value', 'schema', 'max'],

  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: (this.value || []).map((item) => ({
        ...item,
        url: item.publicUrl,
      })),
      loading: false,
    };
  },

  computed: {
    isFull() {
      const hasInputReference = !!this.$refs.files;

      return (
        (this.max &&
          (hasInputReference &&
            this.$refs.files.uploadFiles.length >=
              this.max)) ||
        (!hasInputReference &&
          (this.value || []).length >= this.max)
      );
    },

    accept() {
      return 'image/*';
    },
  },

  methods: {
    async uploadFromRequest(request) {
      this.loading = true;
      return FileUploader.uploadFromRequest(
        this.path,
        request,
        this.schema,
      );
    },

    onSuccess(file) {
      if (!file) {
        return;
      }

      this.$emit('input', [...(this.value || []), file]);
      this.loading = false;
    },

    onError(error) {
      Errors.showMessage(error);
      this.loading = false;
    },

    onRemove(file) {
      if (!file) {
        return;
      }

      const id = file.response ? file.response.id : file.id;

      this.$emit(
        'input',
        (this.value || []).filter(
          (item) => item.id !== id,
        ),
      );
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.image-upload-hide-upload .el-upload--picture-card {
  display: none !important;
}
</style>

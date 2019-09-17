<template>
  <div>
    <el-upload
      :accept="accept"
      :file-list="fileList"
      :http-request="uploadFromRequest"
      :limit="max"
      :on-error="onError"
      :on-preview="download"
      :on-remove="onRemove"
      :on-success="onSuccess"
      action
      ref="files"
    >
      <el-button :disabled="loading || isFull" size="small" type="primary">
        <app-i18n code="fileUploader.upload"></app-i18n>
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { FileUploader } from '@/shared/file-upload/file-uploader';
import Errors from '@/shared/error/errors';

export default {
  name: 'app-file-upload',
  props: ['path', 'value', 'schema', 'max'],

  data() {
    return {
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
      return this.schema && this.schema.formats
        ? this.schema.formats
            .map((format) => `.${format}`)
            .join(',')
        : undefined;
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

    onRemove(file, files) {
      this.$emit(
        'input',
        (this.value || []).filter((item) =>
          files.some((file) =>
            file.response
              ? file.response.id === item.id
              : file.id === item.id,
          ),
        ),
      );
    },

    download(file) {
      window.open(file.url, '_blank');
    },
  },
};
</script>

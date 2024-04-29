<template>
  <div class="s-image-picker">
    <div class="s-image-picker__thumb" @click="chooseImage">
      <img :src="this.imageThumb" v-if="imageSelected" />
      <div class="s-upload-icon" v-if="!imageSelected">
        <i class="icon-upload-image"></i>
      </div>
    </div>
    <div class="s-image-picker__filename">
      <input
        ref="fileInput"
        class="s-file-input"
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .svg"
        @change="onSelectFile"
      />
      {{ this.imageFileName }}
    </div>
    <div class="s-button-container s-button-container--right">
      <Button
        v-if="!imageSelected"
        :variation="'default'"
        :title="'Select Image'"
        @click="chooseImage"
      />
      <Button v-if="imageSelected" :variation="'action'" :title="'Upload'" />
      <Button
        v-if="imageSelected"
        variation="default"
        title="Remove"
        @click="deleteImage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "./../components/Button.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button
  },
    data() {
        const imageSelected: Boolean = false;
        const imageThumb: any = null;
        const imageFileName: any = "Click here to add image...";
        const imageData: any = null;
        const $refs: {
                fileInput: HTMLElement;
              } = undefined;

        return {
            $refs,
            imageData,
            imageFileName,
            imageThumb,
            imageSelected
        };
    },
    methods: {
        chooseImage() {
            if (!this.imageSelected) {
              this.$refs.fileInput.click();
            }
        },
        deleteImage() {
            this.imageFileName = "Click here to add image...";
            this.imageThumb = null;
            this.imageSelected = false;
        },
        uploadImage() {
            this.$emit("upload", this.imageData);
        },
        onSelectFile(event: any) {
            var files = event.target.files;
            var output: any = [];
            for (var i = 0, f; (f = files[i]); i++) {
              output.push(f.name, f.size);
            }
            this.imageFileName = output[0];
            this.imageData = event.target.files[0];
            this.imageThumb = URL.createObjectURL(files[0]);
            this.imageSelected = true;
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-image-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
}

.s-file-input {
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 3;
  position: absolute;
}

.s-upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: @light-3;
  width: 40px;
  height: 40px;
}

.s-image-picker__thumb {
  display: inline-flex;
  flex-grow: 0;
  height: 40px;
  width: 40px;
  background-color: @light-4;
  overflow: hidden;
  border-bottom-left-radius: @radius;
  border-top-left-radius: @radius;

  img {
    width: 100%;
    height: 100%;
  }
}

.s-image-picker__filename {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-grow: 3;
  height: 40px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  color: @day-paragraph;
  font-size: 14px;
  background-color: @day-section;
  border-bottom-right-radius: @radius;
  border-top-right-radius: @radius;
  .padding-left(2);
}

.night,
.night-theme {
  .s-upload-icon,
  .s-image-picker__thumb {
    background-color: @dark-5;
    color: @white;
  }
  .s-image-picker__filename {
    background-color: @night-solid-input;
    color: @night-paragraph;
  }
}
</style>

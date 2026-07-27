<template>
  <div class="s-image-picker">
    <div class="s-image-picker__thumb" @click="chooseImage">
      <img :src="imageThumb ?? undefined" v-if="imageSelected" />
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
      {{ imageFileName }}
    </div>
    <div class="s-button-container s-button-container--right">
      <Button
        v-if="!imageSelected"
        :variation="'default'"
        :title="'Select Image'"
        @click="chooseImage"
      />
      <Button
        v-if="imageSelected"
        :variation="'action'"
        :title="'Upload'"
        @click="uploadImage"
      />
      <Button
        v-if="imageSelected"
        variation="default"
        title="Remove"
        @click="deleteImage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Button from "./../components/Button.vue";

defineOptions({ compatConfig: { MODE: 3 } });

const emit = defineEmits<{ upload: [data: File] }>();

const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
const imageData = ref<File | null>(null);
const imageFileName = ref("Click here to add image...");
const imageThumb = ref<string | null>(null);
const imageSelected = ref(false);

function chooseImage() {
  if (!imageSelected.value) fileInput.value!.click();
}

function deleteImage() {
  imageFileName.value = "Click here to add image...";
  imageThumb.value = null;
  imageSelected.value = false;
}

function uploadImage() {
  if (imageData.value) emit("upload", imageData.value);
}

function onSelectFile(event: Event) {
  const files = (event.target as HTMLInputElement).files!;
  imageFileName.value = files[0].name;
  imageData.value = files[0];
  imageThumb.value = URL.createObjectURL(files[0]);
  imageSelected.value = true;
}
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

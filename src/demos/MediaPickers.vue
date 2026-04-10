<template>
  <div>
    <div class="section">
      <h1>Media Pickers</h1>

      <pre><code>import { MediaPicker } from 'streamlabs-beaker';

components: {
  MediaPicker
}</code></pre>
    </div>

    <div class="section">
      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <FormGroup>
            <template #input>
              <media-picker
                variation="image"
                :media-link="true"
                :media-preview="false"
                @select-media="selectVideoMedia"
                @preview-media="previewVideoMedia"
                @remove-media="removeVideoMedia"
                title="Select Video Media"
                v-model="videoMedia"
              />

              <media-picker
                variation="image"
                :media-link="true"
                :media-preview="false"
                @select-media="selectImageMedia"
                @preview-media="previewImageMedia"
                @remove-media="removeImageMedia"
                title="Select Image Media"
                v-model="imageMedia"
              />

              <media-picker
                variation="audio"
                :media-link="true"
                @select-media="selectAudioMedia"
                @remove-media="removeAudioMedia"
                v-model="audioMedia"
              />

              <media-picker
                variation="audio"
                title="My Sample Title"
                :media-link="true"
                :controls-always-visible="true"
                @select-media="selectAudioMedia"
                @remove-media="removeAudioMedia"
                v-model="audioMedia"
              />
            </template>
          </FormGroup>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Props</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>variation</td>
            <td>string</td>
            <td>null</td>
            <td>
              Available variations include `image` and `audio`. Video is under
              the `image` variation.
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>null</td>
            <td>Customizable button text</td>
          </tr>
          <tr>
            <td>mediaLink</td>
            <td>boolean</td>
            <td>false</td>
            <td>
              Will display a clickable link icon that emits `link-media` event.
              Primarily used on SL core to add a link to a media href.
            </td>
          </tr>
          <tr>
            <td>value</td>
            <td>string</td>
            <td>null</td>
            <td>A URL string to the selected media.</td>
          </tr>
          <tr>
            <td>controlsAlwaysVisible</td>
            <td>boolean</td>
            <td>false</td>
            <td>Use if controls always need to be shown.</td>
          </tr>
          <tr>
            <td>link-media</td>
            <td>event</td>
            <td>null</td>
            <td>Event emitted when the link icon is clicked</td>
          </tr>
          <tr>
            <td>preview-media</td>
            <td>event</td>
            <td>null</td>
            <td>
              Event emitted when the magnifiy glass or play icons are clicked
            </td>
          </tr>
          <tr>
            <td>remove-media</td>
            <td>event</td>
            <td>null</td>
            <td>
              Event emitted when the close icon or 'Remove' button is clicked
            </td>
          </tr>
          <tr>
            <td>select-media</td>
            <td>event</td>
            <td>null</td>
            <td>
              Event emitted when the plus icon or 'Select Media' button is
              clicked
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormGroup from "./../components/FormGroup.vue";
import MediaPicker from "./../components/MediaPicker.vue";
import MediaPickersCode from "./MediaPickers.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

const demoCode = MediaPickersCode;
const msg = ref("Hi!");
const audioMedia = ref("");
const imageMedia = ref("");
const videoMedia = ref("");

function selectVideoMedia() {
  videoMedia.value =
    "https://cdn.streamlabs.com/static/imgs/intro-maker/highlight-key-info-before-your-stream.jpg.mp4";
}

function selectImageMedia() {
  imageMedia.value =
    "https://uploads.twitchalerts.com/000/045/005/127/foolofsoul-design-1521842129-0.png";
}

function selectAudioMedia() {
  audioMedia.value =
    "https://cdn1.twitchalerts.com/twitch-bits/sounds/bits.ogg";
}

function removeImageMedia() {
  imageMedia.value = "";
}

function removeVideoMedia() {
  videoMedia.value = "";
}

function removeAudioMedia() {
  audioMedia.value = "";
}

function previewVideoMedia() {
  console.log("Previewing Video");
  window.open(videoMedia.value);
}

function previewImageMedia() {
  console.log("Previewing Media");
  window.open(imageMedia.value);
}
</script>

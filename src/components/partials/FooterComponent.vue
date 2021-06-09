<template lang="pug">
.FooterComponent.w-100.d-flex.align-items-center.bg-white
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style scoped lang="scss">
.FooterComponent {
  position: sticky;
  height: 60px;
  bottom: 0;
}
</style>

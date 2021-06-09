<template lang="pug">
.NavBarComponent.w-100.d-flex.align-items-center.bg-white.z-10
  .container.d-flex.align-items-center.justify-content-end
    .d-none.d-md-flex.align-items-center.justify-content-end
      label.px-3.d-flex.align-items-center.cursor-pointer.fw-bolder.hover-opaciity-5
        SvgIcon(
          className="me-2"
          iconName="file"
        )
        span AYUDA
      label.px-3.d-flex.align-items-center.cursor-pointer.fw-bolder.hover-opaciity-5
        SvgIcon(
          className="me-2"
          iconName="user"
        )
        span SIGN IN
      label.px-3.d-flex.align-items-center.cursor-pointer.fw-bolder.hover-opaciity-5
        span ES
        SvgIcon(
          className="ms-1"
          iconName="arrow-down"
        )
    .d-block.d-md-none
      SvgIcon.cursor-pointer(
        iconName="hamburger-menu",
        @click="showMenu = !showMenu"
      )
.bg-white.menu.z-20.d-block.d-md-none
  .collapse(
    :class="{ 'show': showMenu }"
  )
    .list-group
      a.list-group-item.list-group-item-action.d-flex.align-items-center
        SvgIcon(
          className="me-2"
          iconName="file"
        )
        span AYUDA
      a.list-group-item.list-group-item-action.d-flex.align-items-center
        SvgIcon(
          className="me-2"
          iconName="user"
        )
        span SIGN IN
      a.list-group-item.list-group-item-action.d-flex.align-items-center
        span ES
        SvgIcon(
          className="ms-1"
          iconName="arrow-down"
        )
  
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBarComponent",
  setup() {
    const showMenu = ref(false);
    return {
      showMenu,
    };
  },
});
</script>

<style scoped lang="scss">
.NavBarComponent {
  position: fixed;
  height: 60px;
  left: 0;
}

.menu {
  position: fixed;
  width: 100%;
  top: 60px;
  left: 0;
}
</style>

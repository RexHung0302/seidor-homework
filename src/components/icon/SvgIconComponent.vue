<template lang="pug">
svg.svgIcon(
  xmlns="http://www.w3.org/2000/svg",
  :class="className",
  :width="width",
  :height="height",
  aria-hidden="true",
)
  use(
    :xlink:href="`#${iconType ? iconType : 'free'}_${iconFullName}`",
  )
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

// 宣告變數類型
type iconTitleType = string;

// Svg 使用注意事項：
// 1. 將 Svg 用 <symbol> 包起來放入 /src/assets/icons/sprites/{Svg 種類}.svg
// 2. 將 Svg 丟入對應種類資料夾 /src/assets/icons/svg/{Svg 種類}/{檔案名稱} 方便日後查看該圖樣式
// 3. 盡情使用它
export default defineComponent({
  name: "IconSvgComponent",
  props: {
    // 客製化 Class Name
    className: {
      type: String,
    },
    // Svg 種類(/assets/icons/svg/資料夾名稱)
    iconType: {
      type: String,
      default: "free",
    },
    // Svg 種類(/assets/icons/svg/{iconType}/去掉前面的種類開頭後面的名稱)
    iconName: {
      type: String,
      default: "3d",
    },
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 22,
    },
  },
  setup(props) {
    // Props
    const { iconType, iconName } = toRefs(props);
    // Icon 開頭
    let iconFullName: iconTitleType;
    switch (iconType.value) {
      case "custom":
        iconFullName = `c-${iconName.value}`;
        break;
      case "brand":
        iconFullName = `cib-${iconName.value}`;
        break;
      case "flag":
        iconFullName = `cif-${iconName.value}`;
        break;
      case "free":
      default:
        iconFullName = `cil-${iconName.value}`;
        break;
    }

    return {
      iconFullName,
      ...props,
    };
  },
});
</script>

<style></style>

<template lang="pug">
.StepComponent(
  :class="props.className"
)
  .stepList(
    v-for="(step, index) in props.stepList",
    :key="index",
    :style="{ width: `calc( 100% / ${props.stepList.length})` }",
    :class="{ 'stepList-active': nowOrderComputed >= index + 1, 'stepList-completed': nowOrderComputed > index + 1 }",
  )
    //- User already completed step show this
    span.stepList__order(
      v-if="nowOrderComputed > index + 1"
    )
      SvgIcon(
        iconName="check"
      )
    //- Other show this
    span.stepList__order(
      v-else
    ) {{ step.order }}
    span.stepList__title.d-block {{ step.title }}
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "StepComponent",
  props: {
    stepList: {
      type: Object,
      required: true,
    },
    nowOrder: {
      type: [Number, String],
      required: true,
    },
    className: {
      type: String,
    },
  },
  setup(props) {
    return {
      props,
      nowOrderComputed: computed(() => props.nowOrder),
    };
  },
});
</script>

<style scoped lang="scss">
.stepList {
  position: relative;
  text-align: center;
  padding: 0 20px;
  font-weight: bold;
  // after
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #e8e8e8;
    top: 20px;
    transform: translateX(20px);
  }
  &:last-child {
    margin-right: 0;
    &::after {
      content: none;
    }
  }
  // Number of step
  &__order {
    background-color: white;
    border: 2px solid #367bbf;
    color: #367bbf;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 4px auto;
    border-radius: 50px;
  }
  &__title {
    color: #cccccc;
  }
  // Active(now where user's stop)
  &-active {
    .stepList__order {
      background-color: #367bbf;
      color: #ffffff;
    }
    .stepList__title {
      color: #000000;
    }
  }
  // Completed(user already done step)
  &-completed {
    .stepList__order {
      border-color: #65c205;
      background-color: #65c205;
    }
  }
}
</style>

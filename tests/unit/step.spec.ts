import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
// import UserForm from "@/components/UserForm.vue";
import StepComponent from "@/components/step/StepComponent.vue";
import Home from "@/views/home.vue";

describe("StepComponent.vue", () => {
  test('When Parent "nowStepOrder" change, child component "nowOrder" has be change.', async () => {
    // Parent
    const wrapperHome = mount(Home);

    // Children Component
    const wrapperStepComponent = mount(StepComponent);

    // Get Parent "nowStepOrder" value, and expect it to be 1
    const vmParent = wrapperHome.vm;
    expect(vmParent.nowStepOrder).toBe(1);

    // Set parent data info for test next function.
    const NombreInput = wrapperHome.find("input#Nombre");
    const ApellidosInput = wrapperHome.find("input#Apellidos");
    NombreInput.setValue("Anderson");
    ApellidosInput.setValue("Christopher");

    // Set Child Component "nowOrder" value that value from parent, and expect it to be 1
    const vmChild = wrapperStepComponent.vm;
    await wrapperStepComponent.setProps({
      nowOrder: vmParent.nowStepOrder,
    });
    expect(vmChild.nowOrder).toBe(1);

    // Task: When Parent "nowStepOrder" change, child component "nowOrder" has be change
    const nextStepButton = wrapperHome.find("button.step1NextBtn");
    await nextStepButton.trigger("click");
    await nextTick();
    expect(vmParent.nowStepOrder).toBe(2);
    expect(vmChild.nowOrder).toBe(2);
  });
});

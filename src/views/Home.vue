<template lang="pug">
NavBarComponent
.content-hasNavbar.bg-secondary.overflow-auto
  .container
    .row.justify-content-center
      .col-12.col-md-6.col-xl-4
        StepComponent.my-5(
          :stepList="stepList",
          :nowOrder="nowStepOrder",
          className="d-flex align-items-center justify-content-center"
        )
    .card.border-0.rounded-0.shadow
      .card-body.text-center.p-4
        .row.justify-content-center
          //- Step1
          .col-12.col-md-6.col-xl-4(
            v-show="nowStepOrder === 1"
          )
            h5.fw-bold Mis Datos
            label.mb-3
              span Revisa los datos y completa aquellas pendientes antes de
              br
              span continuar con el proceso.
            .mb-3.text-start
              label.form-label(
                for="Nombre"
              ) Nombre
              input.form-control#Nombre(
                type="text",
                aria-describedby="firstname",
                :class="{ 'is-valid': validHandler('nombre') === true, 'is-invalid': validHandler('nombre') === false }"
                v-model="data.nombre"
              )
              .invalid-feedback Por favor ingrese su nombre
            .mb-4.text-start
              label.form-label(
                for="Apellidos"
              ) Apellidos
              input.form-control#Apellidos(
                type="text",
                aria-describedby="lastname",
                :class="{ 'is-valid': validHandler('apellidos') === true, 'is-invalid': validHandler('apellidos') === false }"
                v-model="data.apellidos"
              )
              .invalid-feedback Por favor ingrese su apellido
            .mb-3
              button.rounded-pill.d-flex.align-items-center.ms-auto.text-white(
                type="button",
                class="btn btn-primary step1NextBtn",
                @click="nextStepHandler()",
              )
                span.me-2 Continuar
                SvgIcon(
                  iconName="arrow-circle-right"
                )
          //- Step2
          .col-12.col-md-6.col-xl-4(
            v-show="nowStepOrder === 2"
          )
            h5.fw-bold Pago del producto
            label.mb-3
              span Una vez efectuado el pogo del producta, recibirds un email con los detolles de lo compro.
            .border.rounded-1.p-4.mb-3
              img.d-block.mx-auto.mb-2(
                :src="redCard"
              )
              span.d-block.fw-bold Tarjeta de crédito
              span.mb-2 Se redirigird a una plataforma de pogo, Se trato de un proceso segura. Puede que Ia validacion del pago tarde 24 horas en completarse.
              img.d-block.mx-auto(
                :src="cardType"
              )
            .d-flex.align-items-center.justify-content-between
              button.rounded-pill.d-flex.align-items-center.text-primary.border-primary.border-2(
                type="button",
                class="btn btn-white",
                @click="backStepHandler()"
              )
                SvgIcon(
                  iconName="arrow-circle-left"
                )
                span.ms-2 Anterior
              button.rounded-pill.d-flex.align-items-center.ms-auto.text-white(
                type="button",
                class="btn btn-primary step2NextBtn",
                @click="nextStepHandler()",
              )
                span.me-2 Pagar
                SvgIcon(
                  iconName="arrow-circle-right"
                )
          //- (Step3)Success
          .col-12.col-md-6.col-xl-4(
            v-show="nowStepOrder === 3"
          )
            div(
              v-if="res"
            )
              img.d-block.mx-auto.mb-2(
                :src="enhorabuenaImg"
              )
              h5.fw-bold {{ res.title }}
              label
                span {{ res.text }}
FooterComponent
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useSwal } from "@/vendor/Sweetalert2";

// Components
import NavBarComponent from "@/components/partials/NavBarComponent.vue";
import FooterComponent from "@/components/partials/FooterComponent.vue";
import StepComponent from "@/components/step/StepComponent.vue";

// Img
import redCard from "@/assets/images/red-card.png";
import cardType from "@/assets/images/card-type.png";
import enhorabuenaImg from "@/assets/images/enhorabuenaImg.png";

type dataType = {
  nombre: string | null;
  apellidos: string | null;
};

interface keyIndex {
  nombre: "nombre";
  apellidos: "apellidos";
}

export default defineComponent({
  name: "home",
  components: {
    NavBarComponent,
    FooterComponent,
    StepComponent,
  },
  setup() {
    // Vue Tool
    const store = useStore();

    // Plugins
    const Swal = useSwal();

    // Data
    let data: dataType = reactive({
      nombre: null,
      apellidos: null,
    });
    let res = ref("");

    // Step List
    const stepList = reactive([
      {
        order: 1,
        title: "MIS DATOS",
      },
      {
        order: 2,
        title: "PAGO",
      },
    ]);

    // Now Order
    let nowStepOrder = ref(1);

    // Methods
    let methods = {
      validHandler: (key: keyof keyIndex) => {
        if (data[key] === null) {
          return "";
        } else if (data[key] === "") {
          return false;
        }
        return true;
      },
      nextStepHandler: async () => {
        switch (nowStepOrder.value) {
          // Step1 to Step2
          case 1:
            if (
              !data.nombre ||
              data.nombre === "" ||
              !data.apellidos ||
              data.apellidos === ""
            ) {
              if (!data.nombre || data.nombre === "") {
                data.nombre = "";
              }
              if (!data.apellidos || data.apellidos === "") {
                data.apellidos = "";
              }
              return;
            }
            nowStepOrder.value = 2;
            break;
          // Step2 to Step3
          case 2: {
            Swal.fire({
              title: "Please Wait for a moment",
              heightAuto: false,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            res.value = await store.dispatch("POSTV2Pay");
            Swal.close();
            nowStepOrder.value = 3;
            break;
          }
          default:
            break;
        }
      },
      backStepHandler: () => {
        nowStepOrder.value = 1;
      },
    };

    return {
      redCard,
      cardType,
      enhorabuenaImg,
      stepList,
      nowStepOrder,
      data,
      res,
      ...methods,
    };
  },
});
</script>

<style lang="scss">
.content {
  &-hasNavbar {
    padding: 60px 0;
    height: calc(100% - 60px);
  }
}
</style>

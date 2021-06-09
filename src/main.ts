import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Swal
import Swal from "./vendor/Sweetalert2";

// Svg Icon
import "@/assets/icons";
import SvgIconComponent from "@/components/icon/SvgIconComponent.vue";

createApp(App)
  .component("SvgIcon", SvgIconComponent)
  .use(Swal)
  .use(store)
  .use(router)
  .mount("#app");

import { inject } from "vue";
import Swal from "sweetalert2";

const SwalSymbol = Symbol();

export function useSwal(): any {
  return inject(SwalSymbol);
}

export default {
  install: (app: any): void => {
    app.config.globalProperties.$Swal = Swal;
    app.provide(SwalSymbol, Swal);
  },
};

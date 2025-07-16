import Dialog from "./dialog";
import store from "@/store";

import { render } from "@/js/render";

const DeleteUser = (() => {
  let append = false;
  const v = render({ component: Dialog, store });
  v.$mount();
  const child = v.$children[0];

  return () => {
    if (!append) {
      document.body.appendChild(v.$el);
      append = true;
    }

    return child;
  };
})();

export default DeleteUser;

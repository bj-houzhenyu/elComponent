import { makeInstall } from "utils/install";
import Popover from "./Popover.vue";
import Popconfirm from "./Popconfirm.vue";

Popover.Popconfirm = Popconfirm;
Popover.install = makeInstall([Popover, Popconfirm]);

export default Popover;

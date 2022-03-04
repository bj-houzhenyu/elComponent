import { makeInstall } from "utils/install";
import Cascader from "./Cascader.vue";
import CascaderPanel from "./CascaderPanel.vue";

Cascader.CascaderPanel = CascaderPanel;
Cascader.install = makeInstall([Cascader, CascaderPanel]);

export default Cascader;

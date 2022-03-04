import { makeInstall } from "utils/install";
import Label from "./Label.vue";
import LineLabelPopover from "./LineLabelPopover.vue";

Label.LineLabelPopover = LineLabelPopover;
Label.install = makeInstall([Label, LineLabelPopover]);

export default Label;

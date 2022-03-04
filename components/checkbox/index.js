import { makeInstall } from "utils/install";
import Checkbox from "./CheckboxGroup.vue";
import CheckboxItem from "./Checkbox.vue";
import CheckboxButton from "./CheckboxButton.vue";

Checkbox.CheckboxItem = CheckboxItem;
Checkbox.CheckboxButton = CheckboxButton;
Checkbox.install = makeInstall([Checkbox, CheckboxItem, CheckboxButton]);

export default Checkbox;

import { makeInstall } from "utils/install";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";

Button.ButtonGroup = ButtonGroup;
Button.install = makeInstall([Button, ButtonGroup]);

export default Button;

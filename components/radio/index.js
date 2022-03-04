import { makeInstall } from "utils/install";
import Radio from "./RadioGroup.vue";
import RadioItem from "./Radio.vue";
import RadioButton from "./RadioButton.vue";

Radio.RadioItem = RadioItem;
Radio.RadioButton = RadioButton;
Radio.install = makeInstall([Radio, RadioItem, RadioButton]);

export default Radio;

import { makeInstall } from "utils/install";
import Select from "./Select.vue";
import Option from "./Option.vue";
import OptionGroup from "./OptionGroup.vue";

Select.Option = Option;
Select.OptionGroup = OptionGroup;
Select.install = makeInstall([Select, Option, OptionGroup]);

export default Select;

import { makeInstall } from "utils/install";
import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import BaseInput from "./BaseInput.vue";
import BaseInputGroup from "./BaseInputGroup.vue";
import { Regs, checkEmpty, checkLength, checkRange, checkNumber, checkPositiveInteger, checkRegular } from "./validate";

Form.FormItem = FormItem;
Form.BaseInput = BaseInput;
Form.BaseInputGroup = BaseInputGroup;
Form.install = makeInstall([Form, FormItem, BaseInput, BaseInputGroup]);
Form.validate = { Regs, checkEmpty, checkLength, checkRange, checkNumber, checkPositiveInteger, checkRegular };

export default Form;

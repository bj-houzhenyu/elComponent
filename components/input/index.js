import { makeInstall } from "utils/install";
import Input from "./Input.vue";
import LineInput from "./LineInput.vue";
import LineTextarea from "./LineTextarea.vue";

Input.LineInput = LineInput;
Input.LineTextarea = LineTextarea;
Input.install = makeInstall([Input, LineInput, LineTextarea]);

export default Input;

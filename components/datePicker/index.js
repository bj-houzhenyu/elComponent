import { makeInstall } from "utils/install";
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";

DatePicker.TimePicker = TimePicker;
DatePicker.install = makeInstall([DatePicker, TimePicker]);

export default DatePicker;

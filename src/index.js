import Button from "components/button/index";
import Card from "components/card/index";
import Header from "components/header/index";
import Cascader from "components/cascader/index";
import Checkbox from "components/checkbox/index";
import DatePicker from "components/datePicker/index";
import Divider from "components/divider/index";
import Drawer from "components/drawer/index";
import Dropdown from "components/dropdown/index";
import Form from "components/form/index";
import GroupButton from "components/groupButton/index";
import Icon from "components/icon/index";
import Input from "components/input/index";
import InputNumber from "components/inputNumber/index";
import Label from "components/label/index";
import Layout from "components/layout/index";
import Link from "components/link/index";
import Menu from "components/menu/index";
import Message, { success, warning, info, error, close as MessageClose, closeAll } from "components/message/index";
import MessageBox, { setDefaults, alert, confirm, prompt, close as MessageBoxClose } from "components/messageBox/index";
import Modal from "components/modal/index";
import Popover from "components/popover/index";
import Radio from "components/radio/index";
import Select from "components/select/index";
import Slider from "components/slider/index";
import Switch from "components/switch/index";
import Tab from "components/tab/index";
import Table from "components/table/index";
import Tooltip from "components/tooltip/index";
import Translate from "components/translate/index";
import TranslateDate from "components/translateDate/index";
import Tree from "components/tree/index";
import Upload from "components/upload/index";
import { Loading } from "element-ui";

const components = [
  Button,
  Card,
  Header,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Form,
  GroupButton,
  Icon,
  Input,
  InputNumber,
  Label,
  Layout,
  Menu,
  Modal,
  Popover,
  Radio,
  Select,
  Slider,
  Switch,
  Tab,
  Table,
  Tooltip,
  Translate,
  TranslateDate,
  Tree,
  Upload
];

const install = (Vue, option) => {
  const { register = true } = option || {};
  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  if (register) {
    components.forEach(component => {
      if (!component.name) throw new TypeError("element must have a name");
      Vue.component(component.name, component);
    });
  }
};

Message.success = success;
Message.warning = warning;
Message.info = info;
Message.error = error;
Message.close = MessageClose;
Message.closeAll = closeAll;
MessageBox.alert = alert;
MessageBox.setDefaults = setDefaults;
MessageBox.confirm = confirm;
MessageBox.prompt = prompt;
MessageBox.close = MessageBoxClose;

export {
  Button,
  Card,
  Header,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Form,
  GroupButton,
  Icon,
  Input,
  InputNumber,
  Label,
  Layout,
  Link,
  Menu,
  Message,
  MessageBox,
  Modal,
  Popover,
  Radio,
  Select,
  Slider,
  Switch,
  Tab,
  Table,
  Tooltip,
  Translate,
  TranslateDate,
  Tree,
  Upload
};

export default {
  install
};

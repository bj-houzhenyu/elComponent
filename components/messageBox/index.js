import { MessageBox as ElementMessageBox } from "element-ui";

export const setDefaults = defaults => {
  ElementMessageBox.defaults = defaults;
};

export const alert = (message, title, options) => {
  return ElementMessageBox.alert(message, title, options);
};

export const confirm = (message, title, options) => {
  return ElementMessageBox.confirm(message, title, options);
};

export const prompt = (message, title, options) => {
  return ElementMessageBox.prompt(message, title, options);
};

export const close = () => {
  return ElementMessageBox.close;
};

export default (options, callback) => {
  return ElementMessageBox(options, callback);
};

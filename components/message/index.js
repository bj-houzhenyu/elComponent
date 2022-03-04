import { Message as ELementMessage } from "element-ui";

export const success = options => {
  return ELementMessage.success(options);
};

export const warning = options => {
  return ELementMessage.warning(options);
};

export const info = options => {
  return ELementMessage.info(options);
};

export const error = options => {
  return ELementMessage.error(options);
};

export const close = function(id, userOnClose) {
  return ELementMessage.close(id, userOnClose);
};

export const closeAll = function() {
  return ELementMessage.closeAll();
};

export default arg => {
  ELementMessage(arg);
};

import { makeInstall } from "utils/install";
import Dropdown from "./Dropdown.vue";
import DropdownMenu from "./DropdownMenu.vue";
import DropdownItem from "./DropdownItem.vue";

Dropdown.DropdownMenu = DropdownMenu;
Dropdown.DropdownItem = DropdownItem;
Dropdown.install = makeInstall([Dropdown, DropdownMenu, DropdownItem]);

export default Dropdown;

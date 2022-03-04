import { makeInstall } from "utils/install";
import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";
import MenuItemGroup from "./MenuItemGroup.vue";
import MenuLoop from "./MenuLoop.vue";
import Submenu from "./Submenu.vue";

Menu.MenuItem = MenuItem;
Menu.MenuItemGroup = MenuItemGroup;
Menu.MenuLoop = MenuLoop;
Menu.Submenu = Submenu;
Menu.install = makeInstall([Menu, MenuItem, MenuItemGroup, MenuLoop, Submenu]);

export default Menu;

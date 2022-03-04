import { makeInstall } from "utils/install";
import Layout from "./Layout.vue";
import Container from "./Container.vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Main from "./Main.vue";
import Row from "./Row.vue";
import Col from "./Col.vue";

Layout.Container = Container;
Layout.Header = Header;
Layout.Aside = Aside;
Layout.Main = Main;
Layout.Row = Row;
Layout.Col = Col;
Layout.install = makeInstall([
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Layout
]);

export default Layout;

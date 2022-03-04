<template>
  <Container :class="layoutClass">
    <Header>
      <slot name="header"/>
    </Header>
    <Container class="ins-layout-content">
      <Aside :width="menuWidth">
        <slot name="aside"/>
      </Aside>
      <Main>
        <slot/>
      </Main>
    </Container>
  </Container>
</template>

<script>
import Container from "./Container.vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Main from "./Main.vue";
export default {
  name: "InsLayout",
  components: { Container, Header, Aside, Main },
  props: {
    direction: { type: String, default: "column" },
    fullScreen: { type: Boolean, default: true },
    menuWidth: { type: [String, Number], default: "200px" }
  },
  computed: {
    layoutClass() {
      return {
        "ins-layout": true,
        "flex-column": this.direction === "column",
        "full-screen": this.fullScreen
      };
    }
  }
};
</script>

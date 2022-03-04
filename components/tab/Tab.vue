<template>
  <Tabs ref="main" class="ins-tab" v-bind="$attrs" v-on="$listeners">
    <template v-for="(pane, index) in option">
      <TabPane :key="pane.code || index" v-bind="buildPaneProps(pane)">
        <component v-if="isComponent(pane)" :is="pane.content" :index="index" v-bind="buildComponentProps(pane)"/>
        <template v-else>{{pane.content}}</template>
      </TabPane>
    </template>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
import { isObject } from "@insgeek/util";
import { refs } from "utils/mixins";

export default {
  name: "InsTab",
  mixins: [refs],
  components: { Tabs, TabPane },
  props: {
    option: { type: Array, default: () => [] }
  },
  methods: {
    isComponent(pane) {
      return isObject(pane.component);
    },
    buildComponentProps(pane) {
      const { label, name, props } = pane;
      return { label, name, ...props };
    },
    buildPaneProps(pane) {
      const { label, disabled, name, closable, lazy } = pane;
      return { label, disabled, name, closable, lazy };
    }
  }
};
</script>

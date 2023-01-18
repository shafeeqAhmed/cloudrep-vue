<template>
  <li
    v-if="canViewVerticalNavMenuGroup(item)"
    class="nav-item has-sub"
    :class="{
      open: isOpen,
      disabled: item.disabled,
      'sidebar-group-active': isActive,
    }"
  >
    <b-link
      class="d-flex align-items-center text-white"
      @click="() => updateGroupOpen(!isOpen)"
    >
      <feather-icon :icon="item.icon || 'CircleIcon'" />
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <svg
        class="menu_drop_svg"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="10"
        role="presentation"
      >
        <path
          d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
        ></path>
      </svg>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
    <b-collapse
      v-model="isOpen"
      class="menu-content"
      tag="ul"
    >
      <component
        :is="resolveNavItemComponent(child)"
        v-for="child in item.children"
        :key="child.header || child.title"
        ref="groupChild"
        :item="child"
      />
    </b-collapse>
  </li>
</template>

<script>
import { BLink, BBadge, BCollapse } from "bootstrap-vue";
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@core/layouts/utils";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import { useUtils as useAclUtils } from "@core/libs/acl";
import VerticalNavMenuHeader from "../vertical-nav-menu-header";
import VerticalNavMenuLink from "../vertical-nav-menu-link/VerticalNavMenuLink.vue";

// Composition Function
import useVerticalNavMenuGroup from "./useVerticalNavMenuGroup";
import mixinVerticalNavMenuGroup from "./mixinVerticalNavMenuGroup";

export default {
  name: "VerticalNavMenuGroup",
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    BLink,
    BBadge,
    BCollapse,
  },
  mixins: [mixinVerticalNavMenuGroup],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isOpen, isActive, updateGroupOpen, updateIsActive } =
      useVerticalNavMenuGroup(props.item);

    const { t } = useI18nUtils();
    const { canViewVerticalNavMenuGroup } = useAclUtils();

    return {
      resolveNavItemComponent,
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuGroup,

      // i18n
      t,
    };
  },
};
</script>

<style></style>

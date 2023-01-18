export default [
  {
    path: "/assing-publisher",
    name: "standar-list",
    component: () =>
      import(
        "@/views/pages/client/campaign/creation/components/publishers/list/index.vue"
      ),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/standar-list",
    name: "standar-list",
    component: () => import("@/views/pages/standerModules/list/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/contact-center-drag",
    name: "contact-center-drag",
    component: () =>
      import("@/views/pages/contact-center/ContactCenterDrag.vue"),
    meta: {
      action: "all",
      resource: "agent",
    },
  },
  {
    path: "/transaction-section",
    name: "transaction-section",
    component: () =>
      import("@/views/pages/admin/transaction-invoice/invoice.vue"),
    meta: {
      action: "all",
      resource: "agent",
    },
  },
  {
    path: "/contact-center-drag",
    name: "contact-center-drag",
    component: () =>
      import("@/views/pages/contact-center/ContactCenterDrag.vue"),
    meta: {
      action: "all",
      resource: "agent",
    },
  },
  // {
  //   path: "/test-drag",
  //   name: "test-drag",
  //   component: () => import("@/views/pages/ivr/testDrag.vue"),
  //   meta: {
  //     action: "all",
  //     resource: "all",
  //   },
  // },
];

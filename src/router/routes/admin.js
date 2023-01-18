export default [
  {
    path: "/dashboard",
    name: "admin-dashboard",
    component: () => import("@/views/pages/admin/dashboard/index.vue"),
    meta: {
      pageTitle: "Admin Dashboard",
      breadcrumb: [
        {
          text: "Home",
          active: true,
        },
      ],
    },
  },
  {
    path: "/admin-user-management",
    name: "admin-user-management",
    component: () => import("@/views/pages/userManagement/UserList.vue"),
    // component: () => import('@/views/pages/userManagement/agent/AgentList'),
    meta: {
      pageTitle: "User Management",

      breadcrumb: [
        {
          text: "User Management List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/add-new-user",
    name: "add-new-user",
    component: () => import("@/views/pages/userManagement/createUser.vue"),
    // component: () => import('@/views/pages/userManagement/agent/AgentList'),
    meta: {
      pageTitle: "Add User",

      breadcrumb: [
        {
          text: "Add User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/staff-management/front-office",
    name: "staff-management-front-office",
    component: () => import("@/views/pages/staffManagement/FrontOffice.vue"),
    meta: {
      pageTitle: "Staff Management",
      breadcrumb: [
        {
          text: "Staff Management",
          to: "/staff-management-front-office",
        },
        {
          text: "Front Office",
          active: true,
        },
      ],
    },
  },
  {
    path: "/staff-management/middle-office",
    name: "staff-management-middle-office",
    component: () => import("@/views/pages/staffManagement/MiddleOffice.vue"),
    meta: {
      pageTitle: "Staff Management",
      breadcrumb: [
        {
          text: "Staff Management",
          to: "/staff-management-front-office",
        },
        {
          text: "Middle Office",
          active: true,
        },
      ],
    },
  },
  {
    path: "/staff-management/back-office",
    name: "staff-management-back-office",
    component: () => import("@/views/pages/staffManagement/BackOffice.vue"),
    meta: {
      pageTitle: "Staff Management",
      breadcrumb: [
        {
          text: "Staff Management",
          to: "/staff-management-back-office",
        },
        {
          text: "Back Office",
          active: true,
        },
      ],
    },
  },
  {
    path: "/financials",
    name: "financials",
    component: () => import("@/views/pages/financials/Financials.vue"),
    meta: {
      pageTitle: "Financials",
      breadcrumb: [
        {
          text: "Financials",
          active: true,
        },
      ],
    },
  },
  {
    path: "/accounting",
    name: "accounting",
    component: () => import("@/views/pages/accounting/Accounting.vue"),
    meta: {
      pageTitle: "Accounting",
      breadcrumb: [
        {
          text: "Accounting",
          active: true,
        },
      ],
    },
  },
  {
    path: "/create-course",
    name: "create-course",
    component: () => import("@/views/pages/lms/createCourse.vue"),
    meta: {
      pageTitle: "Create Course",
      breadcrumb: [
        {
          text: "Create Course",
          active: true,
        },
      ],
    },
  },
  {
    path: "/list-course",
    name: "list-course",
    component: () => import("@/views/pages/lms/CourseList.vue"),
    meta: {
      pageTitle: "Course List",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/drafted-course",
    name: "drafted-course",
    component: () => import("@/views/pages/lms/CourseDraftedList.vue"),
    meta: {
      pageTitle: "Drafted Course",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "drafted-course",
        },
        {
          text: "Drafted Course",
          active: true,
        },
      ],
    },
  },
  {
    path: "/new-lms-1",
    name: "new-lms-1",
    component: () => import("@/views/pages/lms/Index.vue"),
    meta: {
      pageTitle: "Course List",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/new-lms-2",
    name: "new-lms-2",
    component: () => import("@/views/pages/lms/IntendedLearner.vue"),
    meta: {
      pageTitle: "Course List",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/new-lms-3",
    component: () => import("@/views/pages/lms/Curriculum.vue"),
    meta: {
      pageTitle: "Course List",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/new-lms-4",
    name: "new-lms-4",
    component: () => import("@/views/pages/lms/pricing.vue"),
    meta: {
      pageTitle: "Course List",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          active: true,
        },
      ],
    },
  },
  {
    path: "/view-course/:uuid?",
    name: "view-course",
    component: () => import("@/views/pages/lms/CourseView.vue"),
    meta: {
      pageTitle: "Course View",
      breadcrumb: [
        {
          text: "LMS",
          toutes: "list-course",
        },
        {
          text: "Course List",
          toutes: "list-course",
        },
        {
          text: "Course View",
          active: true,
        },
      ],
    },
  },
  {
    path: "/success-campaign",
    name: "success-campaign",
    component: () =>
      import(
        "@/views/pages/client/campaign/creation/components/CampaignSuccessMessage.vue"
      ),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  {
    path: "/campaigns-complete",
    name: "campaign-list-complete",
    component: () =>
      import("@/views/pages/client/campaign/listing/completed/index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  {
    path: "/campaigns-draft",
    name: "campaign-list-draft",
    component: () =>
      import("@/views/pages/client/campaign/listing/drafted/index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  {
    path: "/campaigns-listing",
    name: "campaigns-listing",
    component: () =>
      import("@/views/pages/client/campaign/listing/campaign/Index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  // {
  //   path: "/campaign-air",
  //   name: "campaign-air",
  //   component: () =>
  //     import(
  //       "@/views/pages/client/campaign/creation/components/StepSevenNew.vue"
  //     ),
  //   meta: {
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  //campaign creation steps temporary routes
  // {
  //   path: "/campaign-creation",
  //   name: "campaign-creation",
  //   component: () => import("@/views/pages/client/campaign/creation/index.vue"),
  //   meta: {
  //     action: "all",
  //     resource: "client",
  //   },
  // },
  {
    path: "/campaign-creation",
    name: "campaign-creation",
    component: () => import("@/views/pages/client/campaign/creation/index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  {
    path: "/edit-campaign/:uuid",
    name: "edit-campaign",
    component: () => import("@/views/pages/client/campaign/creation/index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
  {
    path: "/ivr/manage",
    name: "ivr-manage",
    component: () => import("@/views/pages/ivr/list/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/ivr/create",
    name: "ivr-creation",
    component: () => import("@/views/pages/ivr/create/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/routings",
    name: "routings",
    component: () => import("@/views/pages/ivr/routing/list/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/routings-and-targets/:uuid",
    name: "routings-and-targets",
    component: () =>
      import("@/views/pages/ivr/routing/routingsAndTargets/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  //settings -> System Settings
  {
    path: "/settings/system-settings",
    name: "settings-system",
    component: () => import("@/views/pages/settings/systemSettings/index.vue"),
    meta: {
      pageTitle: "Settings",
      breadcrumb: [
        {
          text: "Settings",
          active: true,
        },
      ],
    },
  },
  {
    path: "/settings/services",
    name: "settings-services",
    component: () => import("@/views/pages/settings/services/index.vue"),
    meta: {
      pageTitle: "Services",
      breadcrumb: [
        {
          text: "Services",
          active: true,
        },
      ],
    },
  },
  {
    path: "/settings/file-upload",
    name: "settings-file-upload",
    component: () =>
      import("@/views/pages/settings/other/uploadFile/index.vue"),
    meta: {
      pageTitle: "file-upload",
      breadcrumb: [
        {
          text: "file-upload",
          active: true,
        },
      ],
    },
  },
  //settings -> Dropdwon
  {
    path: "/settings/dropdown",
    name: "settings-dropdown",
    component: () => import("@/views/pages/settings/dropdown/index.vue"),
    meta: {
      pageTitle: "Settings",
      breadcrumb: [
        {
          text: "Settings",
          active: true,
        },
      ],
    },
  },
  //settings -> Dropdwon ->Types
  {
    path: "/settings/type",
    name: "settings-type",
    component: () => import("@/views/pages/settings/type/index.vue"),
    meta: {
      pageTitle: "Settings",
      breadcrumb: [
        {
          text: "Settings",
          active: true,
        },
      ],
    },
  },
  {
    path: "/api-documentation",
    name: "api-documentation",
    component: () => import("@/views/pages/apiDocumentation/index.vue"),
    meta: {
      layout: "full",
      // action: 'all',
      // resource: 'all',
    },
  },
  // {
  //   path: "/control-panel",
  //   name: "control-panel",
  //   component: () => import("@/views/threeSample/components/ControlPanel.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  // {
  //   path: "/view-port",
  //   name: "view-port",
  //   component: () => import("@/views/threeSample/components/ViewPort.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  // {
  //   path: "/test-three",
  //   name: "test-three",
  //   component: () => import("@/views/threeSample/index.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  // {
  //   path: "/test-three-2",
  //   name: "test-three",
  //   component: () => import("@/views/threeSample/index2.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  // {
  //   path: "/test-three-3",
  //   name: "test-three",
  //   component: () => import("@/views/threeSample/index3.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },
  // {
  //   path: "/test-three-4",
  //   name: "test-three",
  //   component: () => import("@/views/threeSample/index4.vue"),
  //   meta: {
  //     layout: "full",
  //     action: "all",
  //     resource: "all",
  //   },
  // },

  {
    path: "/google-map",
    name: "google-map",
    component: () =>
      import("@/views/pages/client/campaign/creation/components/GoogleMap.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/e-signature",
    name: "e-signature",
    component: () => import("@/views/pages/admin/eSignature/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/test-signature",
    name: "test-signature",
    // component: () => import("@/views/pages/admin/eSignature/testSignature.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/create-contract",
    name: "create-contract",
    component: () => import("@/views/pages/contract/Create-Contract.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/create-template",
    name: "create-template",
    component: () => import("@/views/pages/contract/Create-Template.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/template",
    name: "template",
    component: () => import("@/views/pages/contract/Template.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/manage-number",
    name: "manage-number",
    component: () => import("@/views/pages/admin/number/list/index.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },

  {
    path: "/reporting-timeline",
    name: "reporting-timeline",
    component: () => import("@/views/pages/admin/reporting/index.vue"),
    meta: {
      pageTitle: "Reporting TimeLine",
      action: "all",
      resource: "all",
      breadcrumb: [
        {
          text: "Reporting TimeLine",
          active: true,
        },
      ],
    },
  },

  {
    path: "/trash-filter-report",
    name: "trash-filter-report",
    component: () =>
      import("@/views/pages/admin/reporting/filterReport/report.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/reporting-filter-report",
    name: "reporting-filter-report",
    component: () =>
      import("@/views/pages/admin/reporting/filterReport/report.vue"),
    meta: {
      pageTitle: "Reporting TimeLine",
      action: "all",
      resource: "all",
      breadcrumb: [
        {
          text: "Reporting TimeLine",
          active: true,
        },
      ],
    },
  },
  {
    path: "/reporting-performance",
    name: "reporting-performance",
    component: () =>
      import("@/views/pages/admin/reporting/chart/performance/index.vue"),
    meta: {
      pageTitle: "Reporting Performance",
      action: "all",
      resource: "all",
      breadcrumb: [
        {
          text: "Reporting Performance",
          active: true,
        },
      ],
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
];

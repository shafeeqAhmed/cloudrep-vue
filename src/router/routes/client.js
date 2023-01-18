export default [{
    path: '/dashboard',
    name: 'client-dashboard',
    component: () => import('@/views/pages/client/dashboard/index.vue'),
    meta: {
        pageTitle: 'Client',
        breadcrumb: [{
            text: 'Home',
            active: true,
        },],
        action: 'all',
        resource: 'client',
    },
},
{
    path: "/create-course",
    name: "create-course",
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/createCourse.vue"),
    meta: {
      pageTitle: "Create Course",
      action: "all",
      resource: "client",
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
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/CourseList.vue"),
    meta: {
      pageTitle: "Course List",
      action: "all",
      resource: "client",
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
    path: "/client/reporting-timeline",
    name: "client-reporting-timeline",
    component: () => import("@/views/pages/client/reporting/index.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },

  {
    path: "/client/reporting-performance",
    name: "client-reporting-performance",
    component: () => import("@/views/pages/client/reporting/chart/performance/index.vue"),
    meta: {
      meta: {
        action: "all",
        resource: "client",
      },
    },
  },
  {
    path: "/client/trash-filter-report",
    name: "client-trash-filter-report",
    component: () => import("@/views/pages/client/reporting/filterReport/report.vue"),
    meta: {
      action: "all",
      resource: "client",
    },
  },
 {
    path: "/client/reporting-filter-report",
    name: "client-reporting-filter-report",
    component: () => import("@/views/pages/client/reporting/filterReport/report.vue"),
    meta: {
      pageTitle: "Reporting TimeLine",
      action: "all",
      resource: "client",
      breadcrumb: [
        {
          text: "Reporting TimeLine",
          active: true,
        },
      ],
    },
  },
  {
    path: "/new-lms-1",
    name: "new-lms-1",
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/Index.vue"),
    meta: {
      pageTitle: "Course List",
      action: "all",
      resource: "client",
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
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/IntendedLearner.vue"),
    meta: {
      pageTitle: "Course List",
      action: "all",
      resource: "client",
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
    name: "new-lms-3",
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/Curriculum.vue"),
    meta: {
      pageTitle: "Course List",
      action: "all",
      resource: "client",
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
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/pricing.vue"),
    meta: {
      pageTitle: "Course List",
      action: "all",
      resource: "client",
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
    action: "all",
    resource: "client",
    component: () => import("@/views/pages/lms/CourseView.vue"),
    meta: {
      pageTitle: "Course View",
      action: "all",
      resource: "client",
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
    path: '/client-onboarding',
    name: 'client-onboarding',
    component: () => import('@/views/pages/client/onboarding/index.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        layout: 'full',

    },
},

{
    path: '/client/onboarding/services-required',
    name: 'services-required',
    component: () => import('@/views/pages/clientOnboarding/ServicesRequired.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        layout: 'full',

    },
},

{
    path: '/client/onboarding/business-information',
    name: 'business-information',
    component: () => import('@/views/pages/clientOnboarding/BusinessInformation.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        layout: 'full',

    },
},

{
    path: '/client/onboarding/select-category',
    name: 'select-category',
    component: () => import('@/views/pages/clientOnboarding/SelectCategory.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        layout: 'full',

    },
},
{
    path: '/client/activity',
    name: 'client-activity',
    component: () => import('@/views/pages/client/activity/Index.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        // layout: 'full',
    },
},
{
    path: '/client/security',
    name: 'client-security',
    component: () => import('@/views/pages/client/security/Index.vue'),
    meta: {
        action: 'all',
        resource: 'client',
        // layout: 'full',
    },
},
// {
//     path: '/client/wallet',
//     name: 'client-wallet',
//     component: () => import('@/views/pages/client/wallet/Index.vue'),
//     meta: {
//         action: 'all',
//         resource: 'client',
//         // layout: 'full',
//     },
// },
{
    path: '/client/setting',
    name: 'client-account-setting',
    component: () => import('@/views/pages/client/setting/Index.vue'),
    meta: {
        action: 'all',
        resource: 'client',
    },
},
{
    path: '/client/wallet/manage-card',
    name: 'manage-card',
    component: () => import('@/views/pages/client/wallet/components/ManageCard.vue'),
    meta: {
        action: 'all',
        resource: 'client',
    },
},
]
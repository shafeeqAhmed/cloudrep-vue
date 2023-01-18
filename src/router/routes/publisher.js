export default [
  {
    path: "/dashboard",
    name: "publisher-dashboard",
    component: () => import('@/views/pages/publisher/dashboard/index.vue'),
    meta: {
      pageTitle: "Publisher",
      breadcrumb: [
        {
          text: "Home",
          active: true,
        },
      ],
      action: "all",
      resource: "publisher",
    },
  },
  {
    path: "/publisher/onboarding/index",
    name: "publisher-onbaording-index",
    component: () => import("@/views/pages/publisherOnboarding/index.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/reporting-timeline",
    name: "publisher-reporting-timeline",
    component: () => import("@/views/pages/publisher/reporting/index.vue"),
    meta: {
      action: "all",
      resource: "publisher",
    },
  },
  {
    path: "/publisher/reporting-performance",
    name: "publisher-reporting-performance",
    component: () => import("@/views/pages/publisher/reporting/chart/performance/index.vue"),
    meta: {
      meta: {
        action: "all",
        resource: "publisher",
      },
    },
  },

  {
    path: "/activity",
    name: "publisher-activity",
    component: () => import("@/views/pages/publisher/activity/Index.vue"),
    meta: {
      action: "all",
      resource: "publisher",
    },
  },
  {
    path: "/security",
    name: "publisher-security",
    component: () => import("@/views/pages/publisher/security/Index.vue"),
    meta: {
      action: "all",
      resource: "publisher",
    },
  },
  {
    path: "/publisher-payout-setting",
    name: "publisher-payout-setting",
    component: () =>
      import(
        "@/views/pages/publisherOnboarding/components/PublisherPayoutSetting.vue"
      ),
    meta: {
      action: "all",
      resource: "all",
    },
  },

  {
    path: "/publisher/onboarding/company-site",
    name: "company-site",
    component: () =>
      import("@/views/pages/publisherOnboarding/components/CompanySite.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/trash-filter-report",
    name: "publisher-trash-filter-report",
    component: () => import("@/views/pages/publisher/reporting/filterReport/report.vue"),
    meta: {
      action: "all",
      resource: "publisher",
    },
  },
 {
    path: "/publisher/reporting-filter-report",
    name: "publisher-reporting-filter-report",
    component: () => import("@/views/pages/publisher/reporting/filterReport/report.vue"),
    meta: {
      pageTitle: "Reporting TimeLine",
      action: "all",
      resource: "publisher",
      breadcrumb: [
        {
          text: "Reporting TimeLine",
          active: true,
        },
      ],
    },
  },
  {
    path: "/publisher/onboarding/publisher-company-site",
    name: "publisher-company-site",
    component: () =>
      import(
        "@/views/pages/publisherOnboarding/components/PublisherCompanyWebsite.vue"
      ),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/onboarding/competator-site",
    name: "competator-site",
    component: () =>
      import("@/views/pages/publisherOnboarding/components/CompetatorSite.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/onboarding/competator-site-enter",
    name: "competator-site-enter",
    component: () =>
      import(
        "@/views/pages/publisherOnboarding/components/CompetatorSiteEnter.vue"
      ),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/onboarding/dashboard",
    name: "dashboard",
    component: () => import("@/views/pages/publisherOnboarding/Dashboard.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/onboarding/custom-dashboard",
    name: "custom-dashboard",
    component: () =>
      import("@/views/pages/publisherOnboarding/CustomDashboard.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/publisher/onboarding/publisher-widget",
    name: "publisher-widget",
    component: () =>
      import("@/views/pages/publisherOnboarding/PublisherWidget.vue"),
    meta: {
      action: "all",
      resource: "publisher",
      layout: "full",
    },
  },
  {
    path: "/manage-number",
    name: "manage-number",
    component: () => import("@/views/pages/admin/number/list/index.vue"),
    meta: {
      action: "all",
      resource: "publisher",
    },
  },
];

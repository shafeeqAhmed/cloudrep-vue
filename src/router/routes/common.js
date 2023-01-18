export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      layout: "full",
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/pre-registration",
    name: "pre-registration",
    component: () => import("@/views/preRegistration/index.vue"),
    meta: {
      layout: "full",
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/home-2",
    name: "home-2",
    component: () => import("@/views/DummyHomeCanvas.vue"),
    meta: {
      layout: "full",
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/home-3",
    name: "home-3",
    component: () => import("@/views/NewHome3.vue"),
    meta: {
      layout: "full",
      action: "all",
      resource: "all",
    },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/views/pages/auth/Login.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/register",
    name: "auth-register",
    component: () => import("@/views/pages/auth/AccountType.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/account-type",
    name: "auth-account-type",
    component: () => import("@/views/pages/auth/AccountType.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/account-basic-info",
    name: "auth-account-basic-info",
    component: () => import("@/views/pages/auth/BasicInfo.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/forgot-password",
    name: "auth-forgot-password",
    component: () => import("@/views/pages/auth/ForgotPassword.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },

  {
    path: "/set-2fa",
    name: "set-2fa",
    component: () => import("@/views/pages/auth/SetTwoFa.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/auth-2fa",
    name: "auth-2fa",
    component: () => import("@/views/pages/auth/TwoFa.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/verify-otp",
    name: "verify-otp",
    component: () => import("@/views/pages/auth/verifyOtp.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/reset",
    name: "auth-reset",
    component: () => import("@/views/pages/auth/Reset.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: false,
    },
  },
  {
    path: "/email-not-verified",
    name: "email-not-verified",
    component: () => import("@/views/pages/auth/EmailNotVerified.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/email/verify/:id/:hash",
    name: "verify-email",
    component: () => import("@/views/pages/auth/VerifyEmail.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/registration-completed",
    name: "registration-completed",
    component: () => import("@/views/pages/auth/RegistrationCompleted.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },

  {
    path: "/account-setting",
    name: "account-setting",
    component: () => import("@/views/pages/accountSetting/AccountSetting.vue"),
    meta: {
      action: "all",
      resource: "all",
    },
  },
  //==================================extra route list =========================================

  {
    path: "/university",
    name: "university",
    component: () => import("@/views/pages/university/University.vue"),
    meta: {
      action: "all",
      resource: "Auth",
    },
  },
  {
    path: "/university-courses-purchase/:uuid",
    name: "university-courses-purchase",
    component: () =>
      import("@/views/pages/university/UniversityCoursePurchase.vue"),
    meta: {
      action: "all",
      resource: "Auth",
    },
  },
  {
    path: "/university-courses-view",
    name: "university-courses-view",
    component: () =>
      import("@/views/pages/university/UniversityCoursesView.vue"),
    meta: {
      action: "all",
      resource: "Auth",
    },
  },
  {
    path: "/university-courses/:uuid",
    name: "university-courses",
    component: () => import("@/views/pages/university/UniversityCourses.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      pageTitle: "University",
      breadcrumb: [
        {
          text: "University",
          route: "university-courses",
        },
        {
          text: "Course Vew",
          active: true,
        },
      ],
    },
  },
  // {
  //     path: '/university-courses-purchase/:uuid',
  //     name: 'university-courses-purchase',
  //     component: () => import('@/views/pages/university/CoursePurchase.vue'),
  //     meta: {
  //         action: 'all',
  //         resource: 'Auth',
  //         pageTitle: 'University',
  //         breadcrumb: [
  //             {
  //                 text: 'University',
  //                 route: 'university-courses-purchase'
  //             },
  //             {
  //                 text: 'Course Purchase',
  //                 active: true
  //             },
  //         ],
  //     },
  // },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("@/views/pages/common/wallet/Index.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      // layout: 'full',
    },
  },
  {
    path: "/invoices-detail",
    name: "invoices-detail",
    component: () => import("@/views/pages/common/wallet/invoice/index.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      // layout: 'full',
    },
  },
  {
    path: "/university-courses-questions/:category/:slug",
    name: "university-courses-questions",
    component: () =>
      import("@/views/pages/university/UniversityCourseQuestions.vue"),
    meta: {
      action: "all",
      resource: "Auth",
    },
  },
  {
    path: "/course-invoice",
    name: "course-invoice",
    component: () =>
      import("@/views/pages/university/course/CourseInvoice.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      // layout: 'full',
    },
  },
  {
    path: "/course-invoice-view/:uuid?",
    name: "course-invoice-view",
    component: () =>
      import("@/views/pages/university/course/CourseInvoiceView.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      // layout: 'full',
    },
  },
  {
    path: "/transaction-view/:uuid?",
    name: "transaction-view",
    component: () =>
      import("@/views/pages/common/wallet/invoice/components/preview.vue"),
    meta: {
      action: "all",
      resource: "Auth",
      // layout: 'full',
    },
  },
  // {
  //     path: '/university-course-quiz',
  //     name: 'university-course-quiz',
  //     component: () => import('@/views/pages/university/UniversityCourseQuiz.vue'),
  //     meta: {
  //         action: 'all',
  //         resource: 'Auth',
  //     },
  // },

  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      action: "read",
    },
  },
  {
    path: "/not-authorized",
    name: "misc-not-authorized",
    component: () => import("@/views/miscellaneous/NotAuthorized.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  // {
  //   path: "/spline-page",
  //   name: "spline-page",
  //   component: () => import("@/views/spline/index.vue"),
  //   meta: {
  //     layout: "full",
  //     resource: "Auth",
  //   },
  // },
  // {
  //   path: "/spline-page",
  //   name: "spline-page",
  //   component: () => import("@/views/spline/index.vue"),
  //   meta: {
  //     layout: "full",
  //     resource: "Auth",
  //   },
  // },
  {
    path: "/take-quiz/:uuid?",
    name: "take-quiz",
    component: () => import("@/views/pages/university/quiz/takeQuiz.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/web3-token-project",
    name: "web3-token-project",
    component: () => import("@/views/pages/web3TokenProject/Index.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/deployed-contracts",
    name: "deployed-contracts",
    component: () =>
      import("@/views/pages/web3TokenProject/DeployedContracts.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/deployed-contracts-token",
    name: "deployed-contracts-token",
    component: () =>
      import("@/views/pages/web3TokenProject/DeployedContractsEdit.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/nft-token-view",
    name: "nft-token-view",
    component: () => import("@/views/pages/web3TokenProject/NFTTokenView.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/erc-20-token",
    name: "erc-20-token",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-1.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/erc-20-airlocktoken",
    name: "erc-20-airlocktoken",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-2.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/erc-721-forstorefront",
    name: "erc-721-forstorefront",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-3.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/simple-erc-721-contract",
    name: "simple-erc-721-contract",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-4.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/erc-721-airlock-nft",
    name: "erc-721-airlock-nft",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-5.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/simple-erc-1155-collection",
    name: "simple-erc-1155-collection",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-6.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/simple-erc-1155-airlock-token",
    name: "simple-erc-1155-airlock-token",
    component: () =>
      import("@/views/pages/web3TokenProject/Tokens/Token-7.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
  {
    path: "/make-call",
    name: "make-call",
    component: () => import("@/views/pages/contact-center/makeCall/index.vue"),
    meta: {
      action: "all",
      resource: "all",
      layout: "full",
    },
  },
];

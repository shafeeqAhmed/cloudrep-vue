export default [
    {
        path: '/dashboard',
        name: 'agent-dashboard',
        component: () => import('@/views/pages/agent/Agent.vue'),
        meta: {
            pageTitle: 'Agent',
            breadcrumb: [
                {
                    text: 'Home',
                    active: true,
                },
            ],
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/contact-center',
        name: 'contact-center',
        component: () => import('@/views/pages/contact-center/ContactCenter.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },

    {
        path: '/user-contact-center',
        name: 'user-contact-center',
        component: () => import('@/views/pages/contact-center/UserContact.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/leaderboard-support',
        name: 'leaderboard-support',
        component: () => import('@/views/pages/contact-center/LeaderBoard/SupportAgents.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/leaderboard-sales',
        name: 'leaderboard-sales',
        component: () => import('@/views/pages/contact-center/LeaderBoard/SalesAgents.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/call-logs',
        name: 'call-logs',
        component: () => import('@/views/pages/contact-center/CallLog.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    
    {
        path: '/voice-mail',
        name: 'voice-mail',
        component: () => import('@/views/pages/contact-center/VoiceMail.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/contact-center-dashboard',
        name: 'contact-center-dashboard',
        component: () => import('@/views/pages/contact-center/Index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: () => import('@/views/pages/wallet/Wallet.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/agent/wallet',
        name: 'wallet',
        component: () => import('@/views/pages/agent/wallet/Index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    // {
    //     path: '/agent/wallet/payment-request',
    //     name: 'payment-request',
    //     component: () => import('@/views/pages/agent/wallet/components/PaymentRequest.vue'),
    //     meta: {
    //         action: 'all',
    //         resource: 'agent',
    //     },
    // },
    {
        path: '/manage-digital-wallet',
        name: 'manage-digital-wallet',
        component: () => import('@/views/pages/agent/wallet/listing/ManageDigitalWallet.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/manage-card',
        name: 'manage-card',
        component: () => import('@/views/pages/agent/wallet/listing/ManageCard.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/university',
        name: 'university',
        component: () => import('@/views/pages/university/University.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    // {
    //     path: '/course-invoice',
    //     name: 'course-invoice',
    //     component: () => import('@/views/pages/university/course/CourseInvoice.vue'),
    //     meta: {
    //         action: 'all',
    //         resource: 'agent',
    //         // layout: 'full',
    //     },
    // },
    // {
    //     path: '/course-invoice-view/:uuid?',
    //     name: 'course-invoice-view',
    //     component: () => import('@/views/pages/university/course/CourseInvoiceView.vue'),
    //     meta: {
    //         action: 'all',
    //         resource: 'agent',
    //         // layout: 'full',
    //     },
    // },
    {
        path: '/university-courses-purchase/:uuid',
        name: 'university-courses-purchase',
        component: () => import('@/views/pages/university/UniversityCoursePurchase.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/university-courses-view',
        name: 'university-courses-view',
        component: () => import('@/views/pages/university/UniversityCoursesView.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/university-courses/:uuid',
        name: 'university-courses',
        component: () => import('@/views/pages/university/UniversityCourses.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
            pageTitle: 'University',
            breadcrumb: [
                {
                    text: 'University',
                    route: 'university-courses'
                },
                {
                    text: 'Course Vew',
                    active: true
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
    //         resource: 'agent',
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
        path: '/university-courses-questions/:category/:slug',
        name: 'university-courses-questions',
        component: () => import('@/views/pages/university/UniversityCourseQuestions.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    // {
    //     path: '/university-course-quiz',
    //     name: 'university-course-quiz',
    //     component: () => import('@/views/pages/university/UniversityCourseQuiz.vue'),
    //     meta: {
    //         action: 'all',
    //         resource: 'agent',
    //     },
    // },
    {
        path: '/activity',
        name: 'agent-activity',
        component: () => import('@/views/pages/agent/activity/Index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/security',
        name: 'agent-security',
        component: () => import('@/views/pages/agent/security/Index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/schedules',
        name: 'agent-schedules',
        component: () => import('@/views/pages/agent/schedules/Index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
        },
    },
    {
        path: '/agent-onboarding',
        name: 'agent-onboarding',
        component: () => import('@/views/pages/agent/onboarding/index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
            layout: 'full',
        },
    },
    {
        path: '/offer-wall',
        name: 'offer-wall',
        component: () => import('@/views/pages/common/offerWall/OfferWallListing.vue'),
        meta: {
            action: 'all',
            resource: 'all', //agent
        },
    },
    {
        path: '/offer-wall-view/:uuid?',
        name: 'offer-wall-view',
        component: () => import('@/views/pages/common/offerWall/OfferWallView.vue'),
        meta: {
            action: 'all',
            resource: 'all', //agent
        },
    },
    {

        path: '/agent-onboarding/trafic-source',
        name: 'agent-onboarding-steps',
        component: () => import('@/views/pages/agent/onboarding/index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',
            layout: 'full',
        },
    },
    {

        path: '/agent-payout-settings',
        name: 'agent-payout-settings',
        component: () => import('@/views/pages/agent/payout/index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',

        },
    },
    {

        path: '/agent-payout-settings',
        name: 'agent-payout-settings',
        component: () => import('@/views/pages/agent/payout/index.vue'),
        meta: {
            action: 'all',
            resource: 'agent',

        },
    },
    {
        path: "/inbox",
        name: "inbox",
        component: () => import("@/views/pages/agent/contract/Inbox.vue"),
        meta: {
          action: "all",
          resource: "all",
        },
      },
    
]

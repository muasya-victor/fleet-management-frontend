import { createRouter, createWebHistory } from "vue-router";
import FleetHealth from "@/pages/fleet/FleetHealth.vue";
import Notifications from "@/pages/notifications/Notifications.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import Registration from "@/pages/auth/Registration.vue";


const routes = [
    {
        name:'home',
        path:'/home',
        component: FleetHealth
    },
    {
        name:'notifications',
        path:'/notifications',
        component: Notifications
    },
    {
        name:'login',
        path:'/',
        component: LoginPage
    },
    {
        name:'register',
        path:'/register',
        component: Registration
    },
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.VITE_NODE_ENV === "production"
            ? import.meta.env.VITE_VUE_APP_SUB_ROUTE
                ? import.meta.env.VITE_VUE_APP_SUB_ROUTE
                : import.meta.env.VITE_BASE_URL
            : import.meta.env.VITE_BASE_URL
    ),
    linkExactActiveClass: "active",
    routes,
});

export default router;
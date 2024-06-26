import { createRouter, createWebHistory } from "vue-router";
import FleetHealth from "@/pages/fleet/FleetHealth.vue";
import Notifications from "@/pages/notifications/Notifications.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import Registration from "@/pages/auth/Registration.vue";
import Index from "../pages/fleet/components/Index.vue";
import AddVehicleWraper from "../pages/fleet/AddVehicleWraper.vue";
import AddVehicleDialog from "../components/AddVehicleDialog.vue";
import UserProfile from "../pages/auth/UserProfile.vue";


const routes = [
    {
        name:'home',
        path:'/home',
        component: FleetHealth,
        children : [
            {
                name:'new-vehicle',
                path:'new-vehicle',
                component: AddVehicleDialog
            },
            {
                name:'editVehiclePart',
                path:'edit/:partId',
                component: Index
            },
        ]
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
    {
        name:'profile',
        path:'/profile',
        component: UserProfile
    },

    {
        name:'addVehicle',
        path:'/add-vehicle',
        component: AddVehicleWraper
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
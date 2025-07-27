import Congrate from "../pages/auction/Congrate.vue";
import Live from "../pages/auction/Live.vue";

export default [
    {
        path: '/live',
        component: Live,
    },
    {
        path: '/live/:id',
        component: Congrate,
    }
];
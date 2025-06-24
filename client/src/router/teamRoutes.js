import TeamCreate from "../pages/admin/team/TeamCreate.vue";
import TeamList from "../pages/admin/team/TeamList.vue";

export default [
    {
        path: "/teams",
        component: TeamList,
    },
    {
        path: "/teams/create",
        component: TeamCreate,
    }
];
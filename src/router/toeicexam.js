var routes = {
    path: "/toeicexam/:id",
    component: () => import("@/views/TOEICExam/Part1/Part1Intro.vue"),
    children: [
        {
            path: 'def',
            component: () => import("@/views/TOEICExam/Part1")
        }

    ]
}
export default routes;
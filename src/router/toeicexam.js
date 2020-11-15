var routes = {
    path: "/toeicexam/:id",
    component: () => import("@/views/TOEICExam/Intro.vue"),
    children: [
        {
            path: '',
            component: () => import("@/views/TOEICExam/Instruction.vue"),
        },
        {
            path: 'part1-intro',
            component: () => import("@/views/TOEICExam/Part1/Part1Intro.vue")
        },
        {
            path: 'part1-detail',
            component: () => import("@/views/TOEICExam/Part1")
        }

    ]
}
export default routes;
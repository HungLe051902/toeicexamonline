var routes = {
    path: "/toeicexam/:id",
    component: () => import("@/views/TOEICExam/Intro.vue"),
    children: [
        {
            path: '',
            component: () => import("@/views/TOEICExam/Instruction.vue"),
        },
        {
            path: 'part1-instruction',
            component: () => import("@/views/TOEICExam/Part1/Part1Instruction.vue")
        },
        {
            path: 'part1-detail',
            component: () => import("@/views/TOEICExam/Part1")
        },
        {
            path: 'part2-instruction',
            component: () => import("@/views/TOEICExam/Part2/Part2Instruction.vue")
        },
        {
            path: 'part2-detail',
            component: () => import("@/views/TOEICExam/Part2")
        }

    ]
}
export default routes;
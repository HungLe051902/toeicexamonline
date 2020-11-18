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
        },
        {
            path: 'part3-instruction',
            component: () => import("@/views/TOEICExam/Part3/Part3Instruction.vue")
        },
        {
            path: 'part3-detail',
            component: () => import("@/views/TOEICExam/Part3")
        },
        {
            path: 'part4-instruction',
            component: () => import("@/views/TOEICExam/Part4/Part4Instruction.vue")
        },
        {
            path: 'part4-detail',
            component: () => import("@/views/TOEICExam/Part4")
        },
        {
            path: 'part5-instruction',
            component: () => import("@/views/TOEICExam/Part5/Part5Instruction.vue")
        },
        {
            path: 'part5-detail',
            component: () => import("@/views/TOEICExam/Part5")
        }

    ]
}
export default routes;
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
            component: () => import("@/views/TOEICExam/Part1/Part1Instruction.vue"),
        },
        {
            path: 'part1-detail',
            component: () => import("@/views/TOEICExam/Part1"),
            meta: {partCode: 'part1'}
        },
        {
            path: 'part2-instruction',
            component: () => import("@/views/TOEICExam/Part2/Part2Instruction.vue"),
            meta: {partCode: 'part2'}
        },
        {
            path: 'part2-detail',
            component: () => import("@/views/TOEICExam/Part2"),
            meta: {partCode: 'part2'}
        },
        {
            path: 'part3-instruction',
            component: () => import("@/views/TOEICExam/Part3/Part3Instruction.vue"),
            meta: {partCode: 'part3'}
        },
        {
            path: 'part3-detail',
            component: () => import("@/views/TOEICExam/Part3"),
            meta: {partCode: 'part3'}
        },
        {
            path: 'part4-instruction',
            component: () => import("@/views/TOEICExam/Part4/Part4Instruction.vue"),
            meta: {partCode: 'part4'}
        },
        {
            path: 'part4-detail',
            component: () => import("@/views/TOEICExam/Part4"),
            meta: {partCode: 'part4'}
        },
        {
            path: 'part5-instruction',
            component: () => import("@/views/TOEICExam/Part5/Part5Instruction.vue"),
            meta: {partCode: 'part5'}
        },
        {
            path: 'part5-detail',
            component: () => import("@/views/TOEICExam/Part5"),
            meta: {partCode: 'part5'}
        },
        {
            path: 'part6-instruction',
            component: () => import("@/views/TOEICExam/Part6/Part6Instruction.vue"),
            meta: {partCode: 'part6'}
        },
        {
            path: 'part6-detail',
            component: () => import("@/views/TOEICExam/Part6"),
            meta: {partCode: 'part6'}
        },
        {
            path: 'part7-instruction',
            component: () => import("@/views/TOEICExam/Part7/Part7Instruction.vue"),
            meta: {partCode: 'part7'}
        },
        {
            path: 'part7-detail',
            component: () => import("@/views/TOEICExam/Part7"),
            meta: {partCode: 'part7'}
        }

    ]
}
export default routes;
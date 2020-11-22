import ToeicExamService from "@/services/toeicExamService.js";
const toeicexam = {
    namespaced: true,
    state: () => ({
        headerTitle: "TOEICExamOnline.pg",
        part1Data: [],
        part2Data: [],
        part3Data: [],
        part4Data: [],
        part5Data: [],
        part6Data: [],
        part7Data: [],
    }),
    mutations: {
        setHeaderTitle(state, val) {
            try {
                state.headerTitle = val;
            } catch (e) {
                console.log(e);
            }
        }
    },
    actions: {
        async getQuestionByPart({ state }, obj) {
            try {
                var res = null;
                switch (obj.part) {
                    case "PART_1":
                        res = await ToeicExamService.getQuestionPart1ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_2":
                        res = await ToeicExamService.getQuestionPart2ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_3":
                        res = await ToeicExamService.getQuestionPart3ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_4":
                        res = await ToeicExamService.getQuestionPart4ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_5":
                        res = await ToeicExamService.getQuestionPart5ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_6":
                        res = await ToeicExamService.getQuestionPart6ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                    case "PART_7":
                        res = await ToeicExamService.getQuestionPart7ByYearAndExamNo(
                            obj?.year,
                            obj?.examNo
                        );
                        break;
                }
                if (res && res.data.APPCode) {
                    if (obj.part == "PART_1"){
                        state.part1Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_2"){
                        state.part2Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_3"){
                        state.part3Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_4"){
                        state.part4Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_5"){
                        state.part5Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_6"){
                        state.part6Data = res.data.Data;
                            return true;
                    }
                    else if (obj.part == "PART_7"){
                        state.part7Data = res.data.Data;
                            return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        getHeaderTitle: state => {
            return state.headerTitle;
        },
        getPart1Data: state => {
            return state.part1Data
        },
        getPart2Data: state => {
            return state.part2Data
        },
        getPart3Data: state => {
            return state.part3Data
        },
        getPart4Data: state => {
            return state.part4Data
        },
        getPart5Data: state => {
            return state.part5Data
        },
        getPart6Data: state => {
            return state.part6Data
        },
        getPart7Data: state => {
            return state.part7Data
        },
    }
}
export default toeicexam;

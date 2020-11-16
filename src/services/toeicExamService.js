import axios from 'axios';
// const baseURL = "http://toeicexamonline.gq/api";
const baseURL = process.env.VUE_APP_BASE_URL_LOGIN
export default {
    // Lấy danh sách các đề thi
    async getListExam() {
        try {
            return await axios.get(`${baseURL}/ToeicExam/exam`);
        } catch (error) {
            console.log(error);
        }
    },
    async getQuestionPart1ByYearAndExamNo(year, examNo) {
        try {
            return await axios.get(`${baseURL}/ToeicExam/exam/par1?year=${year}&examNo=${examNo}`);
        } catch (e) {
            console.log(e);
        }
    }
}
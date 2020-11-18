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
    // Lấy các câu hỏi part1
    async getQuestionPart1ByYearAndExamNo(year, examNo) {
        try {
            return await axios.get(`${baseURL}/ToeicExam/exam/part1?year=${year}&examNo=${examNo}`);
        } catch (e) {
            console.log(e);
        }
    },
    // Lấy các câu hỏi part2
    async getQuestionPart2ByYearAndExamNo(year, examNo) {
        try {
            return await axios.get(`${baseURL}/ToeicExam/exam/part2?year=${year}&examNo=${examNo}`);
        } catch (e) {
            console.log(e);
        }
    },
    // Lấy các câu hỏi part3
    async getQuestionPart3ByYearAndExamNo(year, examNo) {
        try {
            return await axios.get(`${baseURL}/ToeicExam/exam/part3?year=${year}&examNo=${examNo}`);
        } catch (e) {
            console.log(e);
        }
    }
}
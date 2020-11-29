<template>
  <div id="toeic-exam">
    <div class="header"></div>
    <div class="main-content pb-4">
      <div class="intro w-100 p-4">
        <div class="d-flex align-items-center">
          <img
            v-on:click="backToHome"
            class="icon-back"
            src="@/assets/icons/back-arrow.png"
            alt=""
          />
          <h2 class="ml-2 mb-0">Thi TOEIC trực tuyến miễn phí</h2>
        </div>
        <p class="p-2 wrap text-left">
          TOEIC là một chứng chỉ được sử dụng phổ biến nhằm đánh giá trình độ sử
          dụng tiếng Anh trong môi trường giao tiếp quốc tế. Ở Việt Nam, chứng
          chỉ TOEIC là một trong những tiêu chuẩn phổ biến để đánh giá trình độ
          thông thạo tiếng Anh của người lao động được nhiều doanh nghiệp, tổ
          chức lựa chọn. Ngoài ra, TOEIC còn là chuẩn đầu ra tiếng Anh của nhiều
          trường đại học cho sinh viên khi tốt nghiệp. Bài thi toeic gồm 2 phần
          là phần đọc và phần nghe. Để giúp các bạn có mong muốn thi toeic có
          thể làm quen với đề thi trước khi thi thật. Nhóm chúng em có ý định
          xây dựng web thi thử toeic online. Các đề thi làm trên web đều được
          chấm điểm và có đáp án chi tiết để giúp các bạn có thể đánh giá chính
          xác nhất trình độ hiện tại của mình và có thể đưa ra kế hoạch luyện
          thi và học tập phù hợp.
        </p>
      </div>
      <div class="container list-exam">
        <h5 class="text-left">
          <b>Danh sách đề thi thử TOEIC trực tuyến</b>
        </h5>
        <div class="row" v-loading="isLoading">
          <div class="col-6">
            <label class="m-0 p-2 w-100 text-left" for=""
              ><b>ETS TOEIC 2020</b></label
            >
            <template v-if="listExam2020.length > 0">
              <div v-for="item in listExam2020" :key="item.ExamID">
                <div class="exam" v-on:click="goToIntroExam(item)">
                  {{ item.ExamName }} - ETS 2020
                </div>
              </div>
            </template>
            <template v-else>
              <div class="p-5">Không có dữ liệu</div>
            </template>
          </div>
          <div class="col-6">
            <label class="m-0 p-2 w-100 text-left" for=""
              ><b>ETS TOEIC 2019</b></label
            >
            <template v-if="listExam2019.length > 0">
              <div v-for="item in listExam2019" :key="item.ExamID">
                <div class="exam" v-on:click="goToIntroExam(item)">
                  {{ item.ExamName }} - ETS 2019
                </div>
              </div>
            </template>
            <template v-else>
              <div class="p-5">Không có dữ liệu</div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="footer-content container p-3">
        <div class="row">
          <div class="col-6">
            <p class="mb-0">FOOTER CONTENT</p>
            <p class="mb-0 text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              doloremque quasi reprehenderit earum nisi a obcaecati asperiores,
              eos suscipit officiis veniam nostrum illo excepturi accusantium
              quidem eius cumque assumenda id.
            </p>
          </div>
          <div class="col-3">
            LINKS
            <ul class="list-unstyled">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
          <div class="col-3">
            LINKS
            <ul class="list-unstyled">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div
          class="h-100 align-items-center d-flex justify-content-center text-light"
        >
          © 2020 Copyright: LEXUANHUNG
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ToeicExamService from "@/services/toeicExamService.js";
export default {
  data() {
    return {
      isLoading: false,
      listExam2020: [],
      listExam2019: [],
      listExamData: [],
    };
  },
  methods: {
    /**
    Hàm thực hiện điều hướng về trang chủ
    Author: LXHUNG(29/11/2020)
     */
    backToHome() {
      try {
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
    // Đi tới màn hình giới thiệu đề thi
    goToIntroExam(exam) {
      try {
        // Xóa hết thông tin trong localStorage
        localStorage.clear();
        // Lưu trạng thái trước khi làm bài
        localStorage.setItem("state", "beforeDoing");
        // Lưu thông tin đề được chọn
        localStorage.setItem("selected-exam", JSON.stringify(exam));
        this.$router.push(`/toeicexam/${exam.ExamID}`);
        // this.$router.push(`/toeicexam/introduction`);
      } catch (e) {
        console.log(e);
      }
    },
  },
  props: {},
  async created() {
    // Gọi service lấy danh sách các đề thi
    this.isLoading = true;
    var res = await ToeicExamService.getListExam();
    if (res) {
      this.isLoading = false;
      if (res.data.APPCode == 200) {
        this.listExamData = res.data.Data;

        this.listExam2019 = this.listExamData.filter((ele) => ele.Year == 2019);
        this.listExam2020 = this.listExamData.filter((ele) => ele.Year == 2020);
      } else {
        this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } else {
      this.isLoading = false;
      this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  },
};
</script>

<style lang="scss" scoped>
#toeic-exam {
  height: 100vh;
  .main-content {
    min-height: calc(100vh - 200px);
    .list-exam {
      .col-6 {
        border: 1px solid gray;
        padding: 0;
        label {
          background-color: #1864a3;
          color: #ffffff;
        }
        .exam {
          text-align: left;
          padding: 8px;
          border-top: 1px solid gray;
          color: #588bae;
          &:hover {
            background-color: #4682b4;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
    }
    .icon-back {
      width: 32px;
      height: 32px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  #footer {
    height: 200px;
    width: 100%;
    background-color: #4682b4;
    position: relative;
    bottom: 0;
    .footer-content {
      color: #ffffff;
    }
    .footer-copyright {
      position: absolute;
      width: 100%;
      height: 50px;
      bottom: 0;
      left: 0;
      background-color: #1864a3;
      text-align: center;
    }
  }
}
</style>
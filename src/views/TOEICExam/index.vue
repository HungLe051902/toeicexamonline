<template>
  <div id="toeic-exam">
    <div class="header"></div>
    <div class="main-content mb-4">
      <div class="intro w-100 p-4">
        <h2>Thi TOEIC trực tuyến miễn phí</h2>
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
        <h5 class="text-left"><b>Danh sách đề thi thử TOEIC trực tuyến</b></h5>
        <div class="row">
          <div class="col-6">
            <label class="m-0 p-2 w-100 text-left" for=""
              ><b>ETS TOEIC 2020</b></label
            >
            <div v-for="(item, index) in listExam2020" :key="index">
              <div class="exam">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="m-0 p-2 w-100 text-left" for=""
              ><b>ETS TOEIC 2019</b></label
            >
            <div v-for="(item, index) in listExam2019" :key="index">
              <div class="exam">
                {{ item.name }}
              </div>
            </div>
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
export default {
  watch: {},
  data() {
    return {
      listExam2020: [
        {
          name: "Đề số 1 - ETS 2020",
        },
        {
          name: "Đề số 2 - ETS 2020",
        },
        {
          name: "Đề số 3 - ETS 2020",
        },
        {
          name: "Đề số 4 - ETS 2020",
        },
        {
          name: "Đề số 5 - ETS 2020",
        },
        {
          name: "Đề số 6 - ETS 2020",
        },
        {
          name: "Đề số 7 - ETS 2020",
        },
        {
          name: "Đề số 8 - ETS 2020",
        },
        {
          name: "Đề số 9 - ETS 2020",
        },
        {
          name: "Đề số 10 - ETS 2020",
        },
      ],
      listExam2019: [
        {
          name: "Đề số 1 - ETS 2019",
        },
        {
          name: "Đề số 2 - ETS 2019",
        },
        {
          name: "Đề số 3 - ETS 2020",
        },
        {
          name: "Đề số 4 - ETS 2019",
        },
        {
          name: "Đề số 5 - ETS 2019",
        },
        {
          name: "Đề số 6 - ETS 2019",
        },
        {
          name: "Đề số 7 - ETS 2019",
        },
        {
          name: "Đề số 8 - ETS 2019",
        },
        {
          name: "Đề số 9 - ETS 2019",
        },
        {
          name: "Đề số 10 - ETS 2019",
        },
      ],
    };
  },
  methods: {},
  props: {},
  created() {},
};
</script>

<style lang="scss" scoped>
#toeic-exam {
  // .header{
  //   background: url("../assets/img/logo-toeic.jpg");
  //   background-repeat: no-repeat;
  //   background-size: 300px 100px;
  // }
  .main-content {
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
  }
  #footer {
    height: 200px;
    width: 100vw;
    background-color: #4682b4;
    position: relative;
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
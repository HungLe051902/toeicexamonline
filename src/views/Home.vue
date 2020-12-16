<template>
  <div class="home p-4">
    <h1>Đây là trang chủ</h1>
    <button v-if="currentRole == 'ADMIN'" type="button" class="btn btn-primary mb-3">
      Tạo bài viết
    </button>
    <button
      v-else-if="currentRole == 'USER'"
      type="button"
      class="btn btn-primary mb-3"
    >
      Xem bài viết
    </button>
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      tag-name="textarea"
    ></ckeditor>
  </div>
</template>

<script>
import AuthenticationEnum from "@/enums/AuthenticationEnum";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
ClassicEditor.create(document.querySelector("#editor"), {
  // plugins: [EasyImage],
  // toolbar: ["imageUpload"],
  cloudServices: {
    tokenUrl: "https://example.com/cs-token-endpoint",
    uploadUrl: "https://your-organization-id.cke-cs.com/easyimage/upload/",
  },
})
  .then()
  .catch();
export default {
  name: "Home",
  computed: {
    currentRole() {
      if (sessionStorage.getItem("token")) {
        return this.parseJwt(sessionStorage.getItem("token"))[
          AuthenticationEnum.ROLE
        ];
      } else return "";
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
};
</script>

<template>
  <div class="home p-4">
    <h1>Đây là trang chủ</h1>
    <button v-if="currentRole == 'ADMIN'" type="button" class="btn btn-primary">
      Tạo bài viết
    </button>
    <button
      v-else-if="currentRole == 'USER'"
      type="button"
      class="btn btn-primary"
    >
      Xem bài viết
    </button>
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      tag-name="textarea"
    ></ckeditor>
    {{editorData}}
  </div>
</template>

<script>
import AuthenticationEnum from "@/enums/AuthenticationEnum";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

<script>
import $ from "jquery";
export default {
    created(){
        // Scroll lên đầu trang khi tải lại hoặc điều hướng về trang
        $("#exam-section").animate({ scrollTop: 0 }, "slow");
    }
}
</script>
<template>
<div>
    <div class="header">
        <div class="topbar d-flex justify-content-between align-items-center">
            <div class="topbar-left">
                <h1>Thi thử TOEIC Online miễn phí</h1>
            </div>
            <div class="topbar-right">
                <button type="button" class="btn btn-light">Đăng ký</button>
                <button type="button" class="btn btn-primary ml-3">Đăng nhập</button>
            </div>
        </div>
    </div>
    <div class="content">
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
    </div>
    <div class="footer"></div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    name: "Main",
    methods: {
        goToAbout() {
            // this.$router.push("/about");
            console.log($("#abcdef"))
        }
    },
};
</script>

<style lang="scss" scoped>
.topbar {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 0 24px;
    background-color: #F0F0F0;
}
</style>

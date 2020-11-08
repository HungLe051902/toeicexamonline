<template>
    <!-- The Modal -->
  <div class="modal fade" :id="divID">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <slot name="popup-body">
            popup body body
          </slot>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
            <slot name="popup-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
            </slot>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function(){
        return {

        };
    },
    props: {
        divID: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "Tiêu đề"
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.modal-content{
    text-align: left;
}
</style>

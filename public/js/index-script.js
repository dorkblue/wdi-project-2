$(document).ready(function() {
  $('#remove-item').click(function() {
    console.log('clicked here!');
    swal({
          title: "Wait!",
          text: "Are you sure you want to delete this item?",
          type: "warning",
        }, function(){
            new Audio('/public/sound/goatscream.mp3').play()
          }
        );
  })
})

$(function(){
  function buildHTML(message){
    var image = message.image_url ? `<img src="${message.image_url}">` : '';

    var html = `<div class ="chat-main__message" data-id="${message.id}">
                  <div class="chat-main__message-name" >
                       ${message.name}
                  </div>
                  <div class="chat-main__message-time" >
                       ${message.date}
                  </div>
                  <div class="chat-main__message-body" >
                    ${message.content}
                    <p>${image}</p>
                  </div>
                  </div>
                </div>`
    return html;
  }
  $("#submitbutton").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = location.href
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.length != 0){
        var html = buildHTML(data);
        $('.chat-main__body--messages-list').append(html);
        $("#submitbutton")[0].reset();
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
      }
      else {
        alert('error')
      }
        $('.submit').attr('disabled', false);
      })
      .fail(function() {
        alert('error');
      })
    })
  
  // 自動更新
  $(function() {
    $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
    });
    function update(){
      if($('.chat__contents__content')[0]){
        var message_id = $('.chat__contents__content:last').data('message-id');
      } else {
        return false
      }

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id : message_id },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.chat__contents').append(html)
        })
      }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  })
});

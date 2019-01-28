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
    setInterval(update, 5000);
      function update(){
        if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        var message_id = $('.chat-main__message').last().data('id');
        $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: message_id},
        dataType: 'json'
      })
      .done(function(data){
        if (data.length != 0){
          data.forEach(function(message){
          var html = buildHTML(message);
          $('.chat-main__body--messages-list').append(html);
          $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
          })
        }
      })
      .fail(function() {
        alert('error');
      })
    }
  }
});

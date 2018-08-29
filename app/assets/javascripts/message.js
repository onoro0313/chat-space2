// フォームが送信されたら、イベントが発火するようにする
$(function(){
  function buildHtml(message){
    var html = `<li class="chat-body__block">
                  <div class="chat-body__block_name">
                    ${message.user_name}
                  </div>
                  <div class="chat-body__block_date">
                    ${message.created_at}
                  </div>
                  <div class="chat-body__block_text">
                    ${message.body}
                  </div>
                </li>`

    if (message.image.url){
      html += `<div class="chat-body__block_text">
                <img src="${message.image.url}">
              </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    console.log(this[0])
    var formData = new FormData(this);
    var url = $(this).attr('action')
    // ajax形式で、情報をmessages#createにjson型で送る
    // $上のthisとajaxのドルマークは両方必要であるがその意味がわからん。
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHtml(data);
      // $()←はjqueryで言う関数という意味らしい、つけなきゃダメ
      $('.chat-body__list').append(html);
      $('.chat-footer__form').val('');
      // animate scrolltop .scrollHeightでスクロールできる長さを知り、$('')[0]でその要素のどこにscrolltopするかを決めている。
      $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, "slow")
    })
      // $('#new_message')[0].reset();
    .fail(function(){
      alert('error')
    })
    return false;
    // rails のルールと少し違う。return falseで明示的に、一番最初の即時関数の終わりを示してあげる必要がある。
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json'
    })
    .done(function(messages){
      console.log(messages)
      var insertHtml = ''
      messages.forEach(function(message){
        insertHtml += buildHtml(message);
      })
      $('chat-body').html(insertHtml);
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval)
  }},5000)
  return false;
});

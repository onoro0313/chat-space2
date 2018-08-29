$(function(){
  var search_result = $('#user-search-result')
  function appendHtml(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
  return search_result.append(html)
  }

  function buildUser(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return $('#chat-group-users').append(html)
  }
  $('#user-search-field').on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log($(this));
    $.ajax({
      url:'/users',
      type:"GET",
      data: {keyword: input},
      dataType:'json'
    })
    // 非同期通信成功後の挙動
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendHtml(user);
        })
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    });
    return false;
  });
// htmlがないものに対してはそもそもjqueryの動作を行わない。javascriptによって新しく入った要素に対してイベントを起こしたいときは、ハブリングを行う。親要素を指定。
  $('.chat-group-form').on("click", '.user-search-add',function(){
    //イベントが起きた瞬間にイベントが起きた要素の親要素を取得する
    console.log(this)
    $(this).parent().remove()
    // data属性をあらかじめつけておくことで、thisによって取られるイベント時の要素から、特定のidとnameを引き出せる。htmlのvalueみたいな感じ
    var id = $(this).data('user-id')
    var name = $(this).data('user-name')
    buildUser(id, name);
  })

  $('.chat-group-form').on("click", '.user-search-remove', function(){
    $(this).parent().remove()
  })
})

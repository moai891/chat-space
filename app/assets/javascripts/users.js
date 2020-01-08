$(function() {
  function addUser(user) {
    // console.log("起");
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    // console.log(html);
    $("#user-search-result").append(html);
  } 
  
  function addNouser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
      `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {    
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function(users) {
        // console.log("堂");
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
            // console.log(html);
          });
        } else if (input.length == 0) {
          return false;
        } else {
            addNouser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log
    //追加ボタンがクリックされたユーザーが、検索結果一覧から消える
    //data-user-idとdata-user-nameを取得する
      const userName = $(this).attr("data-user-name");
      const userId = $(this).attr("data-user-id");
      $(this)
        .parent() //".chat-group-user__btn--add"の親要素を取得する
        .remove(); //".chat-group-user__btn--add"のを削除する
      // binding.pry
      addDeleteUser(userName, userId);
      // binding.pry
      addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});
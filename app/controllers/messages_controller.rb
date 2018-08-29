class MessagesController < ApplicationController
  before_action :set_group

  def index
    @groups = current_user.groups.order('created_at DESC')
    @users = @group.users
    @messages = @group.messages.order('created_at ASC').includes(:user)
    @message = Message.new
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    # @groups = current_user.groups.order('created_at DESC')
    @message = @group.messages.new(create_params)
    if @message.save
      # json型 or html型で遷移先を変更。jsonの場合はjbuilder起動。送るデータの型を整列させる。
      respond_to do |format|
# htmlの書き方が不安
        format.html {redirect_to group_messages_path(@group),notice: "メッセージが送信されました。"}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      # flash.now[:alert] = 'メッセージを入力してください。'
      redirect_to group_messages_path, alert: "メッセージを入力してください"
    end
  end

  private

  def create_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
    def set_group
    @group = Group.find(params[:group_id])
    end
end

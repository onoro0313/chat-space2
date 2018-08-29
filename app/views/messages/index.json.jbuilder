json.array! @messages do |message|
  json.name message.user.name
  json.body message.body
  json.id message.id
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.image message.image
end

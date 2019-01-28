json.name @message.user.name
json.content @message.content
json.date @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.image_url @message.image_url
json.id @message.id

class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true, uniqueness: true

  # データに内容がある場合⇨文章がある場合、画像のみの場合
  def show_last_message
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : "画像が投稿されています"
    else
      "まだメッセージはありません"
    end
  end
end

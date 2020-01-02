require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
    #1. メッセージがあれば保存できる⇨空では登録できない
      it "is vaild with body" do
        expect(build(:message)).to be_valid
      end

    #2. 画像があれば保存できる
      it "is vaild with image" do
        expect(build(:message, body: nil)).to be_valid
      end

    #3. テキストと画像があれば保存できる
      it "is valid with body and image" do
        message = build(:message)
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do 
      it "is invalid without body and image" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end


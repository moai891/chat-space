## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false,unique:true|
|mail|string|null:false,unique:true|

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members 

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false,unique:true|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members 

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

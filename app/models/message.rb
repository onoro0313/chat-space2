class Message < ApplicationRecord

#validation
validates :body_or_image, presence: true
#association
belongs_to :user
belongs_to :group
#uploader
mount_uploader :image, ImageUploader
#test rspec


private
    def body_or_image
      body.presence || image.presence
    end
end

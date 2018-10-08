FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    # image File.open("#{Rails.root}/public/uploads/message/image/7/panda.jpg")
    user
    group
  end
end

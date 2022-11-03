class Dog < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :size, presence: true, inclusion: {in: %w(Small Medium Big), message: "you entered is not included in the list" }
  validates :breed, presence: true
  validates :gender, presence: true, inclusion: {in: %w(Male Female), message: "you entered is not included in the list" }
  validates :image_url, presence: true
  validates :age, presence: true

  def is_adopted
    ActiveRecord::Type::Boolean.new.cast(self[:is_adopted])
  end
end

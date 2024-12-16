package entity

import("gorm.io/gorm"
	"time" ) 

	type Member struct {
		gorm.Model
		MemberID    uint      `gorm:"primaryKey;autoIncrement" json:"member_id"`
		FirstName   string    `gorm:"type:varchar(100);not null" json:"first_name"`
		LastName    string    `gorm:"type:varchar(100);not null" json:"last_name"`
		NationalID  string    `gorm:"type:varchar(20);unique;not null" json:"national_id"`
		PhoneNumber string    `gorm:"type:varchar(15);not null" json:"phone_number"`
		Email       string    `gorm:"type:varchar(100);unique;not null" json:"email"`
		Password    string    `gorm:"type:varchar(255);not null" json:"password"`
		Date        time.Time `gorm:"type:date;not null" json:"date"`
		GenderID    uint      `gorm:"not null" json:"gender_id"`
		RoomID      uint      `gorm:"not null" json:"room_id"`
		EmployeeID  uint      `gorm:"not null" json:"employee_id"`
	
		// Relations
		//Gender   Gender   `gorm:"foreignKey:GenderID" json:"gender"`
		Room     Room     `gorm:"foreignKey:RoomID" json:"room"`
		Employee Employee `gorm:"foreignKey:EmployeeID" json:"employee"`
	}
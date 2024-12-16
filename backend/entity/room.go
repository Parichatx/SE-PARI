package entity

import (
	
	"gorm.io/gorm"
	"time"
	
)

type Room struct {
	gorm.Model
	RoomID       uint      `gorm:"primaryKey;autoIncrement" json:"room_id"`
	RoomName     string    `gorm:"type:varchar(100);not null" json:"room_name"`
	RoomSize     string    `gorm:"type:varchar(50);not null" json:"room_size"`
	RoomLimit    uint      `gorm:"not null" json:"room_limit"`
	PetLimit     uint      `gorm:"not null" json:"pet_limit"`
	RoomRent     uint      `gorm:"not null" json:"room_rent"`
	Date         time.Time `gorm:"type:date;not null" json:"date"`
	RoomStatusID uint      `gorm:"not null" json:"room_status_id"`
	PetID        uint      `gorm:"not null" json:"pet_id"`
	EmployeeID   uint      `gorm:"not null" json:"employee_id"`

	// Relations
	//RoomStatus RoomStatus `gorm:"foreignKey:RoomStatusID" json:"room_status"`
	//Pet        Pet        `gorm:"foreignKey:PetID" json:"pet"`
	Employee   Employee   `gorm:"foreignKey:EmployeeID" json:"employee"`
}
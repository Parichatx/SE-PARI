package entity


import ("gorm.io/gorm" )

type BillStatus struct {
	gorm.Model
	BillStatusID uint   `gorm:"primaryKey;autoIncrement" json:"bill_status_id"`
	Status       string `gorm:"type:varchar(50);not null" json:"status"`
}
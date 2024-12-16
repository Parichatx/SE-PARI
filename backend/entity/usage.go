package entity

import "gorm.io/gorm"


type Usage struct {
	gorm.Model
	UsageID    uint      `gorm:"primaryKey;autoIncrement" json:"usage_id"`
	UnitUsed   int       `gorm:"not null" json:"unit_used"`
	TotalCost  uint      `gorm:"not null" json:"total_cost"`
	Month      uint      `gorm:"not null" json:"month"`
	BillingID  uint      `gorm:"not null" json:"billing_id"`
	FeeID      uint      `gorm:"not null" json:"fee_id"`
	EmployeeID uint      `gorm:"not null" json:"employee_id"`

	// Relations
	Billing  Billing  `gorm:"foreignKey:BillingID" json:"billing"`
	Fee      Fee      `gorm:"foreignKey:FeeID" json:"fee"`
	Employee Employee `gorm:"foreignKey:EmployeeID" json:"employee"`
}
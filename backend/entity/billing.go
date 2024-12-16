package entity


import ("gorm.io/gorm"
		"time" )

type Billing struct {
	gorm.Model
	BillingID    uint      `gorm:"primaryKey;autoIncrement" json:"billing_id"`
	Total        uint      `gorm:"not null" json:"total"`
	BillingDate  time.Time `gorm:"not null" json:"billing_date"`
	Note         string    `gorm:"type:varchar(255)" json:"note"`
	DueDate      time.Time `gorm:"not null" json:"due_date"`
	MemberID     uint      `gorm:"not null" json:"member_id"`
	BillStatusID uint      `gorm:"not null" json:"bill_status_id"`

	// Relations
	Member     Member     `gorm:"foreignKey:MemberID" json:"member"`
	BillStatus BillStatus `gorm:"foreignKey:BillStatusID" json:"bill_status"`
}
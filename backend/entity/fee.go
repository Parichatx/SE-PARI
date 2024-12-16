package entity


import ("gorm.io/gorm"
		"time" )
		
type Fee struct {
	gorm.Model
	FeeID         uint      `gorm:"primaryKey;autoIncrement" json:"fee_id"`
	FeeType       string    `gorm:"type:varchar(100);not null" json:"fee_type"`
	FeeRate       int       `gorm:"not null" json:"fee_rate"`
	EffectiveDate time.Time `gorm:"not null" json:"effective_date"`
}
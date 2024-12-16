package entity


import ("gorm.io/gorm"
		"time" )

type ContractType struct {
	ContractTypeID  uint   `gorm:"primaryKey;autoIncrement" json:"contract_type_id"`
	ContractName    string `gorm:"type:varchar(100);not null" json:"contract_name"`
	MonthlyRent     uint   `gorm:"not null" json:"monthly_rent"`
	DurationMonths  uint   `gorm:"not null" json:"duration_months"`
}
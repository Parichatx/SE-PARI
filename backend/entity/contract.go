package entity


import ("gorm.io/gorm"
		"time" )


type Contract struct {
	ContractID     uint      `gorm:"primaryKey;autoIncrement" json:"contract_id"`
	StartDate      time.Time `gorm:"type:date;not null" json:"start_date"`
	EndDate        time.Time `gorm:"type:date;not null" json:"end_date"`
	SecurityDeposit uint     `gorm:"not null" json:"security_deposit"`
	Note           string    `gorm:"type:varchar(255)" json:"note"`
	MemberID       uint      `gorm:"not null" json:"member_id"`
	EmployeeID     uint      `gorm:"not null" json:"employee_id"`
	RoomID         uint      `gorm:"not null" json:"room_id"`
	ContractTypeID uint      `gorm:"not null" json:"contract_type_id"`

	// Relations
	Member       Member       `gorm:"foreignKey:MemberID" json:"member"`
	Employee     Employee     `gorm:"foreignKey:EmployeeID" json:"employee"`
	Room         Room         `gorm:"foreignKey:RoomID" json:"room"`
	ContractType ContractType `gorm:"foreignKey:ContractTypeID" json:"contract_type"`
}
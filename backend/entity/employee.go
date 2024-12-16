package entity


import ("gorm.io/gorm"
		"time" )

// Employee struct example
type Employee struct {
	gorm.Model
	EmployeeID   uint      `gorm:"primaryKey;autoIncrement" json:"employee_id"`
	FirstName    string    `gorm:"type:varchar(100);not null" json:"first_name"`
	LastName     string    `gorm:"type:varchar(100);not null" json:"last_name"`
	Email        string    `gorm:"type:varchar(100);unique;not null" json:"email"`
	PhoneNumber  string    `gorm:"type:varchar(15);not null" json:"phone_number"`
	Position     string    `gorm:"type:varchar(50);not null" json:"position"`
	HireDate     time.Time `gorm:"type:date;not null" json:"hire_date"`
	Salary       uint      `gorm:"not null" json:"salary"`
	GenderID     uint      `gorm:"not null" json:"gender_id"`

	// Relations
	//Gender   Gender   `gorm:"foreignKey:GenderID" json:"gender"`
	Members  []Member `gorm:"foreignKey:EmployeeID" json:"members"`
	Rooms    []Room   `gorm:"foreignKey:EmployeeID" json:"rooms"`
	Contracts []Contract `gorm:"foreignKey:EmployeeID" json:"contracts"`
	Usages   []Usage  `gorm:"foreignKey:EmployeeID" json:"usages"`
}

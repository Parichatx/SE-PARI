package entity


import ("gorm.io/gorm"
	"time" )


type Payment struct {
	gorm.Model
	PaymentID   int       `gorm:"primaryKey"`
	InvoiceID   int       `gorm:"not null"` // Foreign Key to Invoice
	PaymentDate time.Time // Date the payment was made
	AmountPaid  float64   // Amount paid
	PaymentMethod string  `gorm:"size:50"` // e.g., Credit Card, Bank Transfer
}
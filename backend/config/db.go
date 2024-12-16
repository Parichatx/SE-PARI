package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/Parichatx/SE-PARI/backend/entity" 
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

type CustomLogger struct{}

func (l *CustomLogger) LogMode(level logger.LogLevel) logger.Interface {
	return l
}

func (l *CustomLogger) Info(ctx context.Context, msg string, args ...interface{}) {}

func (l *CustomLogger) Warn(ctx context.Context, msg string, args ...interface{}) {}

func (l *CustomLogger) Error(ctx context.Context, msg string, args ...interface{}) {
	if !strings.Contains(msg, "record not found") {
		log.Printf(msg, args...)
	}
}

func (l *CustomLogger) Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error) {
	// ไม่ทำอะไรใน Trace
}

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("brainboom-new.db?cache=shared"), &gorm.Config{
		Logger: &CustomLogger{},
	})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("connected database")
	db = database
	
	
}

func getSecretKey() string{
	// โหลดไฟล์ .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// คืนค่าคีย์ที่เข้ารหัส
	return os.Getenv("MY_SECRET_KEY")
}


func SetupDatabase() error {

	// AutoMigrate สำหรับ Entity ที่เกี่ยวข้อง
	db.AutoMigrate(
		&entity.Member{},
		//&entity.Gender{},
		//&entity.UserRoles{},
		&entity.Room{},
		&entity.Contract{},
		&entity.Usage{},
		&entity.Billing{},
		&entity.Fee{},
		&entity.BillStatus{},
	)

	// สร้างข้อมูลเริ่มต้นสำหรับ Room
	Room1 := entity.Room{
		RoomName: "Room A101", RoomSize: "Medium", RoomLimit: 2, PetLimit: 1, RoomRent: 5000, RoomStatusID: 1,
	}
	Room2 := entity.Room{
		RoomName: "Room B202", RoomSize: "Large", RoomLimit: 3, PetLimit: 2, RoomRent: 8000, RoomStatusID: 1,
	}

	db.FirstOrCreate(&Room1, &entity.Room{RoomName: "Room A101"})
	db.FirstOrCreate(&Room2, &entity.Room{RoomName: "Room B202"})

	// สร้างข้อมูลเริ่มต้นสำหรับ Fee
	Fee1 := entity.Fee{FeeType: "Electricity", FeeRate: 10, EffectiveDate: time.Now()}
	Fee2 := entity.Fee{FeeType: "Water", FeeRate: 5, EffectiveDate: time.Now()}

	db.FirstOrCreate(&Fee1, &entity.Fee{FeeType: "Electricity"})
	db.FirstOrCreate(&Fee2, &entity.Fee{FeeType: "Water"})

	// สร้างสถานะบิลเริ่มต้น
	Pending := entity.BillStatus{Status: "Pending"}
	Paid := entity.BillStatus{Status: "Paid"}

	db.FirstOrCreate(&Pending, &entity.BillStatus{Status: "Pending"})
	db.FirstOrCreate(&Paid, &entity.BillStatus{Status: "Paid"})

	// ตัวอย่างการสร้างสัญญา (Contract)
	Contract1 := entity.Contract{
		StartDate: time.Now(), EndDate: time.Now().AddDate(0, 6, 0),
		SecurityDeposit: 10000, MemberID: 1, RoomID: 1, ContractTypeID: 1,
	}
	db.FirstOrCreate(&Contract1, &entity.Contract{RoomID: 1, MemberID: 1})

	// สร้างการใช้งานไฟฟ้า/น้ำประปา (Usage)
	Usage1 := entity.Usage{
		UnitUsed: 100, TotalCost: 1000, Month: 12, BillingID: 1, FeeID: 1, EmployeeID: 1,
	}
	db.FirstOrCreate(&Usage1, &entity.Usage{BillingID: 1, FeeID: 1})

	// สร้างบิลตัวอย่าง
	Billing1 := entity.Billing{
		Total:        6000,
		BillingDate:  time.Now(),
		Note:         "Electricity and Water charges",
		DueDate:      time.Now().AddDate(0, 0, 15),
		MemberID:     1,
		BillStatusID: 1,
	}
	db.FirstOrCreate(&Billing1, &entity.Billing{MemberID: 1})
	
	fmt.Println("Database setup complete with initial data.")
	return nil
}

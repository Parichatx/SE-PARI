package billing

import (
	"net/http"

	//"github.com/Parichatx/user-system2/config"
	//"github.com/Parichatx/user-system2/entity"
	"github.com/gin-gonic/gin"
)


func GetBillings(c *gin.Context) {
	var billings []entity.Billings
	if err := entity.DB().Preload("Member").Preload("BillStatus").Find(&billings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, billings)
}

func CreateBilling(c *gin.Context) {
	var billing entity.Billings
	if err := c.ShouldBindJSON(&billing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&billing).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, billing)
}

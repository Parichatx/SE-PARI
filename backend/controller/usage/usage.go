package usage

import (
	"net/http"

	"github.com/Parichatx/SE-PARI/entity"
	"github.com/gin-gonic/gin"
)

// GetUsages handles GET requests to fetch all usages.
func GetUsages(c *gin.Context) {
	var usages []entity.Usage
	// Use DB() to preload related entities and fetch usages.
	if err := entity.DB().Preload("Fee").Preload("Billing").Find(&usages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to fetch usages: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": usages})
}

// CreateUsage handles POST requests to create a new usage record.
func CreateUsage(c *gin.Context) {
	var usage entity.Usage

	// Bind JSON request body to the Usage struct.
	if err := c.ShouldBindJSON(&usage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Validate and create a new record in the database.
	if err := entity.DB().Create(&usage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create usage: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": usage})
}

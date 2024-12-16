package invoice

import (
	"net/http"
	"time"

	//"github.com/Parichatx/user-system2/config"
	//"github.com/Parichatx/user-system2/entity"
	//"github.com/gin-gonic/gin"
)

func GetInvoices(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "Get all invoices"}) }
func CreateInvoice(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "Create an invoice"})
}
func UpdateInvoice(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update an invoice"})
}
func DeleteInvoice(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Delete an invoice"})
}
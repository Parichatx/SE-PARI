import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Table, Row, Col } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Title, Text } = Typography;

const Bill: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyName: "บริษัท ตัวอย่าง จำกัด",
    companyAddress: "999 หมู่ที่ 9 แขวง 999 เขตบางพลี กรุงเทพมหานคร 10500",
    companyTaxId: "1234567890999",
    companyPhone: "0912345678",
    companyEmail: "example@company.com",
    tenantName: "นายตัวอย่าง ลูกค้า",
    tenantAddress: "999 หมู่ที่ 9 แขวง 999 เขตบางพลี กรุงเทพมหานคร 10500",
    tenantTaxId: "1234567890123",
    tenantPhone: "0812345678",
    tenantEmail: "tenant@domain.com",
    invoiceNumber: "INV20231234001",
    invoiceDate: new Date().toLocaleDateString("th-TH"),
    items: [
      { key: 1, description: "ค่าเช่าห้องพัก", quantity: 1, unit: "เดือน", price: 8000, total: 8000 },
      { key: 2, description: "ค่าน้ำ", quantity: 15, unit: "หน่วย", price: 20, total: 300 },
      { key: 3, description: "ค่าไฟฟ้า", quantity: 120, unit: "หน่วย", price: 5, total: 600 },
      { key: 4, description: "ค่าบริการส่วนกลาง", quantity: 1, unit: "เดือน", price: 500, total: 500 },
    ],
  });

  const calculateTotal = () => {
    return invoiceData.items.reduce((acc, item) => acc + item.total, 0);
  };

  const handlePrintPDF = async () => {
    const element = document.getElementById("invoice");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoiceData.invoiceNumber}.pdf`);
  };

  const columns = [
    { title: "ลำดับ", dataIndex: "key", key: "key", width: "10%" },
    { title: "รายการ", dataIndex: "description", key: "description" },
    { title: "จำนวน", dataIndex: "quantity", key: "quantity" },
    { title: "หน่วย", dataIndex: "unit", key: "unit" },
    { title: "ราคาต่อหน่วย (บาท)", dataIndex: "price", key: "price" },
    { title: "จำนวนเงิน (บาท)", dataIndex: "total", key: "total" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        id="invoice"
        style={{ width: "100%", maxWidth: "800px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", padding: "20px" }}
      >
        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Col>
            <Title level={4}>{invoiceData.companyName}</Title>
            <Text>{invoiceData.companyAddress}</Text>
            <br />
            <Text>เลขประจำตัวผู้เสียภาษี: {invoiceData.companyTaxId}</Text>
            <br />
            <Text>โทร: {invoiceData.companyPhone}</Text>
            <br />
            <Text>อีเมล: {invoiceData.companyEmail}</Text>
          </Col>
          <Col>
            <Title level={4}>ใบแจ้งหนี้</Title>
            <Text>เลขที่: {invoiceData.invoiceNumber}</Text>
            <br />
            <Text>วันที่: {invoiceData.invoiceDate}</Text>
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Title level={5}>ข้อมูลลูกค้า</Title>
            <Text>ชื่อ: {invoiceData.tenantName}</Text>
            <br />
            <Text>ที่อยู่: {invoiceData.tenantAddress}</Text>
            <br />
            <Text>เลขประจำตัวผู้เสียภาษี: {invoiceData.tenantTaxId}</Text>
            <br />
            <Text>โทร: {invoiceData.tenantPhone}</Text>
            <br />
            <Text>อีเมล: {invoiceData.tenantEmail}</Text>
          </Col>
        </Row>

        <Table
          dataSource={invoiceData.items}
          columns={columns}
          pagination={false}
          bordered
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={5} style={{ textAlign: "right" }}>
                <Text strong>รวมทั้งหมด</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text strong>{calculateTotal()} บาท</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" onClick={handlePrintPDF} style={{ marginRight: "10px" }}>
            ดาวน์โหลด PDF
          </Button>
          <Button>กลับ</Button>
        </div>
      </Card>
    </div>
  );
};

export default Bill;
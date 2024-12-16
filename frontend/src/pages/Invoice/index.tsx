import React, { useState, useEffect } from "react";
import { Card, Form, Input, InputNumber, Typography, Button, Select, Row, Col, message } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Title, Text } = Typography;
const { Option } = Select;

const Invoice: React.FC = () => {
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [roomData, setRoomData] = useState<any>({
    roomNumber: "",
    contractNumber: "",
    tenantName: "",
    tenantAddress: "",
    usageDate: "",
    waterUsage: 0,
    electricityUsage: 0,
    waterCost: 0,
    electricityCost: 0,
    commonAreaFee: 0,
    otherCost: 0,
    additionalServiceCost: 0,
    totalCost: 0,
    invoiceNumber: "",
    hasAdditionalService: false,
  });

  const companyInfo = {
    name: "บริษัท บริหารอพาร์ทเมนท์ จำกัด",
    address: "123 ถนนตัวอย่าง เขตตัวอย่าง กรุงเทพฯ 10100",
    phone: "02-123-4567",
    email: "info@example.com",
  };

  const fetchRoomList = async () => {
    try {
      const response = await axios.get("/api/rooms");
      setRoomOptions(response.data.map((room: any) => room.roomNumber));
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  };

  const fetchRoomData = async (roomNumber: string) => {
    try {
      const response = await axios.get(`/api/rooms/${roomNumber}`);
      const data = response.data;

      const invoiceNumber = generateInvoiceNumber(roomNumber);
      setRoomData({
        roomNumber: data.roomNumber,
        contractNumber: data.contractNumber,
        tenantName: data.tenantName || "ไม่ระบุ",
        tenantAddress: data.tenantAddress || "ไม่ระบุ",
        usageDate: data.usageDate || new Date().toISOString().split("T")[0],
        waterUsage: data.waterUsage,
        electricityUsage: data.electricityUsage,
        waterCost: data.waterCost,
        electricityCost: data.electricityCost,
        commonAreaFee: data.commonAreaFee,
        otherCost: data.otherCost || 0,
        additionalServiceCost: data.additionalServiceCost || 0,
        totalCost:
          data.waterCost +
          data.electricityCost +
          data.commonAreaFee +
          (data.otherCost || 0) +
          (data.additionalServiceCost || 0),
        invoiceNumber,
        hasAdditionalService: !!data.additionalServiceCost,
      });
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const generateInvoiceNumber = (roomNumber: string): string => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0].replace(/-/g, "");
    return `${roomNumber}-${formattedDate}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handlePrintPDF = async () => {
    const element = document.getElementById("monthly-bill");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${roomData.invoiceNumber}.pdf`);

    message.success("ส่งออก PDF สำเร็จ!");
  };

  useEffect(() => {
    fetchRoomList();
  }, []);

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
        id="monthly-bill"
        style={{
          width: "100%",
          maxWidth: "800px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Row justify="space-between">
          <Col>
            <Title level={4}>{companyInfo.name}</Title>
            <Text>{companyInfo.address}</Text>
            <br />
            <Text>โทร: {companyInfo.phone}</Text>
            <br />
            <Text>อีเมล: {companyInfo.email}</Text>
          </Col>
          <Col>
            <Title level={5}>ใบแจ้งหนี้</Title>
            <Text>เลขที่ใบแจ้ง: {roomData.invoiceNumber}</Text>
            <br />
            <Text>วันที่: {roomData.usageDate}</Text>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Title level={5}>ข้อมูลผู้เช่า</Title>
            <Text>ชื่อผู้เช่า: {roomData.tenantName}</Text>
            <br />
            <Text>ที่อยู่: {roomData.tenantAddress}</Text>
          </Col>
        </Row>
        <Form layout="vertical" style={{ marginTop: "20px" }}>
          <Form.Item label="รวมทั้งหมด (บาท)">
            <InputNumber
              value={roomData.totalCost}
              disabled
              style={{ width: "100%", fontWeight: "bold" }}
            />
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" style={{ marginRight: "10px" }} onClick={handlePrintPDF}>
              ส่งออก PDF
            </Button>
            <Button danger style={{ marginRight: "10px" }}>
              ลบข้อมูล
            </Button>
            <Button>ยกเลิก</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Invoice;

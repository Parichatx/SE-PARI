import React, { useState, useEffect } from "react";
import { Card, Form, Input, InputNumber, Typography, Button, Select, Row, Col, Checkbox } from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const Monthly: React.FC = () => {
  const [roomOptions, setRoomOptions] = useState<string[]>([]); // ตัวเลือกหมายเลขห้อง
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
    additionalServiceCost: 0, // ค่าบริการอื่น ๆ
    totalCost: 0,
    invoiceNumber: "",
    hasAdditionalService: false, // ตัวแปรสำหรับการเลือกว่ามีบริการเพิ่มเติมหรือไม่
  });

  const fetchRoomList = async () => {
    try {
      // ดึงข้อมูลห้องทั้งหมดจาก API
      const response = await axios.get("/api/rooms");
      setRoomOptions(response.data.map((room: any) => room.roomNumber));
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  };

  const fetchRoomData = async (roomNumber: string) => {
    try {
      // ดึงข้อมูลรายละเอียดของห้อง
      const response = await axios.get(`/api/rooms/${roomNumber}`);
      const data = response.data;

      // สร้างเลขที่ใบแจ้งหนี้อัตโนมัติ
      const invoiceNumber = generateInvoiceNumber(roomNumber);

      // อัปเดตข้อมูลของห้อง
      setRoomData({
        roomNumber: data.roomNumber,
        contractNumber: data.contractNumber,
        tenantName: data.tenantName || "ไม่ระบุ",
        tenantAddress: data.tenantAddress || "ไม่ระบุ",
        usageDate: data.usageDate || new Date().toISOString().split("T")[0],
        waterUsage: data.waterUsage, // ดึงจากฐานข้อมูล
        electricityUsage: data.electricityUsage, // ดึงจากฐานข้อมูล
        waterCost: data.waterCost, // ค่าน้ำที่คำนวณจากฐานข้อมูล
        electricityCost: data.electricityCost, // ค่าไฟที่คำนวณจากฐานข้อมูล
        commonAreaFee: data.commonAreaFee,
        otherCost: data.otherCost || 0,
        additionalServiceCost: data.additionalServiceCost || 0, // เพิ่มค่าบริการอื่น ๆ
        totalCost:
          data.waterCost + data.electricityCost + data.commonAreaFee + (data.otherCost || 0) + (data.additionalServiceCost || 0), // รวมค่าบริการอื่น ๆ
        invoiceNumber,
        hasAdditionalService: !!data.additionalServiceCost, // กำหนดว่าเคยมีบริการเพิ่มเติมหรือไม่
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

  useEffect(() => {
    fetchRoomList(); // โหลดรายการหมายเลขห้อง
  }, []);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = {
      ...roomData,
      [field]: value,
    };

    // คำนวณยอดรวมอัตโนมัติ โดยใช้ค่า waterCost และ electricityCost จากฐานข้อมูล
    updatedData.totalCost =
      roomData.waterCost +
      roomData.electricityCost +
      (updatedData.commonAreaFee || 0) +
      (updatedData.otherCost || 0) +
      (updatedData.additionalServiceCost || 0); // รวมค่าบริการอื่น ๆ

    setRoomData(updatedData);
  };

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
        style={{
          width: "100%",
          maxWidth: "1400px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col>
            <Title level={2} style={{ textAlign: "center" }}>
              ข้อมูลค่าใช้จ่ายห้องพักประจำเดือน
            </Title>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="รหัสห้องพัก">
                <Select
                  placeholder="เลือกหมายเลขห้อง"
                  onChange={(value) => fetchRoomData(value)}
                  style={{ width: "100%" }}
                >
                  {roomOptions.map((room) => (
                    <Option key={room} value={room}>
                      {room}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="เลขที่สัญญา">
                <Input value={roomData.contractNumber} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ชื่อ-นามสกุล ผู้เช่า">
                <Input value={roomData.tenantName} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ที่อยู่">
                <Input value={roomData.tenantAddress} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="เลขที่ใบแจ้งหนี้">
            <Input value={roomData.invoiceNumber} disabled />
          </Form.Item>

          <Form.Item label="วันที่บันทึก">
            <Input
              type="date"
              value={roomData.usageDate}
              onChange={(e) => handleInputChange("usageDate", e.target.value)}
            />
          </Form.Item>

          {/* ส่วนแสดงค่าการใช้งานและค่าบริการ */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ปริมาณน้ำที่ใช้ (ลบ.ม.)">
                <InputNumber value={roomData.waterUsage} disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ปริมาณไฟฟ้าที่ใช้ (kWh)">
                <InputNumber value={roomData.electricityUsage} disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ค่าน้ำ (บาท)">
                <InputNumber value={roomData.waterCost} disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ค่าไฟฟ้า (บาท)">
                <InputNumber value={roomData.electricityCost} disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ค่าส่วนกลาง (บาท)">
                <InputNumber
                  min={0}
                  value={roomData.commonAreaFee}
                  onChange={(value) => handleInputChange("commonAreaFee", value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ค่าอื่น ๆ (บาท)">
                <InputNumber
                  min={0}
                  value={roomData.otherCost}
                  onChange={(value) => handleInputChange("otherCost", value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ส่วนบริการเพิ่มเติม */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="มีบริการอื่น ๆ หรือไม่">
                <Checkbox
                  checked={roomData.hasAdditionalService}
                  onChange={(e) => handleInputChange("hasAdditionalService", e.target.checked)}
                >
                  ใช่
                </Checkbox>
              </Form.Item>
            </Col>
            {roomData.hasAdditionalService && (
              <Col span={12}>
                <Form.Item label="ค่าบริการอื่น ๆ (บาท)">
                  <InputNumber
                    min={0}
                    value={roomData.additionalServiceCost}
                    onChange={(value) => handleInputChange("additionalServiceCost", value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item label="รวมทั้งหมด (บาท)">
            <InputNumber
              value={roomData.totalCost}
              disabled
              style={{ width: "100%", fontWeight: "bold" }}
            />
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" style={{ marginRight: "10px" }}>
              บันทึก
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

export default Monthly;

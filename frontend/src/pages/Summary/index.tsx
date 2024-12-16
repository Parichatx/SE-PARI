import React, { useState } from "react";
import { Table, DatePicker, Select, Button, Card, Row, Col } from "antd";
import { Bar } from "@ant-design/plots";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Summary: React.FC = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ชื่อผู้พักอาศัย",
      dataIndex: "resident",
      key: "resident",
    },
    {
      title: "ประเภทค่าใช้จ่าย",
      dataIndex: "expenseType",
      key: "expenseType",
    },
    {
      title: "เดือน",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "ยอดรวม",
      dataIndex: "total",
      key: "total",
    },
  ];

  const chartConfig = {
    data: [
      { type: "ค่าน้ำ", value: 1200 },
      { type: "ค่าไฟ", value: 1800 },
      { type: "ค่าส่วนกลาง", value: 500 },
    ],
    xField: "type",
    yField: "value",
    color: "#3b82f6",
  };

  return (
    <div
    style={{
      width: '100vw', // ใช้ความกว้างทั้งหมดของหน้าจอ
      height: '100vh', // ใช้ความสูงทั้งหมดของหน้าจอ
      display: 'flex',
      justifyContent: 'center', // จัดกึ่งกลางแนวนอน
      alignItems: 'center', // จัดกึ่งกลางแนวตั้ง
      backgroundColor: '#f0f2f5', // สีพื้นหลังของหน้า
      padding: '20px',
    }}
  >
      <Card
        style={{
          width: "100%", // เต็มหน้าจอแนวนอน
          height: '100vh', 
          maxWidth: "1400px", // จำกัดความกว้างสูงสุด
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          รายงานและสรุปรายการค่าใช้จ่าย
        </h2>

        {/* ตัวเลือกช่วงเวลา */}
        <Row
          gutter={[16, 16]}
          style={{
            marginBottom: "20px",
          }}
        >
          <Col xs={24} sm={12} lg={8}>
            <RangePicker style={{ width: "100%" }} />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              placeholder="เลือกประเภทค่าใช้จ่าย"
              style={{ width: "100%" }}
            >
              <Option value="water">ค่าน้ำ</Option>
              <Option value="electricity">ค่าไฟ</Option>
              <Option value="maintenance">ค่าส่วนกลาง</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => console.log("Filter data")}
            >
              กรองข้อมูล
            </Button>
          </Col>
        </Row>

        {/* กราฟ */}
        <div style={{ marginBottom: "20px" }}>
          <Bar {...chartConfig} style={{ height: "400px" }} />
        </div>

        {/* ตาราง */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          style={{ marginTop: "20px" }}
          bordered
        />

        {/* ปุ่มส่งออก */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
          }}
        >
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => console.log("Export to PDF")}
          >
            Export as PDF
          </Button>
          <Button
            type="primary"
            onClick={() => console.log("Export to Excel")}
          >
            Export as Excel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Summary;

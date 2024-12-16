import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Card, Tabs, Select, DatePicker } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

const UsageTable = () => {
  const [roomsData, setRoomsData] = useState([]); // ข้อมูลห้องทั้งหมด
  const [selectedMonth, setSelectedMonth] = useState(null); // เดือนที่เลือก
  const [selectedYear, setSelectedYear] = useState(null); // ปีที่เลือก
  const [selectedDate, setSelectedDate] = useState(null); // วันที่เลือก

  // ดึงข้อมูลห้องจาก backend
  useEffect(() => {
    fetch('/api/rooms-usage') // API ที่ดึงข้อมูลห้องและหน่วยที่บันทึกไว้
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((room, index) => ({
          key: index,
          roomNumber: room.roomNumber,
          previousElectricityUnits: room.previousElectricityUnits || 0,
          currentElectricityUnits: room.currentElectricityUnits || 0,
          electricityUnitsUsed: room.electricityUnitsUsed || 0,
          previousWaterUnits: room.previousWaterUnits || 0,
          currentWaterUnits: room.currentWaterUnits || 0,
          waterUnitsUsed: room.waterUnitsUsed || 0,
        }));
        setRoomsData(formattedData);
      })
      .catch((error) => console.error('Error fetching room usage:', error));
  }, []);

  const handleInputChange = (value, key, field) => {
    const updatedRooms = roomsData.map((room) => {
      if (room.key === key) {
        const updatedRoom = { ...room, [field]: Number(value) };
        if (field === 'currentElectricityUnits' || field === 'previousElectricityUnits') {
          updatedRoom.electricityUnitsUsed = updatedRoom.currentElectricityUnits - updatedRoom.previousElectricityUnits;
        }
        if (field === 'currentWaterUnits' || field === 'previousWaterUnits') {
          updatedRoom.waterUnitsUsed = updatedRoom.currentWaterUnits - updatedRoom.previousWaterUnits;
        }
        return updatedRoom;
      }
      return room;
    });
    setRoomsData(updatedRooms);
  };

  const handleSave = () => {
    if (!selectedMonth || !selectedYear || !selectedDate) {
      alert("กรุณาเลือกเดือน, ปี และวันที่ที่จะบันทึกข้อมูล");
      return;
    }

    const dataToSave = {
      month: selectedMonth,
      year: selectedYear,
      date: selectedDate.format('YYYY-MM-DD'),
      usageData: roomsData,
    };

    fetch('/api/usage-save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave),
    })
      .then((response) => response.json())
      .then((result) => console.log('Save result:', result))
      .catch((error) => console.error('Error saving usage:', error));
  };

  const electricityColumns = [
    {
      title: 'ห้อง',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'หน่วยก่อนหน้า (ไฟ)',
      dataIndex: 'previousElectricityUnits',
      key: 'previousElectricityUnits',
      render: (text, record) => (
        <Input
          type="number"
          value={record.previousElectricityUnits}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'previousElectricityUnits')}
        />
      ),
    },
    {
      title: 'หน่วยล่าสุด (ไฟ)',
      dataIndex: 'currentElectricityUnits',
      key: 'currentElectricityUnits',
      render: (text, record) => (
        <Input
          type="number"
          value={record.currentElectricityUnits}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'currentElectricityUnits')}
        />
      ),
    },
    {
      title: 'หน่วยที่ใช้ (ไฟ)',
      dataIndex: 'electricityUnitsUsed',
      key: 'electricityUnitsUsed',
      render: (text) => <span>{text}</span>,
    },
  ];

  const waterColumns = [
    {
      title: 'ห้อง',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'หน่วยก่อนหน้า (น้ำ)',
      dataIndex: 'previousWaterUnits',
      key: 'previousWaterUnits',
      render: (text, record) => (
        <Input
          type="number"
          value={record.previousWaterUnits}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'previousWaterUnits')}
        />
      ),
    },
    {
      title: 'หน่วยล่าสุด (น้ำ)',
      dataIndex: 'currentWaterUnits',
      key: 'currentWaterUnits',
      render: (text, record) => (
        <Input
          type="number"
          value={record.currentWaterUnits}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'currentWaterUnits')}
        />
      ),
    },
    {
      title: 'หน่วยที่ใช้ (น้ำ)',
      dataIndex: 'waterUnitsUsed',
      key: 'waterUnitsUsed',
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '100%',
          height: '100vh',
          maxWidth: '1400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>จดมิเตอร์</h2>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Select
            style={{ width: 200, marginRight: '10px' }}
            placeholder="เลือกเดือน"
            onChange={(value) => setSelectedMonth(value)}
          >
            <Option value="01">มกราคม</Option>
            <Option value="02">กุมภาพันธ์</Option>
            <Option value="03">มีนาคม</Option>
            <Option value="04">เมษายน</Option>
            <Option value="05">พฤษภาคม</Option>
            <Option value="06">มิถุนายน</Option>
            <Option value="07">กรกฎาคม</Option>
            <Option value="08">สิงหาคม</Option>
            <Option value="09">กันยายน</Option>
            <Option value="10">ตุลาคม</Option>
            <Option value="11">พฤศจิกายน</Option>
            <Option value="12">ธันวาคม</Option>
          </Select>
          <Select
            style={{ width: 200, marginRight: '10px' }}
            placeholder="เลือกปี"
            onChange={(value) => setSelectedYear(value)}
          >
            {[...Array(10)].map((_, index) => {
              const year = moment().year() - index;
              return <Option key={year} value={year}>{year}</Option>;
            })}
          </Select>
          <DatePicker
            style={{ width: 200 }}
            placeholder="เลือกวันที่"
            onChange={(date) => setSelectedDate(date)}
            format="YYYY-MM-DD"
          />
        </div>

        <Tabs defaultActiveKey="1">
          <TabPane tab="ไฟฟ้า" key="1">
            <Table
              dataSource={roomsData}
              columns={electricityColumns}
              pagination={false}
              bordered
              style={{ backgroundColor: 'white' }}
            />
          </TabPane>
          <TabPane tab="น้ำ" key="2">
            <Table
              dataSource={roomsData}
              columns={waterColumns}
              pagination={false}
              bordered
              style={{ backgroundColor: 'white' }}
            />
          </TabPane>
        </Tabs>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleSave}>
            บันทึกข้อมูล
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UsageTable;

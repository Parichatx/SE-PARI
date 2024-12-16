import React, { useState } from 'react';
import { Table, Modal, Button, Form, Input, DatePicker, Select, Card, Space } from 'antd';

const Fee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [feeRates, setFeeRates] = useState([
    { id: 1, type: 'น้ำ', rate: 15, effectiveDate: '2024-01-01' },
    { id: 2, type: 'ไฟฟ้า', rate: 5, effectiveDate: '2024-01-01' },
    { id: 3, type: 'ส่วนกลาง', rate: 1000, effectiveDate: '2024-01-01' },
  ]);
  const [customTypes, setCustomTypes] = useState(['น้ำ', 'ไฟฟ้า', 'ส่วนกลาง']);

  const openModal = (data = null) => {
    setEditingData(data);
    setIsModalOpen(true);
  };

  const handleSave = (values: any) => {
    if (editingData) {
      // Update existing fee rate
      setFeeRates(prev =>
        prev.map(item =>
          item.id === editingData.id ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new fee rate
      setFeeRates(prev => [...prev, { id: Date.now(), ...values }]);
    }
    setIsModalOpen(false);
  };

  const addCustomType = () => {
    Modal.confirm({
      title: 'เพิ่มประเภทค่าบริการใหม่',
      content: (
        <Form
          onFinish={(values) => {
            if (values.type && !customTypes.includes(values.type)) {
              setCustomTypes(prev => [...prev, values.type]);
            }
            Modal.destroyAll();
          }}
        >
          <Form.Item
            name="type"
            label="ชื่อประเภท"
            rules={[{ required: true, message: 'กรุณากรอกชื่อประเภท' }]}
          >
            <Input placeholder="ชื่อประเภทค่าบริการ" />
          </Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button onClick={() => Modal.destroyAll()}>ยกเลิก</Button>
            <Button type="primary" htmlType="submit">บันทึก</Button>
          </Space>
        </Form>
      ),
      icon: null,
      footer: null,
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        title="จัดการอัตราค่าบริการ"
        style={{ width: '80%', maxWidth: '1000px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <Button type="primary" onClick={() => openModal()}>
              ตั้งค่าอัตราล่วงหน้า
            </Button>
            <Button type="default" onClick={addCustomType}>
              เพิ่มประเภทค่าบริการใหม่
            </Button>
          </Space>
          <Table
            dataSource={feeRates}
            columns={[
              { title: 'ประเภทค่าบริการ', dataIndex: 'type', key: 'type' },
              { title: 'อัตราค่าบริการ (บาท)', dataIndex: 'rate', key: 'rate' },
              { title: 'วันที่เริ่มมีผล', dataIndex: 'effectiveDate', key: 'effectiveDate' },
              {
                title: 'การกระทำ',
                key: 'action',
                render: (_, record) => (
                  <Button onClick={() => openModal(record)} type="link">
                    แก้ไข
                  </Button>
                ),
              },
            ]}
            rowKey="id"
            pagination={false}
            bordered
          />
        </Space>
      </Card>

      <Modal
        title={editingData ? 'แก้ไขอัตราค่าบริการ' : 'ตั้งค่าอัตราล่วงหน้า'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        <Form onFinish={handleSave} initialValues={editingData || { type: customTypes[0], rate: 0 }}>
          <Form.Item name="type" label="ประเภทค่าบริการ" rules={[{ required: true, message: 'กรุณาเลือกประเภทค่าบริการ' }]}>  
            <Select options={customTypes.map(type => ({ label: type, value: type }))} />
          </Form.Item>
          <Form.Item name="rate" label="อัตราค่าบริการ (บาท)" rules={[{ required: true, message: 'กรุณากรอกอัตราค่าบริการ' }]}>  
            <Input type="number" />
          </Form.Item>
          <Form.Item name="effectiveDate" label="วันที่เริ่มมีผล" rules={[{ required: true, message: 'กรุณาเลือกวันที่เริ่มมีผล' }]}>  
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={() => setIsModalOpen(false)} style={{ width: '45%' }}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit" style={{ width: '45%' }}>
              บันทึก
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default Fee;

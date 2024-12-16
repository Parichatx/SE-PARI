import React, { useEffect, useState ,  } from 'react';

import { Card, Col, Row, message, Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom'; 
//import HeaderComponent from '../../components/header/index';

import { FormOutlined , ClockCircleOutlined, EditOutlined , HistoryOutlined } from '@ant-design/icons';


function Dashboard() {
    const navigate = useNavigate();

    return (
        <div
          style={{
            width: '100vw', // ใช้ความกว้างทั้งหมดของหน้าจอ
            height: '100vh', // ใช้ความสูงทั้งหมดของหน้าจอ
            display: 'flex',
            justifyContent: 'center', // จัดกึ่งกลางแนวนอน
            alignItems: 'center', // จัดกึ่งกลางแนวตั้ง
            backgroundColor: '#f0f2f5', // สีพื้นหลังของหน้า
          }}
        >
          <Card
            style={{
              width: '95%',
              maxWidth: 1400,
              height: '95%',
              border: 'none',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            
            <div style={{ textAlign: 'center' }}>
              <h1>ค่าใช้จ่าย </h1>
              <h1>Dashboard </h1>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                marginTop: '20px',
              }}
            >
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/usage`)} >
                <EditOutlined /> บันทึกการใช้น้ำ-ไฟ
              </Button>
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/fee`)} >
                <HistoryOutlined /> เปลี่ยนอัตราค่าบริการ
              </Button>
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/monthly`)} >
                <ClockCircleOutlined /> ค่าใช้จ่ายประจำเดือน
              </Button>
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/summary`)} >
                <FormOutlined /> รายงานและสรุป
              </Button>
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/invoice`)} >
                <FormOutlined /> พิมพ์ใบแจ้งหนี้
              </Button>
              <Button style={{ width: 'calc(100% - 10px)' }}
              onClick={() => navigate(`/bill`)} >
                <FormOutlined /> พิมพ์ใบเสร็จ
              </Button>
            </div>
            <Outlet />
          </Card>
        </div>
      );
    };

export default Dashboard;
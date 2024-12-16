// Service สำหรับจัดการบิลและคำนวณค่าใช้จ่ายใน React

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // URL ของ Backend API

// ดึงรายการบิลทั้งหมด
export const getBills = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

// ดึงข้อมูลบิลตาม ID
export const getBillById = async (billId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bills/${billId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bill with ID ${billId}:`, error);
    throw error;
  }
};

// เพิ่มบิลใหม่
export const createBill = async (billData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bills`, billData);
    return response.data;
  } catch (error) {
    console.error('Error creating bill:', error);
    throw error;
  }
};

// อัปเดตสถานะการชำระเงินของบิล
export const updateBillStatus = async (billId, status) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/bills/${billId}`, { paymentStatus: status });
    return response.data;
  } catch (error) {
    console.error(`Error updating bill status for ID ${billId}:`, error);
    throw error;
  }
};

// ลบข้อมูลบิล
export const deleteBill = async (billId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/bills/${billId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bill with ID ${billId}:`, error);
    throw error;
  }
};

// ดึงข้อมูลผู้พักอาศัยทั้งหมด
export const getResidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/residents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching residents:', error);
    throw error;
  }
};

// เพิ่มข้อมูลผู้พักอาศัยใหม่
export const createResident = async (residentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/residents`, residentData);
    return response.data;
  } catch (error) {
    console.error('Error creating resident:', error);
    throw error;
  }
};

// อัปเดตข้อมูลผู้พักอาศัย
export const updateResident = async (residentId, residentData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/residents/${residentId}`, residentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating resident with ID ${residentId}:`, error);
    throw error;
  }
};

// ลบข้อมูลผู้พักอาศัย
export const deleteResident = async (residentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/residents/${residentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting resident with ID ${residentId}:`, error);
    throw error;
  }
};

// ดึงอัตราค่าใช้จ่าย
export const getRates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

// อัปเดตอัตราค่าใช้จ่าย
export const updateRates = async (rateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rates`, rateData);
    return response.data;
  } catch (error) {
    console.error('Error updating rates:', error);
    throw error;
  }
};

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore, useTicketStore } from '@/stores'

import { reactive, ref } from 'vue'
import dayjs from 'dayjs'

const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)

const form = reactive({
  start_location: '',
  end_location: '',
  flight_date: '',
  type: ''
})

const dialogVisible = ref(false)
let viewTicket = {}

const showModal = (ticket) => {
  dialogVisible.value = true
  viewTicket = ticket
}

const onSubmit = () => {
  ticketStore.get(form).catch((error) => setErrors({ apiError: error }))
}
</script>
<template>
  <h2>Tra cứu vé máy bay</h2>
  <el-form :inline="true" :model="form" label-width="120px">
    <el-form-item label="Điểm xuất phát" required>
      <el-select v-model="form.start_location" placeholder="Chọn điểm xuất phát" required>
        <el-option label="Hải Phòng" value="hai phong" />
        <el-option label="Hà Nội" value="ha noi" />
        <el-option label="Đà Nẵng" value="da nang" />
        <el-option label="Nha Trang" value="Nha Trang" />
        <el-option label="Hồ Chí Minh" value="ho chi minh" />
      </el-select>
    </el-form-item>
    <el-form-item label="Điểm đến" required>
      <el-select v-model="form.end_location" placeholder="Chọn điểm đến">
        <el-option label="Hải Phòng" value="hai phong" />
        <el-option label="Hà Nội" value="ha noi" />
        <el-option label="Đà Nẵng" value="da nang" />
        <el-option label="Nha Trang" value="Nha Trang" />
        <el-option label="Hồ Chí Minh" value="ho chi minh" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-date-picker v-model="form.flight_date" type="date" placeholder="Pick a date" clearable />
    </el-form-item>
    <el-form-item label="Loại vé">
      <el-select v-model="form.type" placeholder="Chọn loại vé">
        <el-option label="Vé VIP" value="vip" />
        <el-option label="Vé Thường" value="normal" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Tìm kiếm</el-button>
    </el-form-item>
  </el-form>
  <el-row :gutter="20">
    <el-col v-if="tickets.loading != true" v-for="ticket in tickets" :key="ticket.id" :span="5">
      <el-card class="box-card" @click="showModal(ticket)">
        <template #header>
          <div class="card-header">
            <span>{{ ticket.air_company }}</span>
            <span>{{ dayjs(ticket.start_time).format('hh:mm a D/M/YYYY') }}</span>
          </div>
        </template>
        <div class="text item">Đi: {{ ticket.start_location }}</div>
        <div class="text item">Đến: {{ ticket.end_location }}</div>
        <div class="text item">Loại vé: {{ ticket.type == 'normal' ? 'Bình dân' : 'VIP' }}</div>
        <div class="text item">Giá vé: {{ ticket.price }} VNĐ</div>
        <div class="text item">
          Tổng tiền:
          <span v-if="authUser">{{ ticket.total_price }} VNĐ</span>
          <router-link v-if="!authUser" to="/login">Đăng nhập</router-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" title="Chi tiết vé" width="30%">
    <div class="text item">Hãng: {{ viewTicket.air_company }}</div>
    <div class="text item">Xuất phát: {{ viewTicket.start_location }}</div>
    <div class="text item">Đến: {{ viewTicket.end_location }}</div>
    <div class="text item">Loại vé: {{ viewTicket.type }}</div>
    <div class="text item">Thời gian khởi hành: {{ viewTicket.start_time }}</div>
    <div class="text item">Số chuyến bay: {{ viewTicket.flight_number }}</div>
    <div class="text item">Giá vé: {{ viewTicket.price }} VNĐ</div>
    <div class="text item">Thuế phí liên quan: {{ viewTicket.tax }}</div>
    <div class="text item">Phí hàng ký gửi: {{ viewTicket.deposit_fee }}</div>
    <div class="text item">
      Tổng tiền:
      <span v-if="authUser">{{ viewTicket.total_price }} VNĐ</span>
      <router-link v-if="!authUser" to="/login">Đăng nhập</router-link>
    </div>
  </el-dialog>
</template>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

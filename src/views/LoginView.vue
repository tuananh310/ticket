<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

import { useAuthStore } from '@/stores'

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
})

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore()
  const { email, password } = values

  return authStore.login(email, password).catch((error) => setErrors({ apiError: error }))
}
</script>

<template>
  <el-row class="row-bg" justify="center" style="margin-top: 5rem">
    <el-col :span="6">
      <el-card class="box-card">
        <h2>Đăng nhập</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="form-group">
            <label>Email</label>
            <Field
              name="email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <Field
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="form-group">
            <button class="btn-submit" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              Đăng nhập
            </button>
          </div>
          <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
            {{ errors.apiError }}
          </div>
        </Form>
      </el-card>
    </el-col>
  </el-row>
</template>
<style>
.form-group {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}
.form-control {
  height: 1.5rem;
  margin-top: 0.5rem;
}
.btn-submit{
  background-color: #409eff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
}
</style>

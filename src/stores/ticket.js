import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'
import dayjs from 'dayjs'

const baseUrl = `${import.meta.env.VITE_API_URL}/ticket`

export const useTicketStore = defineStore({
  id: 'tickets',
  state: () => ({
    tickets: {}
  }),
  actions: {
    async get(params) {
      if(params.flight_date){
        params.flight_date = dayjs(params.flight_date).format('YYYY-M-D')
      }
      
      this.tickets = { loading: true }
      fetchWrapper
        .get(baseUrl, null, params)
        .then((tickets) => {
          this.tickets = tickets.data
        })
        .catch((error) => (this.tickets = { error }))
    }
  }
})

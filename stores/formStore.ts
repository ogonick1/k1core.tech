import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    name: '',
    phone: '',
  }),
  actions: {
    setFormData(data: { name: string; phone: string }) {
      this.name = data.name;
      this.phone = data.phone;
    },
  },
});

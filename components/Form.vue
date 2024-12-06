<template>
  <div class="p-4 lg:flex lg:items-center gap-10">
    <div class="p-4 flex lg:flex-row lg:items-center gap-10 flex-col-reverse">
      <div class="flex lg:flex-col flex-row-reverse justify-center gap-9">
        <div class="lg:flex-col">
          <div class="text-blue-700 text-lg">Телефон</div>
          <div>123-45-67</div>
        </div>
        <div>
          <div class="text-[#435FDD] text-lg">Електронна пошта</div>
          <div>email@gmail.com</div>
        </div>
      </div>
      <div class="flex lg:gap-9 lg:flex-col gap-5 justify-center">
        <div class="flex lg:gap-9 gap-5">
          <a href="#"
            ><img
              width="64"
              src="../assets/icons/twitter.png"
              alt="social-icon"
          /></a>
          <a href="#"
            ><img
              width="64"
              src="../assets/icons/facebook.png"
              alt="social-icon"
          /></a>
        </div>
        <div class="flex lg:gap-9 gap-5">
          <a href="#"
            ><img width="64" src="../assets/icons/vk.png" alt="social-icon"
          /></a>
          <a href="#"
            ><img
              width="64"
              src="../assets/icons/instagramm.png"
              alt="social-icon"
          /></a>
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col items-center rounded-lg">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
        <div class="flex gap-10 lg:flex-row flex-col justify-center">
          <div class="flex flex-col justify-center items-center">
            <Field
              placeholder="Ваше ім'я"
              name="name"
              as="input"
              class="mt-1 p-2 ps-8 border rounded-3xl lg:w-56 w-80 h-14"
              type="text"
            />
            <ErrorMessage name="name" class="text-red-500 text-sm" />
          </div>
          <div class="flex flex-col justify-center items-center">
            <Field
              placeholder="Ваш телефон"
              name="phone"
              as="input"
              class="mt-1 p-2 ps-8 border lg:w-56 h-14 rounded-3xl w-80"
              type="tel"
            />
            <ErrorMessage name="phone" class="text-red-500 text-sm" />
          </div>
        </div>
        <div class="flex gap-10 lg:flex-row flex-col-reverse">
          <button
            type="submit"
            class="p-2 bg-red-500 text-white rounded-3xl w-56 h-14"
          >
            Записатися
          </button>
          <div class="text-sm w-52 text-center items-center flex">
            Наш менеджер свяжется с вами в течении дня
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, Field, ErrorMessage } from "vee-validate";
import { object, string } from "yup";
import { useFormStore } from "~/stores/formStore";

interface FormValues {
  name: string;
  phone: string;
}

const schema = object({
  name: string().required("Ім’я обов’язкове"),
  phone: string().required("Телефон обов’язковий"),
});

const { handleSubmit, resetForm } = useForm<FormValues>({
  validationSchema: schema,
});

const store = useFormStore();

const onSubmit = handleSubmit(async (values) => {
  store.setFormData(values);

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  alert(
    `Ваші дані: Ім’я - ${values.name}, Телефон - ${
      values.phone
    }. Відповідь: ${JSON.stringify(data)}`
  );
  resetForm();
});
</script>

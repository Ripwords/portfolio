<script lang="ts" setup>
import { formSchema } from "#shared/form"
import type { FormError } from "#ui/types"

const toast = useToast()
const formState = reactive({
  email: undefined,
  subject: undefined,
  text: undefined,
  name: undefined,
})

const formValidation = (state: typeof formState): FormError[] => {
  const errors: FormError[] = []
  if (!state.email) {
    errors.push({
      path: "email",
      message: "Email is required",
    })
  }
  if (!state.subject) {
    errors.push({
      path: "subject",
      message: "Subject is required",
    })
  }
  if (!state.text) {
    errors.push({
      path: "text",
      message: "Text is required",
    })
  }
  if (!state.name) {
    errors.push({
      path: "name",
      message: "Name is required",
    })
  }
  return errors
}

const sendMail = async () => {
  try {
    await $fetch("/api/contact/send", {
      method: "POST",
      body: {
        email: formState.email,
        subject: formState.subject,
        text: formState.text,
        name: formState.name,
      },
    })
    toast.add({
      title: "Success",
      description: "Mail sent successfully",
      icon: "i-heroicons-check-circle",
      color: "green",
      timeout: 3000,
    })
  } catch {
    toast.add({
      title: "Failed to Submit",
      description: "Please try again later",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    })
  }
}
</script>

<template>
  <div class="p-4">
    <UCard>
      <template #header>
        <div class="relative">
          <div class="absolute top-0 left-0 text-2xl font-bold">
            Get in touch!
          </div>
          <div class="w-full h-[300px] relative">
            <ObjectSaturn />
          </div>
        </div>
      </template>

      <UForm
        class="space-y-4"
        :state="formState"
        :schema="formSchema"
        :validation="formValidation"
        @submit="sendMail"
      >
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput
            v-model="formState.email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup
          label="Name"
          name="name"
        >
          <UInput
            v-model="formState.name"
            placeholder="John Doe"
            icon="i-heroicons-user"
          />
        </UFormGroup>

        <UFormGroup
          label="Subject"
          name="subject"
        >
          <UInput
            v-model="formState.subject"
            placeholder="Hello World"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup
          label="Text"
          name="text"
        >
          <UInput
            v-model="formState.text"
            placeholder="Hello World"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <div class="flex justify-end">
          <UButton type="submit">Contact Me</UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

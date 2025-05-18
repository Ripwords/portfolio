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

const isSending = ref(false)
const formValidation = (state: typeof formState): FormError[] => {
  const errors: FormError[] = []
  if (!state.email) {
    errors.push({
      name: "email",
      message: "Email is required",
    })
  }
  if (!state.subject) {
    errors.push({
      name: "subject",
      message: "Subject is required",
    })
  }
  if (!state.text) {
    errors.push({
      name: "text",
      message: "Text is required",
    })
  }
  if (!state.name) {
    errors.push({
      name: "name",
      message: "Name is required",
    })
  }
  return errors
}

const sendMail = async () => {
  isSending.value = true
  try {
    await $fetch("/api/mail/send", {
      method: "POST",
      body: {
        from: formState.email,
        subject: formState.subject,
        content: formState.text,
        name: formState.name,
      },
    })
    toast.add({
      title: "Success",
      description: "Mail sent successfully",
      icon: "i-heroicons-check-circle",
      color: "primary",
    })
  } catch (error) {
    if (
      error instanceof Error &&
      "statusCode" in error &&
      error.statusCode === 429
    ) {
      toast.add({
        title: "Too many requests",
        description: "Please try again later",
        icon: "i-heroicons-exclamation-circle",
        color: "error",
      })
    } else {
      toast.add({
        title: "Failed to Submit",
        description: "Please try again later",
        icon: "i-heroicons-exclamation-circle",
        color: "error",
      })
    }
  } finally {
    isSending.value = false
    for (const key in formState) {
      formState[key as keyof typeof formState] = undefined
    }
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
            <LazyObjectSaturn />
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
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="formState.email"
            class="w-full"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormField>

        <UFormField
          label="Name"
          name="name"
        >
          <UInput
            v-model="formState.name"
            class="w-full"
            placeholder="John Doe"
            icon="i-heroicons-user"
          />
        </UFormField>

        <UFormField
          label="Subject"
          name="subject"
        >
          <UInput
            v-model="formState.subject"
            class="w-full"
            placeholder="Hello World"
            icon="i-heroicons-envelope"
          />
        </UFormField>

        <UFormField
          label="Text"
          name="text"
        >
          <UInput
            v-model="formState.text"
            class="w-full"
            placeholder="Hello World"
            icon="i-heroicons-envelope"
          />
        </UFormField>

        <div class="flex justify-end">
          <UButton
            :loading="isSending"
            type="submit"
            >Contact Me</UButton
          >
        </div>
      </UForm>
    </UCard>
  </div>
</template>

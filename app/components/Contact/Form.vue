<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod"
import * as z from "zod"
import { useForm } from "vee-validate"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { toast } from "vue-sonner"

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    text: z.string().min(1, { message: "Text is required" }),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const isSending = ref(false)

interface FetchError extends Error {
  statusCode?: number
  data?: {
    statusCode?: number
  }
}

const onSubmit = form.handleSubmit(async (values) => {
  isSending.value = true
  try {
    await $fetch("/api/mail/send", {
      method: "POST",
      body: {
        from: values.email,
        subject: values.subject,
        content: values.text,
        name: values.name,
      },
    })
    toast.success("Mail sent successfully")
    form.resetForm()
  } catch (e) {
    const error = e as FetchError
    let statusCode = 500 // Default to 500

    if (error.statusCode) {
      statusCode = error.statusCode
    } else if (error.data && error.data.statusCode) {
      statusCode = error.data.statusCode
    }

    if (statusCode === 429) {
      toast.error("Too many requests", {
        description: "Please try again later",
      })
    } else {
      toast.error("Failed to Submit", {
        description: "Please try again later",
      })
    }
  } finally {
    isSending.value = false
  }
})
</script>

<template>
  <div class="p-4 flex justify-center w-full">
    <Card
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="800"
      class="w-full max-w-3xl"
    >
      <CardHeader
        v-motion
        :initial="{ opacity: 0, x: -40 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="1000"
      >
        <div
          class="relative flex flex-col items-center justify-center h-[300px]"
        >
          <div class="absolute top-0 left-0 text-2xl font-bold">
            <CardTitle>Get in touch!</CardTitle>
          </div>
          <div
            class="w-full absolute top-0 left-0 overflow-hidden bottom-0 right-0"
          >
            <LazyObjectSaturn />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          class="space-y-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="email"
          >
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="name"
          >
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="subject"
          >
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Hello World"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="text"
          >
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-end">
            <Button
              :disabled="isSending"
              type="submit"
            >
              <span
                v-if="isSending"
                class="i-lucide-loader-2 animate-spin mr-2"
              />
              Contact Me
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "vue-sonner";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    text: z.string().min(1, { message: "Text is required" }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const isSending = ref(false);

interface FetchError extends Error {
  statusCode?: number;
  data?: {
    statusCode?: number;
  };
}

const onSubmit = form.handleSubmit(async (values) => {
  isSending.value = true;
  try {
    await $fetch("/api/mail/send", {
      method: "POST",
      body: {
        from: values.email,
        subject: values.subject,
        content: values.text,
        name: values.name,
      },
    });
    toast.success("Mail sent successfully");
    form.resetForm();
  } catch (e) {
    const error = e as FetchError;
    let statusCode = 500; // Default to 500

    if (error.statusCode) {
      statusCode = error.statusCode;
    } else if (error.data && error.data.statusCode) {
      statusCode = error.data.statusCode;
    }

    if (statusCode === 429) {
      toast.error("Too many requests", {
        description: "Please try again later",
      });
    } else {
      toast.error("Failed to Submit", {
        description: "Please try again later",
      });
    }
  } finally {
    isSending.value = false;
  }
});
</script>

<template>
  <div class="flex justify-center w-full">
    <Card
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :duration="800"
      class="w-full max-w-3xl"
    >
      <CardHeader class="space-y-2">
        <div class="flex items-center gap-3">
          <Icon name="lucide:mail" class="size-6 text-primary" />
          <CardTitle class="text-2xl font-bold">Get in touch!</CardTitle>
        </div>
        <CardDescription>
          Have a project in mind, want to collaborate, or just say hello? Drop me a message.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-5" @submit="onSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="subject">
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Hello World" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="text">
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  class="min-h-[120px]"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-end pt-2">
            <Button :disabled="isSending" type="submit" size="lg">
              <Icon v-if="isSending" name="lucide:loader-2" class="size-4 animate-spin mr-2" />
              <Icon v-else name="lucide:send" class="size-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

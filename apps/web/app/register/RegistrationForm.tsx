'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/services/models/Auth';
import { registerVoterDetails } from '@/services/DAO/votersRegistry';
import { formToVoterDetails } from '@/services/models/VoterDetails';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { PasswordInput } from '@/components/ui/password-input';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingButton } from '@/components/ui/loading-button';

const formSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string().min(1, 'Full name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    dateOfBirth: z.string().datetime(),
    placeOfBirth: z.string().min(1, 'Place of birth is required'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const router = useRouter();
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: new Date().toISOString(),
      placeOfBirth: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const uid = await registerUser({
        email: data.email,
        password: data.password,
      });
      const updates = formToVoterDetails(data, uid);
      const voter = await registerVoterDetails(updates);

      if (voter) router.push('/dashboard');
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: error?.toString(),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {form.formState.errors.root && (
          <FormMessage className="text-destructive mb-2">
            {form.formState.errors.root.message}
          </FormMessage>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  label="Email address"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput label="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput label="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  type="password"
                  label="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placeOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput label="Place of birth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={() => (
            <FormItem className="flex flex-col mb-3">
              <DateTimePicker
                displayFormat={{ hour24: 'PPP' }}
                granularity="day"
                value={new Date(form.watch('dateOfBirth'))}
                onChange={(value) => {
                  form.setValue('dateOfBirth', value?.toISOString() || '');
                }}
                className="w-full"
              />
              <FormLabel className="text-muted-foreground">
                Date of birth
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex items-start gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel className="text-xs">
                  I hereby agree that all information above are correct.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <LoadingButton
          className="w-full"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Register
        </LoadingButton>

        <div className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}

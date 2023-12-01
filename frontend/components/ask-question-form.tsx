'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';

export function AskQuestionForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const askFormSchema = z.object({
    question: z.string().max(160).min(4),
  });

  type AskFormSchema = z.infer<typeof askFormSchema>;

  const defaultValues: Partial<AskFormSchema> = {
    question: '',
  };

  const form = useForm<AskFormSchema>({
    resolver: zodResolver(askFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: AskFormSchema) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='question'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ask a question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Drop your question here'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </div>
  );
}

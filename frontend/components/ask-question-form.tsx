'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGeolocated } from 'react-geolocated';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Spinner } from './ui/spinner';

export function AskQuestionForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const askFormSchema = z.object({
    title: z.string().max(80).min(6),
    content: z.string().max(160).min(20),
    location: z.object({
      longitude: z.number(),
      latitude: z.number(),
    }),
  });

  type AskFormSchema = z.infer<typeof askFormSchema>;

  const defaultValues: Partial<AskFormSchema> = {
    title: '',
    content: '',
    location: { longitude: 0, latitude: 0 },
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const form = useForm<AskFormSchema>({
    resolver: zodResolver(askFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: AskFormSchema) {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/questions/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          location: {
            longitude: coords?.longitude,
            latitude: coords?.latitude,
          },
        }),
      });

      const fetchedData = await response.json();
      if (!response.ok) {
        toast({
          variant: 'destructive',
          description: `${JSON.stringify(fetchedData.message, null, 2)}`,
        });
        setLoading(false);
        return;
      } else {
        toast({
          description: 'You successfully posted a question',
        });
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
    }
  }
  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 my-2'>
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Type a title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Drop your question here'
                    className='resize w-[400px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='disabled:cursor-not-allowed disabled:opacity-50'
            type='submit'
            disabled={loading}
            style={{ borderRadius: '0.3rem' }}
          >
            {loading ? <Spinner /> : 'Post'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

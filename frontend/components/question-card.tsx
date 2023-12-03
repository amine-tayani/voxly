import { MessageCircle, ThumbsUp } from 'lucide-react';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function QuestionCard() {
  return (
    <Card>
      <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 p-4 space-y-0'>
        <div className='space-y-1'>
          <CardTitle>James</CardTitle>
          <CardDescription>How does photosynthesis work?</CardDescription>
        </div>
        <Button size='xs' variant='fb' className='shadow-none'>
          <ThumbsUp className='mr-2 h-4 w-4' />
          Like
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <MessageCircle className='mr-1 h-3 w-3' />
            20 answers
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Calendar, MessageCircle, ThumbsUp } from 'lucide-react';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { getRelativeTime } from '~/lib/relative-time';
import { useCallback, useRef, useState } from 'react';

//@ts-ignore

export function QuestionCard({ question }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card>
      <CardHeader className='grid grid-cols-[1fr_110px] items-start p-4 space-y-0'>
        <div className='space-y-1'>
          <CardTitle>{question.title}</CardTitle>
        </div>
        <Button size='xs' variant='fb' className='shadow-none'>
          <ThumbsUp className='mr-2 h-4 w-4' />
          Like
        </Button>
      </CardHeader>
      <CardContent>{question.content}</CardContent>
      <CardFooter>
        <div className='flex justify-between space-x-4 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <MessageCircle className='mr-1 h-3 w-3' />
            20 answers
          </div>
          <div className='text-muted-foreground flex flex-1 items-center gap-2'>
            <Calendar className=' h-4 w-4' />
            <span className='text-xs'>
              {getRelativeTime(question.createdAt)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

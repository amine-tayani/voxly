import { Metadata } from 'next';
import { AskQuestionForm } from '~/components/ask-question-form';
import { QuestionFeed } from '~/components/question-feed';

export const metadata: Metadata = {
  title: 'Feed - Voxly',
  description: 'Feed page',
};

export default function FeedPage() {
  return (
    <>
      <div className='hidden flex-col md:flex'>
        <div className='flex flex-col justify-center mx-auto p-4'>
          <AskQuestionForm />
          <QuestionFeed />
        </div>
      </div>
    </>
  );
}

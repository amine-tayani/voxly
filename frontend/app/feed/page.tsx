import { Metadata } from 'next';
import { AskQuestionForm } from '~/components/ask-question-form';
import { MainNav } from '~/components/main-nav';
import { QuestionCard } from '~/components/question-card';
import { UserNav } from '~/components/user-dropdown';

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
        </div>
      </div>
    </>
  );
}

import { Metadata } from 'next';
import { AskQuestionForm } from '~/components/ask-question-form';
import { MainNav } from '~/components/main-nav';
import { UserNav } from '~/components/user-dropdown';

export const metadata: Metadata = {
  title: 'Feed - Voxly',
  description: 'Feed page',
};

export default function FeedPage() {
  return (
    <>
      <div className='hidden flex-col md:flex'>
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            <MainNav className='mx-6' />
            <div className='ml-auto flex items-center space-x-4'>
              <UserNav />
            </div>
          </div>
        </div>
        <AskQuestionForm />
      </div>
    </>
  );
}

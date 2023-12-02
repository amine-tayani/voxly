import { Metadata } from 'next';
import { CreateAccountForm } from '~/components/auth/signup/form';

export const metadata: Metadata = {
  title: 'Voxly - Sign up',
  description: 'Signup page',
};

export default function SignupPage() {
  return (
    <>
      <div className='container flex h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Create an account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email below to create your account
              </p>
            </div>
            <CreateAccountForm />
          </div>
        </div>
      </div>
    </>
  );
}

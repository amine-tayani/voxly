import Link from 'next/link';
import { Metadata } from 'next';
import { ResetPasswordForm } from '~/components/reset-password-form';

export const metadata: Metadata = {
  title: 'Voxly - Login',
  description: 'Login page',
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className='container flex h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Reset Your Password
              </h1>
            </div>
            <ResetPasswordForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              <Link href='/login' className=' hover:text-primary'>
                Back to Login
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

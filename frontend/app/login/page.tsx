import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { LoginAccountForm } from '~/components/auth/login/form';

export const metadata: Metadata = {
  title: 'Voxly - Login',
  description: 'Login page',
};

export default function LoginPage() {
  const token = getCookie('token');
  if (token) redirect('/feed');

  return (
    <>
      <div className='container flex h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Log in to your account
              </h1>
            </div>
            <LoginAccountForm />
          </div>
        </div>
      </div>
    </>
  );
}

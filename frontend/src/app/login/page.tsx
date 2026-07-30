import LoginComponent from '@/components/appComponent/loginComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <LoginComponent />;
}

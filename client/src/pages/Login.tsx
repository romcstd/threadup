import { LoginForm } from '@/components/LoginForm';

export interface LoginProps { }
export const Login = ({ }: LoginProps) => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </section>
  );
};
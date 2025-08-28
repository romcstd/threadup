import { RegisterForm } from '@/components/RegisterForm';

export interface RegisterProps { }
export const Register = ({ }: RegisterProps) => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </section>
  );
};
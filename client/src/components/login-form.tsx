import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/assets/logo/logo-with-text.png';
// import DarkLogo from '@/assets/logo/dark-logo-with-text.png';

interface FormData {
    email: string;
    password: string;
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isError = useAuthStore((state) => state.isError);
    const isSuccess = useAuthStore((state) => state.isSuccess);
    const message = useAuthStore((state) => state.message);
    const login = useAuthStore((state) => state.login);
    const reset = useAuthStore((state) => state.reset);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/dashboard');
        }

        reset();
    }, [user, isError, isSuccess, message, navigate, reset]);

    const formOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const formOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="w-48" />
                        </Link>
                    </div>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formOnSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="m@example.com"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={formOnChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={formOnChange}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Log In
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

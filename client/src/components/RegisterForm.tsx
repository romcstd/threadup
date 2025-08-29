import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { cn } from '@/lib/utils'
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
import DarkLogo from '@/assets/logo/dark-logo-with-text.png';
import { useThemeStore } from "@/stores/useThemeStore";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = formData;
    const navigate = useNavigate();

    const user = useAuthStore(state => state.user);
    const isLoading = useAuthStore(state => state.isLoading);
    const isError = useAuthStore(state => state.isError);
    const isSuccess = useAuthStore(state => state.isSuccess);
    const message = useAuthStore(state => state.message);
    const register = useAuthStore(state => state.register);
    const reset = useAuthStore(state => state.reset);
    
    const theme = useThemeStore(state => state.theme);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
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
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }
        await register({ name, email, password });
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
                            <img src={theme === "light" ? Logo : DarkLogo} alt="Logo" className="w-48" />
                        </Link>
                    </div>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formOnSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={formOnChange}
                                />
                            </div>
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
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    autoComplete="confirm-password"
                                    value={confirmPassword}
                                    onChange={formOnChange}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

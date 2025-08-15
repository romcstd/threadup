import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomeIntro = () => {
    return (
        <section className="max-w-5xl mx-auto py-16 px-8">
            <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-primary font-bold tracking-tighter text-2xl sm:text-3xl">Start Conversations. Share Ideas. Connect with Threads.</h2>
                    <p className="mt-4 text-zinc-500 mx-auto">Welcome to ThreadUp — a simple and powerful platform where you can post your thoughts, create threads, and engage with a growing community. Whether you’re sharing an idea, asking a question, or starting a discussion, ThreadUp brings your voice to the spotlight.</p>
                    <p className="mt-4 text-zinc-500 mx-auto">Sign in or create an account to connect with people who share your interests.</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Button asChild><Link to="/login">Log In</Link></Button>
                        <Button variant="secondary" asChild><Link to="/register">Sign Up</Link></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeIntro;

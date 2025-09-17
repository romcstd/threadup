import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const PageNotFound = () => {
    return (
        <section className="flex flex-1 flex-col items-center justify-center text-center p-6">
            <h1 className="text-8xl font-extrabold text-zinc-500">404</h1>
            <h2 className="mt-4 text-3xl font-bold text-gray-800">
                Sorry, this page isn't available
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Sorry, the page you're looking for might have been removed, renamed, or never existed.
            </p>
            <Button asChild className="mt-4" size="lg">
                <Link to="/">
                    Go Back
                </Link>
            </Button>
        </section>
    );
}
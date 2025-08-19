import React from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const PostCardSkeleton: React.FC = () => {
    return (
        <Card className="p-0 gap-0 animate-pulse">
            {/* Header */}
            <CardHeader className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <Skeleton className="w-10 h-10 rounded-full" />

                    <div className="flex justify-center items-center space-x-2">
                        {/* Username */}
                        <Skeleton className="h-4 w-28 rounded" />
                        {/* Timestamp */}
                        <Skeleton className="h-4 w-10 rounded" />
                    </div>
                </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="pb-4 pt-1 px-4 space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
            </CardContent>

            {/* Footer (actions) */}
            <CardFooter className="border-t px-2 !py-2 flex space-x-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
            </CardFooter>
        </Card>
    )
}

export default PostCardSkeleton

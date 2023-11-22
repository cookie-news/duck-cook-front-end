//Skeleton
import SkeletonFallbackListRecipeSection from "./_components/skeleton/SkeletonFallbackListRecipeSection";
import SkeletonFallbackUserHeaderSection from "./_components/skeleton/SkeletonFallbackUserHeaderSection";
import SkeletonFallbackUserInfoSection from "./_components/skeleton/SkeletonFallbackUserInfoSection";

export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col gap-8">
                <div>
                    <SkeletonFallbackUserHeaderSection />
                </div>
                <div>
                    <SkeletonFallbackUserInfoSection />
                </div>
            </div>
            <div className="flex gap-8 mt-10">
                <SkeletonFallbackListRecipeSection />
                <SkeletonFallbackListRecipeSection />
            </div>
        </div>
    );
}

import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseSkeleton } from "@/components/dashboard/CourseSkeleton";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatsRow } from "@/components/dashboard/StatsRow";

export default function DashboardPage() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <HeroTile name="Alex" />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <StatsRow />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Suspense fallback={<CourseSkeleton />}>
            <CourseGrid />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <ActivityTile />
        </div>
      </div>
    </section>
  );
}

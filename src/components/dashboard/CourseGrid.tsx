import { getCourses } from "@/lib/supabase/queries";
import { CourseCard } from "./CourseCard";
import { AlertCircle } from "lucide-react";

export async function CourseGrid() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    console.error("Supabase load error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";

    return (
      <div className="rounded-2xl bg-[#16161f] border border-red-500/20 p-6 flex items-center gap-3">
        <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-red-300">Couldn&apos;t load courses</p>
          <p className="text-xs text-white/40 mt-0.5">
            Error: {msg}. Check your Supabase connection and try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl bg-[#16161f] border border-white/5 p-6 text-center">
        <p className="text-sm text-white/40">No courses yet. Add some rows to your Supabase table.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3 px-1">
        Active Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}

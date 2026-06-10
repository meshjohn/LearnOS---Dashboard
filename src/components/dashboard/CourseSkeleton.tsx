export function CourseSkeleton() {
  return (
    <div>
      <div className="h-3 w-28 rounded-full bg-white/5 mb-3 ml-1 skeleton" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-[#16161f] border border-white/5 p-5 space-y-4"
          >
            <div className="w-10 h-10 rounded-xl skeleton" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded-full skeleton" />
              <div className="h-2.5 w-1/2 rounded-full skeleton" />
            </div>
            <div className="h-1.5 rounded-full skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}

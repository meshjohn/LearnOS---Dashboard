export default function DashboardLoading() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <article className="relative h-full min-h-[160px] rounded-2xl bg-[#16161f] border border-white/5 p-6 overflow-hidden">
            <div className="flex flex-col gap-3">
              <div className="h-3 w-24 rounded-full skeleton" />
              <div className="h-8 w-72 rounded-lg skeleton" />
              <div className="h-3 w-56 rounded-full skeleton" />
              <div className="flex items-center gap-2 mt-1">
                <div className="h-7 w-28 rounded-full skeleton" />
                <div className="h-3 w-16 rounded-full skeleton" />
              </div>
            </div>
          </article>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <article className="h-full min-h-[160px] rounded-2xl bg-[#16161f] border border-white/5 p-5 flex flex-col justify-between">
            <div className="h-2.5 w-20 rounded-full skeleton" />
            <div className="grid grid-cols-3 gap-3 mt-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-4 h-4 rounded skeleton" />
                  <div className="h-6 w-12 rounded skeleton" />
                  <div className="h-2.5 w-16 rounded-full skeleton" />
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="h-3 w-28 rounded-full bg-white/5 mb-3 ml-1 skeleton" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <article
                key={i}
                className="rounded-2xl bg-[#16161f] border border-white/5 p-5 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl skeleton" />
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded-full skeleton" />
                  <div className="h-2.5 w-1/2 rounded-full skeleton" />
                </div>
                <div className="h-1.5 rounded-full skeleton" />
              </article>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <article className="rounded-2xl bg-[#16161f] border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-2.5 w-28 rounded-full skeleton" />
              <div className="h-2.5 w-20 rounded-full skeleton" />
            </div>
            <div className="flex gap-1 overflow-hidden">
              {Array.from({ length: 20 }).map((_, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, di) => (
                    <div
                      key={di}
                      className="w-3 h-3 rounded-sm skeleton"
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-2.5 w-8 rounded-full skeleton" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-sm skeleton" />
              ))}
              <div className="h-2.5 w-8 rounded-full skeleton" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

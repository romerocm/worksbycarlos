export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-[500px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted"></div>
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  )
}


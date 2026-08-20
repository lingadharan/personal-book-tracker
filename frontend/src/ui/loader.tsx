export default function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600 sm:h-8 sm:w-8 sm:border-[3px] lg:h-10 lg:w-10 lg:border-4"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

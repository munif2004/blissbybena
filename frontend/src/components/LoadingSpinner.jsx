export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin">
        <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-500 rounded-full"></div>
      </div>
    </div>
  );
}

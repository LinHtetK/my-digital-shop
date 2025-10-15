export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-semibold text-red-600 mb-4">
        Access Denied 🚫
      </h1>
      <p className="text-lg text-gray-600">
        You don’t have permission to access this page.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}

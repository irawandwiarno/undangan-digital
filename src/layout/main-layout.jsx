// Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-red-500 flex justify-end">
      <div className="w-full md:max-w-95 min-h-screen bg-white relative">
        {children}
      </div>
    </div>
  );
}
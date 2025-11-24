'use client';

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 border-b bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Agnos Patient System</h1>
            <p className="text-xs text-gray-500">Real-time Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live</span>
        </div>
      </div>
    </header>
  );
}

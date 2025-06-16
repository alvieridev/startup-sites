import { Globe } from 'lucide-react'

export default function Header() {
  return (
    <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <h1 className="font-semibold text-3xl sm:text-5xl">Startup Sites</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          Manage your startup websites
        </p>
      </div>
  )
}

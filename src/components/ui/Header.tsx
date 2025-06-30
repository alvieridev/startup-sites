import { Globe } from 'lucide-react'

export default function Header() {
  return (
    <div className="bg-blue-600 text-white py-6 px-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <h1 className="font-semibold text-3xl sm:text-5xl">WorkSite Launcher</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          Manage your frequently visited websites
        </p>
      </div>
  )
}

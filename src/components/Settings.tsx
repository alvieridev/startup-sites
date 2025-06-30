
export default function Settings({isEnabled, toggleEnabled}: {isEnabled:boolean, toggleEnabled: (status: boolean) => void}) {
   
  return (
    <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-open on startup</h3>
                  <p className="text-sm text-gray-600">
                    Automatically open saved sites when browser starts
                  </p>
                </div>
                <button
          type="button"
          onClick={() => {
            toggleEnabled(!isEnabled)
          }}
          className={`
            relative inline-flex h-4 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isEnabled ? 'bg-blue-600' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={isEnabled}
        >
          <span
            className={`
              inline-block h-3 w-3  transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
              ${isEnabled ? 'translate-x-4' : 'translate-x-1'}
            `}
          />
        </button>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <h4 className="font-medium text-gray-900">How it works:</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Sites are saved locally on this browser</li>
                  <li>• When you start up your browser, saved sites open automatically</li>
                  <li>• You can disable auto-open anytime</li>
                  <li>• Use "Open All Sites Now" for manual opening</li>
                </ul>
              </div>
            </div>
    )
}

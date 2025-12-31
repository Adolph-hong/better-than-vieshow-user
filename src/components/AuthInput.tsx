import type { InputHTMLAttributes, ReactNode } from "react"

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  rightElement?: ReactNode
  error?: string
}

const AuthInput = ({ label, id, rightElement, error, className, ...props }: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-2 pt-4 first:pt-6">
      <label className="text-sm text-[#E5E5E5]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-lg border bg-transparent px-3 py-2 text-[#BDBDBD] placeholder-[#BDBDBD] focus:outline-none ${
            error ? "border-[#FF4D4F]" : "border-[#BDBDBD] focus:border-[#BDBDBD]"
          } ${rightElement ? "pr-10" : ""} ${className || ""}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-[#FF4D4F]">{error}</span>}
    </div>
  )
}

export default AuthInput

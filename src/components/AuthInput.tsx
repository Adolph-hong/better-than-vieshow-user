import type { InputHTMLAttributes, ReactNode } from "react"

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  rightElement?: ReactNode
}

const AuthInput = ({ label, id, rightElement, className, ...props }: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-2 pt-4 first:pt-6">
      <label className="text-[#E5E5E5]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-full border border-[#999999] bg-transparent px-4 py-3 text-white placeholder-[#A5A5A5] focus:border-white focus:outline-none ${
            rightElement ? "pr-10" : ""
          } ${className || ""}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthInput

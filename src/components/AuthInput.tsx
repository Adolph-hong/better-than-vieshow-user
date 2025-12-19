import type { InputHTMLAttributes, ReactNode } from "react"

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  rightElement?: ReactNode
}

const AuthInput = ({ label, id, rightElement, className, ...props }: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-2 pt-4 first:pt-6">
      <label className="text-sm text-[#E5E5E5]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-lg border border-[#BDBDBD] bg-transparent px-3 py-2 text-[#BDBDBD] placeholder-[#BDBDBD] focus:border-[#BDBDBD] focus:outline-none ${
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

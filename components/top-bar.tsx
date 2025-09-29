import Link from "next/link"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopBar() {
  return (
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-between text-sm">
          {/* Left side - Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              About Us
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              FAQs
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              LR Live Blog
            </a>
          </div>

          {/* Right side - Country selection and account */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 hover:text-slate-900">
              <img src="/uk-flag.png" alt="UK" className="w-4 h-3 mr-2 rounded-sm" />
              <span className="text-xs">UK</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            <div className="h-4 w-px bg-slate-300" />
            <Link href="/account/register" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              Sign Up
            </Link>
            <Link href="/account/login" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

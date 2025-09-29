import Link from "next/link"
import { Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartSidebar } from "@/components/cart-sidebar"

export function Header() {
  return (
    <header className="sticky top-10 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-16 bg-slate-900 flex items-center justify-center rounded">
                <span className="text-white font-bold text-lg">LR</span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:block">LR PARTS</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by part name, part no. keywords..."
                className="pl-10 pr-4 h-12 bg-white border-2 border-orange-400 focus:border-orange-500 rounded-l-md"
              />
              <Button className="absolute right-0 top-0 h-12 px-6 bg-orange-500 hover:bg-orange-600 rounded-l-none">
                Search
              </Button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white hidden md:flex">CONTACT US 📞</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/account/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <CartSidebar />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search for parts..." className="pl-10 pr-4 h-10 bg-muted/50 border-border" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t bg-slate-50">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Vehicle ▼
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Gifts Clothing & Accessories ▼
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Clearance
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Camping with ARB ▼
          </a>
          <a href="#" className="text-sm font-medium text-accent hover:text-primary transition-colors font-bold">
            • NEW •
          </a>
        </nav>
      </div>
    </header>
  )
}

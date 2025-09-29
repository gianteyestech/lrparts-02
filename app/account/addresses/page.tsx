"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { 
  Plus, 
  MapPin, 
  Edit, 
  Trash2, 
  Home, 
  Building, 
  Star,
  Check
} from "lucide-react"

// Mock addresses data
const addresses = [
  {
    id: 1,
    type: "home",
    isDefault: true,
    firstName: "John",
    lastName: "Smith",
    company: "",
    street: "123 Main Street",
    apartment: "Apt 4B",
    city: "Dublin",
    state: "Dublin",
    zipCode: "D01 Y123",
    country: "Ireland",
    phone: "+353 1 234 5678"
  },
  {
    id: 2,
    type: "work",
    isDefault: false,
    firstName: "John",
    lastName: "Smith",
    company: "TechCorp Ltd",
    street: "456 Business Park",
    apartment: "Suite 100",
    city: "Cork",
    state: "Cork",
    zipCode: "T12 AB34",
    country: "Ireland",
    phone: "+353 21 987 6543"
  },
  {
    id: 3,
    type: "other",
    isDefault: false,
    firstName: "John",
    lastName: "Smith",
    company: "",
    street: "789 Holiday Lane",
    apartment: "",
    city: "Galway",
    state: "Galway",
    zipCode: "H91 CD56",
    country: "Ireland",
    phone: "+353 91 555 0123"
  }
]

interface AddressFormData {
  firstName: string
  lastName: string
  company: string
  street: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  type: string
  isDefault: boolean
}

export default function CustomerAddresses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Ireland",
    phone: "",
    type: "home",
    isDefault: false
  })

  const handleInputChange = (field: keyof AddressFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Ireland",
      phone: "",
      type: "home",
      isDefault: false
    })
    setEditingAddress(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Address data:", formData)
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving address:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: any) => {
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company,
      street: address.street,
      apartment: address.apartment,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      type: address.type,
      isDefault: address.isDefault
    })
    setEditingAddress(address.id)
    setIsDialogOpen(true)
  }

  const handleDelete = async (addressId: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      // Simulate API call
      console.log("Deleting address:", addressId)
    }
  }

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "work":
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-blue-100 text-blue-800"
      case "work":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
            <p className="text-gray-600 mt-2">Manage your delivery addresses</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAddress 
                      ? "Update your address information below."
                      : "Add a new delivery address to your account."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Apt 4B, Suite 100, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="D01 Y123"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select 
                        value={formData.country}
                        onValueChange={(value) => handleInputChange('country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ireland">Ireland</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="Spain">Spain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+353 1 234 5678"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Address Type</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value) => handleInputChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isDefault"
                      checked={formData.isDefault}
                      onCheckedChange={(checked) => handleInputChange('isDefault', checked)}
                    />
                    <Label htmlFor="isDefault">Set as default address</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : editingAddress ? "Update Address" : "Add Address"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Address Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Addresses</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{addresses.length}</div>
              <p className="text-xs text-muted-foreground">
                Saved addresses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Address</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {addresses.find(a => a.isDefault)?.city || "Not set"}
              </div>
              <p className="text-xs text-muted-foreground">
                Primary delivery location
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium text-green-600">Ireland</div>
              <p className="text-xs text-muted-foreground">
                All addresses covered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Addresses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className={`relative ${address.isDefault ? 'ring-2 ring-primary' : ''}`}>
              {address.isDefault && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getAddressTypeIcon(address.type)}
                    <Badge variant="outline" className={getAddressTypeColor(address.type)}>
                      {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <div>
                  <p className="font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  {address.company && (
                    <p className="text-sm text-gray-600">{address.company}</p>
                  )}
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>{address.street}</p>
                  {address.apartment && <p>{address.apartment}</p>}
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
                
                {address.phone && (
                  <p className="text-sm text-gray-600">{address.phone}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {addresses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
              <p className="text-gray-500 mb-6">
                Add your first delivery address to get started.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Address
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerAuthGuard>
  )
}

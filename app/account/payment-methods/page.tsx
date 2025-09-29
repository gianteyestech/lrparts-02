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
  CreditCard, 
  Edit, 
  Trash2, 
  Star,
  Check,
  Shield,
  Calendar,
  Building
} from "lucide-react"

// Mock payment methods data
const paymentMethods = [
  {
    id: 1,
    type: "card",
    cardType: "visa",
    lastFour: "4532",
    expiryMonth: "12",
    expiryYear: "2026",
    holderName: "John Smith",
    isDefault: true,
    nickname: "Primary Card",
    billingAddress: {
      street: "123 Main Street",
      city: "Dublin",
      zip: "D01 Y123",
      country: "Ireland"
    }
  },
  {
    id: 2,
    type: "card",
    cardType: "mastercard",
    lastFour: "8901",
    expiryMonth: "08",
    expiryYear: "2025",
    holderName: "John Smith",
    isDefault: false,
    nickname: "Business Card",
    billingAddress: {
      street: "456 Business Park",
      city: "Cork",
      zip: "T12 AB34",
      country: "Ireland"
    }
  },
  {
    id: 3,
    type: "paypal",
    email: "john.smith@example.com",
    isDefault: false,
    nickname: "PayPal Account"
  }
]

interface PaymentFormData {
  type: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  holderName: string
  nickname: string
  isDefault: boolean
  billingAddress: {
    street: string
    apartment: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export default function CustomerPaymentMethods() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<PaymentFormData>({
    type: "card",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    holderName: "",
    nickname: "",
    isDefault: false,
    billingAddress: {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      country: "Ireland"
    }
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PaymentFormData],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      type: "card",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
      nickname: "",
      isDefault: false,
      billingAddress: {
        street: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        country: "Ireland"
      }
    })
    setEditingMethod(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Payment method data:", formData)
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving payment method:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (method: any) => {
    if (method.type === "card") {
      setFormData({
        type: method.type,
        cardNumber: "",
        expiryMonth: method.expiryMonth,
        expiryYear: method.expiryYear,
        cvv: "",
        holderName: method.holderName,
        nickname: method.nickname,
        isDefault: method.isDefault,
        billingAddress: method.billingAddress || {
          street: "",
          apartment: "",
          city: "",
          state: "",
          zip: "",
          country: "Ireland"
        }
      })
    }
    setEditingMethod(method.id)
    setIsDialogOpen(true)
  }

  const handleDelete = async (methodId: number) => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      // Simulate API call
      console.log("Deleting payment method:", methodId)
    }
  }

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  const getCardTypeColor = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return "bg-blue-100 text-blue-800"
      case "mastercard":
        return "bg-red-100 text-red-800"
      case "amex":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
      handleInputChange('cardNumber', formattedValue)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i)
  const months = [
    { value: "01", label: "01 - January" },
    { value: "02", label: "02 - February" },
    { value: "03", label: "03 - March" },
    { value: "04", label: "04 - April" },
    { value: "05", label: "05 - May" },
    { value: "06", label: "06 - June" },
    { value: "07", label: "07 - July" },
    { value: "08", label: "08 - August" },
    { value: "09", label: "09 - September" },
    { value: "10", label: "10 - October" },
    { value: "11", label: "11 - November" },
    { value: "12", label: "12 - December" }
  ]

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
            <p className="text-gray-600 mt-2">Manage your payment options</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingMethod ? "Edit Payment Method" : "Add New Payment Method"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingMethod 
                      ? "Update your payment method information below."
                      : "Add a new payment method to your account."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="type">Payment Type</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value) => handleInputChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.type === "card" && (
                    <>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryMonth">Expiry Month *</Label>
                          <Select 
                            value={formData.expiryMonth}
                            onValueChange={(value) => handleInputChange('expiryMonth', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="expiryYear">Expiry Year *</Label>
                          <Select 
                            value={formData.expiryYear}
                            onValueChange={(value) => handleInputChange('expiryYear', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="holderName">Cardholder Name *</Label>
                        <Input
                          id="holderName"
                          value={formData.holderName}
                          onChange={(e) => handleInputChange('holderName', e.target.value)}
                          placeholder="John Smith"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="nickname">Nickname (Optional)</Label>
                        <Input
                          id="nickname"
                          value={formData.nickname}
                          onChange={(e) => handleInputChange('nickname', e.target.value)}
                          placeholder="Primary Card, Business Card, etc."
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Billing Address</h4>
                        
                        <div>
                          <Label htmlFor="billingStreet">Street Address *</Label>
                          <Input
                            id="billingStreet"
                            value={formData.billingAddress.street}
                            onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                            placeholder="123 Main Street"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="billingApartment">Apartment/Suite (Optional)</Label>
                          <Input
                            id="billingApartment"
                            value={formData.billingAddress.apartment}
                            onChange={(e) => handleInputChange('billingAddress.apartment', e.target.value)}
                            placeholder="Apt 4B, Suite 100, etc."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingCity">City *</Label>
                            <Input
                              id="billingCity"
                              value={formData.billingAddress.city}
                              onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingState">State/Province *</Label>
                            <Input
                              id="billingState"
                              value={formData.billingAddress.state}
                              onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingZip">Postal Code *</Label>
                            <Input
                              id="billingZip"
                              value={formData.billingAddress.zip}
                              onChange={(e) => handleInputChange('billingAddress.zip', e.target.value)}
                              placeholder="D01 Y123"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingCountry">Country *</Label>
                            <Select 
                              value={formData.billingAddress.country}
                              onValueChange={(value) => handleInputChange('billingAddress.country', value)}
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
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isDefault"
                      checked={formData.isDefault}
                      onCheckedChange={(checked) => handleInputChange('isDefault', checked)}
                    />
                    <Label htmlFor="isDefault">Set as default payment method</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : editingMethod ? "Update Payment Method" : "Add Payment Method"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Payment Method Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Methods</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentMethods.length}</div>
              <p className="text-xs text-muted-foreground">
                Payment methods
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Method</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {paymentMethods.find(m => m.isDefault)?.type === "card" 
                  ? `•••• ${paymentMethods.find(m => m.isDefault)?.lastFour}`
                  : paymentMethods.find(m => m.isDefault)?.type || "Not set"
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Primary payment method
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium text-green-600">Secure</div>
              <p className="text-xs text-muted-foreground">
                256-bit SSL encryption
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={`relative ${method.isDefault ? 'ring-2 ring-primary' : ''}`}>
              {method.isDefault && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {method.type === "card" ? (
                      <CreditCard className="h-6 w-6 text-gray-600" />
                    ) : (
                      <Building className="h-6 w-6 text-blue-600" />
                    )}
                    <div>
                      {method.type === "card" ? (
                        <div>
                          <Badge variant="outline" className={getCardTypeColor(method.cardType!)}>
                            {method.cardType?.toUpperCase()}
                          </Badge>
                          {method.nickname && (
                            <p className="text-sm text-gray-600 mt-1">{method.nickname}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            PayPal
                          </Badge>
                          {method.nickname && (
                            <p className="text-sm text-gray-600 mt-1">{method.nickname}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {method.type === "card" ? (
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-mono">••••</span>
                      <span className="text-lg font-mono">••••</span>
                      <span className="text-lg font-mono">••••</span>
                      <span className="text-lg font-mono font-semibold">{method.lastFour}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Cardholder:</strong> {method.holderName}</p>
                      <p className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <strong>Expires:</strong> {method.expiryMonth}/{method.expiryYear}
                      </p>
                      {method.billingAddress && (
                        <p><strong>Billing:</strong> {method.billingAddress.city}, {method.billingAddress.country}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p><strong>Email:</strong> {method.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods yet</h3>
              <p className="text-gray-500 mb-6">
                Add your first payment method to make checkout faster and easier.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Payment Method
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex items-start space-x-3 p-6">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Your payment information is secure</h4>
              <p className="text-sm text-blue-700 mt-1">
                We use 256-bit SSL encryption and comply with PCI DSS standards to protect your payment data. 
                Your card details are never stored on our servers and are securely processed by our payment partners.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerAuthGuard>
  )
}

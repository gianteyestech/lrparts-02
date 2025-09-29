"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthGuard } from "@/components/admin/auth-guard"
import { 
  Save, 
  Upload, 
  Store, 
  Mail, 
  Globe, 
  Shield, 
  CreditCard, 
  Truck,
  Bell,
  Database
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "LR PARTS",
    storeDescription: "Premium Automotive Parts & Accessories",
    storeEmail: "info@lrparts.ie",
    storePhone: "+353 1 234 5678",
    storeAddress: "123 Industrial Estate, Dublin, Ireland",
    currency: "EUR",
    timezone: "Europe/Dublin",
    dateFormat: "DD/MM/YYYY",
    language: "en"
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    fromName: "LR PARTS",
    fromEmail: "noreply@lrparts.ie",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    enableSsl: true
  })

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    enableStripe: true,
    stripePublishableKey: "",
    stripeSecretKey: "",
    enablePaypal: true,
    paypalClientId: "",
    paypalClientSecret: "",
    enableCod: true,
    codFee: 5.00
  })

  // Shipping Settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 100,
    domesticShippingRate: 8.95,
    internationalShippingRate: 15.95,
    expressShippingRate: 12.95,
    enableLocalPickup: true,
    processingTime: "1-2 business days"
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnNewOrder: true,
    emailOnLowStock: true,
    emailOnNewCustomer: true,
    smsOnNewOrder: false,
    smsOnLowStock: false,
    lowStockThreshold: 10
  })

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "LR PARTS - Premium Automotive Parts & Accessories",
    metaDescription: "Your trusted source for high-quality automotive parts, accessories, and tools. Fast shipping, expert support, and competitive prices.",
    metaKeywords: "automotive parts, car parts, Land Rover parts, Range Rover parts, Ireland",
    googleAnalyticsId: "",
    facebookPixelId: "",
    enableSitemap: true,
    enableRobots: true
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Saving ${section} settings`)
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your store configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Store Settings</CardTitle>
                <CardDescription>Basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={generalSettings.storeName}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={generalSettings.storeEmail}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input
                      id="storePhone"
                      value={generalSettings.storePhone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={generalSettings.currency}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Dublin">Europe/Dublin</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ga">Irish (Gaeilge)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    value={generalSettings.storeDescription}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeDescription: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Textarea
                    id="storeAddress"
                    value={generalSettings.storeAddress}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                    rows={3}
                  />
                </div>

                <Button onClick={() => handleSave('general')} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Configure SMTP settings for transactional emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSsl"
                    checked={emailSettings.enableSsl}
                    onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableSsl: checked }))}
                  />
                  <Label htmlFor="enableSsl">Enable SSL/TLS</Label>
                </div>

                <Button onClick={() => handleSave('email')} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Email Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <div className="space-y-6">
              {/* Stripe */}
              <Card>
                <CardHeader>
                  <CardTitle>Stripe Payment Gateway</CardTitle>
                  <CardDescription>Configure Stripe for credit card payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableStripe"
                      checked={paymentSettings.enableStripe}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableStripe: checked }))}
                    />
                    <Label htmlFor="enableStripe">Enable Stripe</Label>
                  </div>

                  {paymentSettings.enableStripe && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                        <Input
                          id="stripePublishableKey"
                          value={paymentSettings.stripePublishableKey}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                          placeholder="pk_test_..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="stripeSecretKey">Secret Key</Label>
                        <Input
                          id="stripeSecretKey"
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                          placeholder="sk_test_..."
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* PayPal */}
              <Card>
                <CardHeader>
                  <CardTitle>PayPal Payment Gateway</CardTitle>
                  <CardDescription>Configure PayPal for online payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enablePaypal"
                      checked={paymentSettings.enablePaypal}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, enablePaypal: checked }))}
                    />
                    <Label htmlFor="enablePaypal">Enable PayPal</Label>
                  </div>

                  {paymentSettings.enablePaypal && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paypalClientId">Client ID</Label>
                        <Input
                          id="paypalClientId"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalClientId: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="paypalClientSecret">Client Secret</Label>
                        <Input
                          id="paypalClientSecret"
                          type="password"
                          value={paymentSettings.paypalClientSecret}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalClientSecret: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cash on Delivery */}
              <Card>
                <CardHeader>
                  <CardTitle>Cash on Delivery</CardTitle>
                  <CardDescription>Allow customers to pay upon delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableCod"
                      checked={paymentSettings.enableCod}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableCod: checked }))}
                    />
                    <Label htmlFor="enableCod">Enable Cash on Delivery</Label>
                  </div>

                  {paymentSettings.enableCod && (
                    <div>
                      <Label htmlFor="codFee">COD Fee (€)</Label>
                      <Input
                        id="codFee"
                        type="number"
                        step="0.01"
                        value={paymentSettings.codFee}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, codFee: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={() => handleSave('payments')} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Payment Settings"}
              </Button>
            </div>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Configuration</CardTitle>
                <CardDescription>Configure shipping rates and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (€)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      step="0.01"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="domesticShippingRate">Domestic Shipping Rate (€)</Label>
                    <Input
                      id="domesticShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.domesticShippingRate}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, domesticShippingRate: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="internationalShippingRate">International Shipping Rate (€)</Label>
                    <Input
                      id="internationalShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.internationalShippingRate}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, internationalShippingRate: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expressShippingRate">Express Shipping Rate (€)</Label>
                    <Input
                      id="expressShippingRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingRate}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingRate: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="processingTime">Processing Time</Label>
                    <Input
                      id="processingTime"
                      value={shippingSettings.processingTime}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, processingTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableLocalPickup"
                    checked={shippingSettings.enableLocalPickup}
                    onCheckedChange={(checked) => setShippingSettings(prev => ({ ...prev, enableLocalPickup: checked }))}
                  />
                  <Label htmlFor="enableLocalPickup">Enable Local Pickup</Label>
                </div>

                <Button onClick={() => handleSave('shipping')} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Shipping Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure when to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailOnNewOrder"
                        checked={notificationSettings.emailOnNewOrder}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailOnNewOrder: checked }))}
                      />
                      <Label htmlFor="emailOnNewOrder">New order received</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailOnLowStock"
                        checked={notificationSettings.emailOnLowStock}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailOnLowStock: checked }))}
                      />
                      <Label htmlFor="emailOnLowStock">Low stock alert</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailOnNewCustomer"
                        checked={notificationSettings.emailOnNewCustomer}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailOnNewCustomer: checked }))}
                      />
                      <Label htmlFor="emailOnNewCustomer">New customer registration</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">SMS Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="smsOnNewOrder"
                        checked={notificationSettings.smsOnNewOrder}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsOnNewOrder: checked }))}
                      />
                      <Label htmlFor="smsOnNewOrder">New order received</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="smsOnLowStock"
                        checked={notificationSettings.smsOnLowStock}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsOnLowStock: checked }))}
                      />
                      <Label htmlFor="smsOnLowStock">Low stock alert</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="0"
                    value={notificationSettings.lowStockThreshold}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, lowStockThreshold: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <Button onClick={() => handleSave('notifications')} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Configuration</CardTitle>
                <CardDescription>Optimize your store for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">{seoSettings.metaTitle.length}/60 characters</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">{seoSettings.metaDescription.length}/160 characters</p>
                </div>

                <div>
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    value={seoSettings.metaKeywords}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, metaKeywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={seoSettings.googleAnalyticsId}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                      placeholder="GA4-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                    <Input
                      id="facebookPixelId"
                      value={seoSettings.facebookPixelId}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                      placeholder="1234567890123456"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableSitemap"
                      checked={seoSettings.enableSitemap}
                      onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableSitemap: checked }))}
                    />
                    <Label htmlFor="enableSitemap">Generate XML Sitemap</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRobots"
                      checked={seoSettings.enableRobots}
                      onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableRobots: checked }))}
                    />
                    <Label htmlFor="enableRobots">Generate Robots.txt</Label>
                  </div>
                </div>

                <Button onClick={() => handleSave('seo')} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save SEO Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}


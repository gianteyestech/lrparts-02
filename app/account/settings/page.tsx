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
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { 
  Save, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  EyeOff,
  Camera,
  AlertCircle
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CustomerSettings() {
  const { state, updateProfile } = useCustomerAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: state.customer?.firstName || "",
    lastName: state.customer?.lastName || "",
    email: state.customer?.email || "",
    phone: state.customer?.phone || "",
    dateOfBirth: state.customer?.dateOfBirth || "",
    gender: state.customer?.gender || ""
  })

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotionalEmails: true,
    newsletterSubscription: true,
    smsNotifications: false,
    pushNotifications: true,
    orderReminders: true,
    stockAlerts: false,
    priceDropAlerts: true
  })

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    showPurchaseHistory: false,
    allowDataCollection: true,
    thirdPartySharing: false,
    marketingCommunications: true
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    try {
      await updateProfile(profileData)
      setSuccessMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setIsLoading(false)
      return
    }

    try {
      // Simulate password update
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage("Password updated successfully!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      console.error("Error updating password:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    setSuccessMessage("")

    try {
      // Simulate notification settings update
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage("Notification preferences updated!")
    } catch (error) {
      console.error("Error updating notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrivacyUpdate = async () => {
    setIsLoading(true)
    setSuccessMessage("")

    try {
      // Simulate privacy settings update
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage("Privacy settings updated!")
    } catch (error) {
      console.error("Error updating privacy settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
        </div>

        {successMessage && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="space-y-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile photo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6">
                    <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                    </div>
                    <div>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+353 1 234 5678"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={profileData.gender}
                          onValueChange={(value) => setProfileData(prev => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {passwordData.newPassword && passwordData.confirmPassword && 
                     passwordData.newPassword !== passwordData.confirmPassword && (
                      <Alert variant="destructive">
                        <AlertDescription>Passwords do not match</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" disabled={isLoading || passwordData.newPassword !== passwordData.confirmPassword}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Protect your account with SMS or authenticator app</p>
                    </div>
                    <Button variant="outline">Set Up 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Order Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">Get notified about order status changes</p>
                      </div>
                      <Switch
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderUpdates: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Reminders</p>
                        <p className="text-sm text-gray-500">Reminders for abandoned carts and reorders</p>
                      </div>
                      <Switch
                        checked={notificationSettings.orderReminders}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderReminders: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">Marketing Communications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-gray-500">Special offers and discounts</p>
                      </div>
                      <Switch
                        checked={notificationSettings.promotionalEmails}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, promotionalEmails: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter Subscription</p>
                        <p className="text-sm text-gray-500">Monthly newsletter with automotive tips</p>
                      </div>
                      <Switch
                        checked={notificationSettings.newsletterSubscription}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newsletterSubscription: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price Drop Alerts</p>
                        <p className="text-sm text-gray-500">Get notified when wishlist items go on sale</p>
                      </div>
                      <Switch
                        checked={notificationSettings.priceDropAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, priceDropAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">Stock Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Stock Alerts</p>
                        <p className="text-sm text-gray-500">Get notified when out-of-stock items are available</p>
                      </div>
                      <Switch
                        checked={notificationSettings.stockAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, stockAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleNotificationUpdate} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Profile Privacy</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select 
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Purchase History</p>
                        <p className="text-sm text-gray-500">Allow others to see your purchase history</p>
                      </div>
                      <Switch
                        checked={privacySettings.showPurchaseHistory}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showPurchaseHistory: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">Data & Analytics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Data Collection</p>
                        <p className="text-sm text-gray-500">Help us improve our service by collecting usage data</p>
                      </div>
                      <Switch
                        checked={privacySettings.allowDataCollection}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, allowDataCollection: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Third-Party Sharing</p>
                        <p className="text-sm text-gray-500">Allow sharing data with trusted partners</p>
                      </div>
                      <Switch
                        checked={privacySettings.thirdPartySharing}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, thirdPartySharing: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-gray-500">Allow personalized marketing based on your activity</p>
                      </div>
                      <Switch
                        checked={privacySettings.marketingCommunications}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, marketingCommunications: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handlePrivacyUpdate} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Privacy Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerAuthGuard>
  )
}

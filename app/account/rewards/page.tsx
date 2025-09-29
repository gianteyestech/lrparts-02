"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { 
  Gift, 
  Star, 
  Crown, 
  TrendingUp, 
  Calendar, 
  ShoppingBag,
  Award,
  Zap,
  Target,
  Clock
} from "lucide-react"

// Mock rewards data
const rewardsData = {
  currentPoints: 1420,
  pointsValue: 14.20, // €0.01 per point
  tier: "Silver",
  nextTier: "Gold",
  pointsToNextTier: 580,
  lifetimePoints: 3245,
  lifetimeSpent: 2840.65
}

const pointsHistory = [
  {
    id: 1,
    type: "earned",
    points: 120,
    description: "Purchase: Order #ORD-2024-001",
    date: "2024-01-15",
    orderId: "ORD-2024-001"
  },
  {
    id: 2,
    type: "redeemed",
    points: -500,
    description: "Discount: €5.00 off order",
    date: "2024-01-10",
    orderId: "ORD-2024-002"
  },
  {
    id: 3,
    type: "earned",
    points: 89,
    description: "Purchase: Order #ORD-2024-003",
    date: "2024-01-08",
    orderId: "ORD-2024-003"
  },
  {
    id: 4,
    type: "bonus",
    points: 200,
    description: "Welcome Bonus: Account created",
    date: "2024-01-01"
  },
  {
    id: 5,
    type: "earned",
    points: 156,
    description: "Purchase: Order #ORD-2023-124",
    date: "2023-12-28",
    orderId: "ORD-2023-124"
  }
]

const rewards = [
  {
    id: 1,
    title: "€5 Discount",
    description: "Get €5 off your next order",
    pointsCost: 500,
    type: "discount",
    value: 5.00,
    minOrder: 50,
    expiry: "90 days from redemption",
    popular: true
  },
  {
    id: 2,
    title: "€10 Discount",
    description: "Get €10 off your next order",
    pointsCost: 1000,
    type: "discount",
    value: 10.00,
    minOrder: 100,
    expiry: "90 days from redemption",
    popular: true
  },
  {
    id: 3,
    title: "€25 Discount",
    description: "Get €25 off your next order",
    pointsCost: 2500,
    type: "discount",
    value: 25.00,
    minOrder: 200,
    expiry: "90 days from redemption",
    popular: false
  },
  {
    id: 4,
    title: "Free Shipping",
    description: "Free standard shipping on any order",
    pointsCost: 300,
    type: "shipping",
    expiry: "30 days from redemption",
    popular: false
  },
  {
    id: 5,
    title: "Priority Support",
    description: "24/7 priority customer support for 3 months",
    pointsCost: 800,
    type: "service",
    expiry: "3 months from redemption",
    popular: false
  },
  {
    id: 6,
    title: "Exclusive Product Access",
    description: "Early access to new product releases",
    pointsCost: 1500,
    type: "access",
    expiry: "6 months from redemption",
    popular: false
  }
]

const tiers = [
  {
    name: "Bronze",
    min: 0,
    max: 999,
    pointsEarned: "1 point per €1",
    benefits: ["Standard shipping rates", "Basic customer support"],
    color: "bg-amber-100 text-amber-800"
  },
  {
    name: "Silver",
    min: 1000,
    max: 1999,
    pointsEarned: "1.25 points per €1",
    benefits: ["5% bonus points", "Priority customer support", "Free shipping on orders over €75"],
    color: "bg-gray-100 text-gray-800"
  },
  {
    name: "Gold",
    min: 2000,
    max: 4999,
    pointsEarned: "1.5 points per €1",
    benefits: ["10% bonus points", "VIP customer support", "Free shipping on all orders", "Exclusive deals"],
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    name: "Platinum",
    min: 5000,
    max: Infinity,
    pointsEarned: "2 points per €1",
    benefits: ["20% bonus points", "Dedicated account manager", "Free express shipping", "Early access to sales", "Personalized recommendations"],
    color: "bg-purple-100 text-purple-800"
  }
]

export default function CustomerRewards() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleRedeemReward = (rewardId: number, pointsCost: number) => {
    if (rewardsData.currentPoints >= pointsCost) {
      // Simulate API call
      console.log("Redeeming reward:", rewardId, "for", pointsCost, "points")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCurrentTier = () => {
    return tiers.find(tier => 
      rewardsData.currentPoints >= tier.min && rewardsData.currentPoints <= tier.max
    ) || tiers[0]
  }

  const getNextTier = () => {
    const currentTierIndex = tiers.findIndex(tier => 
      rewardsData.currentPoints >= tier.min && rewardsData.currentPoints <= tier.max
    )
    return currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null
  }

  const currentTier = getCurrentTier()
  const nextTier = getNextTier()
  const progressToNext = nextTier ? 
    ((rewardsData.currentPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Program</h1>
          <p className="text-gray-600 mt-2">Earn points with every purchase and unlock exclusive benefits</p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Points Balance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <CardTitle>Your Points Balance</CardTitle>
                </div>
                <Badge className={currentTier.color}>
                  <Crown className="h-3 w-3 mr-1" />
                  {currentTier.name} Member
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-primary">{rewardsData.currentPoints.toLocaleString()}</span>
                    <span className="text-lg text-gray-600">points</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Worth €{rewardsData.pointsValue.toFixed(2)} in rewards
                  </p>
                </div>

                {nextTier && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to {nextTier.name}</span>
                      <span>{rewardsData.pointsToNextTier} points to go</span>
                    </div>
                    <Progress value={progressToNext} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Lifetime Points</p>
                    <p className="text-lg font-semibold">{rewardsData.lifetimePoints.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lifetime Spent</p>
                    <p className="text-lg font-semibold">€{rewardsData.lifetimeSpent.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                {currentTier.name} Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                  {currentTier.pointsEarned}
                </div>
                {currentTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <Zap className="h-4 w-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Points</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Tier Progression */}
              <Card>
                <CardHeader>
                  <CardTitle>Membership Tiers</CardTitle>
                  <CardDescription>Unlock better benefits as you spend more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tiers.map((tier, index) => (
                      <Card 
                        key={tier.name} 
                        className={`relative ${currentTier.name === tier.name ? 'ring-2 ring-primary' : ''}`}
                      >
                        {currentTier.name === tier.name && (
                          <div className="absolute -top-2 -right-2">
                            <Badge className="bg-primary text-primary-foreground">
                              Current
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{tier.name}</CardTitle>
                            <Crown className={`h-5 w-5 ${
                              tier.name === "Bronze" ? "text-amber-600" :
                              tier.name === "Silver" ? "text-gray-600" :
                              tier.name === "Gold" ? "text-yellow-600" :
                              "text-purple-600"
                            }`} />
                          </div>
                          <p className="text-sm text-gray-600">
                            {tier.min === 0 ? "0" : tier.min.toLocaleString()}
                            {tier.max === Infinity ? "+" : ` - ${tier.max.toLocaleString()}`} points
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">
                              {tier.pointsEarned}
                            </div>
                            <div className="space-y-1">
                              {tier.benefits.slice(0, 2).map((benefit, idx) => (
                                <div key={idx} className="text-xs text-gray-600">
                                  • {benefit}
                                </div>
                              ))}
                              {tier.benefits.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{tier.benefits.length - 2} more benefits
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How to Earn Points */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Earn Points</CardTitle>
                  <CardDescription>Multiple ways to boost your rewards balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-start space-x-3">
                      <ShoppingBag className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Make Purchases</h4>
                        <p className="text-sm text-gray-600">Earn points with every euro spent based on your tier</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Write Reviews</h4>
                        <p className="text-sm text-gray-600">Get 50 points for each verified product review</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Gift className="h-6 w-6 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Special Promotions</h4>
                        <p className="text-sm text-gray-600">Bonus points during special events and holidays</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Redeem Points Tab */}
          <TabsContent value="redeem">
            <Card>
              <CardHeader>
                <CardTitle>Available Rewards</CardTitle>
                <CardDescription>Redeem your points for valuable rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className="relative">
                      {reward.popular && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-red-500 text-white">Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-semibold">{reward.pointsCost.toLocaleString()}</span>
                          </div>
                        </div>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {reward.value && (
                            <div className="text-2xl font-bold text-primary">
                              €{reward.value.toFixed(2)}
                            </div>
                          )}
                          
                          <div className="text-sm text-gray-600 space-y-1">
                            {reward.minOrder && (
                              <p>• Minimum order: €{reward.minOrder}</p>
                            )}
                            <p>• Expires: {reward.expiry}</p>
                          </div>

                          <Button 
                            className="w-full" 
                            disabled={rewardsData.currentPoints < reward.pointsCost}
                            onClick={() => handleRedeemReward(reward.id, reward.pointsCost)}
                          >
                            {rewardsData.currentPoints >= reward.pointsCost ? (
                              <>
                                <Gift className="h-4 w-4 mr-2" />
                                Redeem Now
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 mr-2" />
                                Need {(reward.pointsCost - rewardsData.currentPoints).toLocaleString()} more points
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Points History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>Track your points earnings and redemptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pointsHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "earned" ? "bg-green-100" :
                          transaction.type === "redeemed" ? "bg-red-100" :
                          "bg-blue-100"
                        }`}>
                          {transaction.type === "earned" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : transaction.type === "redeemed" ? (
                            <Gift className="h-4 w-4 text-red-600" />
                          ) : (
                            <Star className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.points > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.points > 0 ? "+" : ""}{transaction.points.toLocaleString()} points
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {pointsHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No points history yet</h3>
                    <p className="text-gray-500">
                      Start making purchases to earn your first points!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerAuthGuard>
  )
}

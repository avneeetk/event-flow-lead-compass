import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Users, Coins, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const [profileCompletion, setProfileCompletion] = useState(60); // 60% completed
  const [coinBalance, setCoinBalance] = useState(150);
  const [isProUser, setIsProUser] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(12);

  const profileItems = [
    { name: "Profile Photo", completed: false, points: 20 },
    { name: "Business Info", completed: true, points: 20 },
    { name: "Scheduling Links", completed: true, points: 20 },
    { name: "Social Handles", completed: true, points: 20 },
    { name: "Add Team Member", completed: false, points: 20 }
  ];

  const teamMembers = [
    { name: "Sarah Verma", role: "Admin", email: "sarah@pharmatech.com", status: "Active" },
    { name: "Rahul Kumar", role: "Assistant", email: "rahul@pharmatech.com", status: "Pending" }
  ];

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to WowPro",
      description: "Unlock Smart Reports & Team Delegation features.",
    });
  };

  const handleAddTeamMember = () => {
    if (!isProUser) {
      toast({
        title: "Upgrade Required",
        description: "Only 1 assistant allowed on free plan. Upgrade to add more team members.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Team Member Added",
      description: "Invitation sent successfully.",
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Settings</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">{coinBalance} WowCoins</span>
          </div>
          {!isProUser && (
            <Badge variant="outline" className="text-orange-600">
              Free Trial - {trialDaysLeft} days left
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="team">Team Access</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="coins">Coins</TabsTrigger>
        </TabsList>

        {/* My Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Complete your profile to unlock all features</span>
                  <span className="text-sm font-medium">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                
                <div className="space-y-3 mt-4">
                  {profileItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">+{item.points}%</span>
                        {!item.completed && (
                          <Button size="sm" variant="outline">Complete</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Sarah Verma" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Sales Lead" />
                </div>
              </div>
              <div>
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input id="businessEmail" defaultValue="sarah@pharmatech.com" disabled />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="PharmaTech Solutions" />
              </div>
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Access Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Team Members</CardTitle>
                <Button onClick={handleAddTeamMember} size="sm">
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{member.status}</p>
                    </div>
                  </div>
                ))}
                
                {!isProUser && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      Only 1 assistant allowed on free plan. 
                      <Button variant="link" className="p-0 h-auto text-orange-600" onClick={handleUpgrade}>
                        Upgrade to add more
                      </Button>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Free Trial</h3>
                    <Badge variant="outline">{trialDaysLeft} days left</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    You're currently on a 14-day free trial. Upgrade to continue using WOW Circle.
                  </p>
                  <Button onClick={handleUpgrade} className="w-full">
                    Upgrade to WowPro - ₹2,999/month
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">WowPro Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Unlimited team members</li>
                    <li>• Advanced analytics & reports</li>
                    <li>• Priority support</li>
                    <li>• 500 WowCoins monthly</li>
                    <li>• Custom branding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coins Tab */}
        <TabsContent value="coins" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">WowCoins Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Coins className="w-8 h-8 text-yellow-600" />
                    <span className="text-3xl font-bold text-yellow-600">{coinBalance}</span>
                  </div>
                  <p className="text-gray-600">Available WowCoins</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Coin Usage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">AI Snap card recognition</span>
                      <span className="text-sm font-medium">2 coins</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Email generator</span>
                      <span className="text-sm font-medium">1 coin</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Export ROI report</span>
                      <span className="text-sm font-medium">3 coins</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Buy More Coins
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;

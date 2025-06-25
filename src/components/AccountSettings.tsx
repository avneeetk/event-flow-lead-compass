
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User, Users, Coins, Lock, Camera, Download, Calendar, Globe, Phone, Linkedin, Instagram } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const [profileCompletion, setProfileCompletion] = useState(60);
  const [coinBalance, setCoinBalance] = useState(150);
  const [isProUser, setIsProUser] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(12);

  const profileItems = [
    { name: "Profile Photo", completed: false, points: 20, icon: Camera },
    { name: "Business Info", completed: true, points: 20, icon: Globe },
    { name: "Scheduling Links", completed: true, points: 20, icon: Calendar },
    { name: "Social Handles", completed: true, points: 20, icon: Linkedin },
    { name: "Add Team Member", completed: false, points: 20, icon: Users }
  ];

  const teamMembers = [
    { 
      name: "Sarah Verma", 
      role: "Admin", 
      email: "sarah@pharmatech.com", 
      status: "Active",
      avatar: "SV",
      initials: "SV"
    },
    { 
      name: "Rahul Kumar", 
      role: "Assistant", 
      email: "rahul@pharmatech.com", 
      status: "Pending",
      avatar: "RK",
      initials: "RK"
    }
  ];

  const handleUpgrade = () => {
    toast({
      title: "🚀 Upgrade to WowPro",
      description: "Unlock Smart Reports & Team Delegation features.",
    });
  };

  const handleAddTeamMember = () => {
    if (!isProUser) {
      toast({
        title: "🔒 Upgrade Required",
        description: "Only 1 assistant allowed on free plan. Upgrade to add more team members.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "✅ Team Member Added",
      description: "Invitation sent successfully.",
    });
  };

  const handleCompleteProfileItem = (index: number) => {
    const newCompletion = profileCompletion + 20;
    setProfileCompletion(newCompletion);
    
    if (newCompletion === 100) {
      toast({
        title: "🎉 Profile Complete!",
        description: "You've unlocked all profile benefits. Nice work!",
      });
    } else {
      toast({
        title: "✨ Profile Updated",
        description: `+20% completion. You're getting closer to 100%!`,
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="p-4 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">{coinBalance} WowCoins</span>
            </div>
            {!isProUser && (
              <Badge variant="outline" className="text-orange-600 border-orange-300 pill-tag">
                Free Trial - {trialDaysLeft} days left
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-1">
            <TabsTrigger value="profile" className="rounded-lg">My Profile</TabsTrigger>
            <TabsTrigger value="team" className="rounded-lg">Team Access</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-lg">Billing</TabsTrigger>
            <TabsTrigger value="coins" className="rounded-lg">Coins</TabsTrigger>
          </TabsList>

          {/* My Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full shimmer"></div>
                  <span>Profile Completion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Complete your profile to unlock all features</span>
                    <span className="text-sm font-semibold text-teal-600">{profileCompletion}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={profileCompletion} className="h-3 bg-slate-100" />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full h-3" 
                         style={{ width: `${profileCompletion}%` }}></div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {profileItems.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {item.completed ? (
                                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                              ) : (
                                <IconComponent className="w-4 h-4" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                              +{item.points}%
                            </span>
                            {!item.completed && (
                              <Button 
                                size="sm" 
                                className="btn-primary-soft text-xs px-3 py-1 h-auto"
                                onClick={() => handleCompleteProfileItem(index)}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold text-lg">
                      SV
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-900">Sarah Verma</h3>
                    <p className="text-sm text-slate-600">Sales Lead</p>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 p-0 h-auto">
                      <Camera className="w-4 h-4 mr-1" />
                      Change Photo
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Sarah Verma" className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Sales Lead" className="rounded-xl" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input 
                    id="businessEmail" 
                    defaultValue="sarah@pharmatech.com" 
                    disabled 
                    className="bg-slate-50 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 mt-1">Used for login credentials</p>
                </div>
                
                <div>
                  <Label htmlFor="alternateEmail">Alternate Contact Email</Label>
                  <Input 
                    id="alternateEmail" 
                    placeholder="sales@pharmatech.com" 
                    className="rounded-xl"
                  />
                  <p className="text-xs text-slate-500 mt-1">Optional, for lead communication</p>
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="PharmaTech Solutions" className="rounded-xl" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="www.pharmatech.com" className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Business</Label>
                    <Input id="whatsapp" placeholder="+91 98765 43210" className="rounded-xl" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="calendly">Scheduling Link</Label>
                  <Input id="calendly" placeholder="calendly.com/sarah-pharmatech" className="rounded-xl" />
                  <p className="text-xs text-slate-500 mt-1">Google Meet, Zoom, or Calendly link</p>
                </div>
                
                <Button className="w-full btn-primary-soft">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Access Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Team Members</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleAddTeamMember} size="sm" className="btn-primary-soft">
                        Add Member
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add a new team member</TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold text-sm">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={member.role === 'Admin' ? 'default' : 'secondary'}
                          className="pill-tag"
                        >
                          {member.role}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">{member.status}</p>
                      </div>
                    </div>
                  ))}
                  
                  {!isProUser && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                      <p className="text-sm text-orange-800">
                        Only 1 assistant allowed on free plan. 
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-orange-600 hover:text-orange-700" 
                          onClick={handleUpgrade}
                        >
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
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-blue-900">Free Trial</h3>
                      <Badge variant="outline" className="border-blue-300 text-blue-600">
                        {trialDaysLeft} days left
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-800 mb-4">
                      You're currently on a 14-day free trial. Upgrade to continue using WOW Circle.
                    </p>
                    <Button onClick={handleUpgrade} className="w-full btn-primary-soft">
                      Upgrade to WowPro - ₹2,999/month
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-700">WowPro Features</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Unlimited team members</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Advanced analytics & reports</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>500 WowCoins monthly</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Custom branding</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coins Tab */}
          <TabsContent value="coins" className="space-y-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-lg">WowCoins Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Coins className="w-8 h-8 text-amber-600" />
                      <span className="text-3xl font-bold text-amber-600">{coinBalance}</span>
                    </div>
                    <p className="text-slate-600">Available WowCoins</p>
                    <div className="mt-3 text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block">
                      💡 You've saved 4 hours this week with AI features
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-700">Coin Usage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-sm">AI Snap card recognition</span>
                        <span className="text-sm font-medium text-amber-600">2 coins</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-sm">Email generator</span>
                        <span className="text-sm font-medium text-amber-600">1 coin</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-sm">Export ROI report</span>
                        <span className="text-sm font-medium text-amber-600">3 coins</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full btn-secondary-soft">
                    Buy More Coins
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default AccountSettings;

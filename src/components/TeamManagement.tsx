import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, UserPlus, Settings, Trash2, Edit, Shield, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LockedFeature from './LockedFeature';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sarah Varma",
      email: "sarah@pharmatech.com",
      role: "Admin",
      status: "active",
      leadsAssigned: 47,
      joinDate: "Jan 2024"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh@pharmatech.com",
      role: "Field Rep",
      status: "active",
      leadsAssigned: 32,
      joinDate: "Feb 2024"
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@pharmatech.com",
      role: "Viewer",
      status: "active",
      leadsAssigned: 0,
      joinDate: "Mar 2024"
    }
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Field Rep'
  });

  const maxTeamMembers = 2; // Business Builder limit

  const handleAddMember = () => {
    if (teamMembers.length >= maxTeamMembers) {
      toast({
        title: "Team Limit Reached",
        description: `Your plan allows ${maxTeamMembers} team members. Upgrade to Enterprise for unlimited team members.`,
        variant: "destructive",
        action: (
          <Button size="sm" variant="outline">
            Upgrade
          </Button>
        )
      });
      return;
    }

    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and email for the new team member.",
        variant: "destructive"
      });
      return;
    }

    const member = {
      id: Date.now(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: "active",
      leadsAssigned: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: '', email: '', role: 'Field Rep' });
    setIsAddMemberOpen(false);
    
    toast({
      title: "Team Member Added",
      description: `${member.name} has been added to your team.`,
    });
  };

  const handleRemoveMember = (id: number) => {
    const member = teamMembers.find(m => m.id === id);
    if (member?.role === 'Admin' && teamMembers.filter(m => m.role === 'Admin').length === 1) {
      toast({
        title: "Cannot Remove Admin",
        description: "You cannot remove the last admin. Please assign another admin first.",
        variant: "destructive"
      });
      return;
    }

    setTeamMembers(teamMembers.filter(m => m.id !== id));
    toast({
      title: "Team Member Removed",
      description: `${member?.name} has been removed from your team.`,
    });
  };

  const handleRoleChange = (id: number, newRole: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    ));
    
    const member = teamMembers.find(m => m.id === id);
    toast({
      title: "Role Updated",
      description: `${member?.name} is now a ${newRole}.`,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Shield className="w-4 h-4" />;
      case 'Field Rep':
        return <User className="w-4 h-4" />;
      case 'Viewer':
        return <Eye className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Field Rep':
        return 'bg-blue-100 text-blue-800';
      case 'Viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeUsers = teamMembers.filter(m => m.status === 'active').length;
  const adminCount = teamMembers.filter(m => m.role === 'Admin').length;
  const repCount = teamMembers.filter(m => m.role === 'Field Rep').length;

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Management</h1>
        <p className="text-gray-600">Manage your team members and permissions</p>
        <Badge variant="outline" className="mt-2">
          Business Builder: {teamMembers.length}/{maxTeamMembers} members
        </Badge>
      </div>

      {/* Team Summary */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{activeUsers}</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{adminCount}</div>
              <div className="text-sm text-gray-500">Admins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{repCount}</div>
              <div className="text-sm text-gray-500">Field Reps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Member Button - Show locked state when at limit */}
      <div className="mb-6">
        {teamMembers.length >= maxTeamMembers ? (
          <LockedFeature 
            feature="Add 3rd+ Team Member" 
            planRequired="Enterprise"
            className="w-full"
          >
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600" disabled>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team Member (Limit Reached)
            </Button>
          </LockedFeature>
        ) : (
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Team Member ({teamMembers.length}/{maxTeamMembers})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Full Name</Label>
                  <Input
                    id="memberName"
                    placeholder="Enter team member's name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberEmail">Email Address</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberRole">Role</Label>
                  <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Field Rep">Field Rep</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddMember} className="w-full">
                  Add Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
        
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">Joined {member.joinDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getRoleBadgeColor(member.role)} mb-2`}>
                        <div className="flex items-center space-x-1">
                          {getRoleIcon(member.role)}
                          <span>{member.role}</span>
                        </div>
                      </Badge>
                      <p className="text-xs text-gray-500">{member.leadsAssigned} leads</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select
                      value={member.role}
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Field Rep">Field Rep</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Locked Advanced Analytics */}
      <LockedFeature 
        feature="Team ROI Breakdown" 
        planRequired="Enterprise"
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Advanced Team Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-semibold mb-2">Team ROI Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sarah Varma</span>
                    <span>$15,400 revenue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rajesh Kumar</span>
                    <span>$12,800 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </LockedFeature>

      {/* Role Permissions Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-red-600" />
              <div>
                <span className="font-semibold">Admin:</span> Full access, can manage team, assign leads, view all reports
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-semibold">Field Rep:</span> Can capture leads, follow up, view assigned leads
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Eye className="w-4 h-4 text-gray-600" />
              <div>
                <span className="font-semibold">Viewer:</span> Read-only access to leads and reports
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, Edit, Trash2, Shield, Mail, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member'
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@company.com",
      phone: "+91 98765 43210",
      role: "admin",
      status: "active",
      joinedAt: "2024-01-15",
      permissions: ["view_contacts", "send_emails", "view_roi", "manage_team"]
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@company.com",
      phone: "+91 87654 32109",
      role: "member",
      status: "active",
      joinedAt: "2024-02-01",
      permissions: ["view_contacts", "send_emails"]
    }
  ]);

  const rolePermissions = {
    admin: ["view_contacts", "send_emails", "view_roi", "manage_team", "assign_leads"],
    manager: ["view_contacts", "send_emails", "view_roi", "assign_leads"],
    member: ["view_contacts", "send_emails"]
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and email",
        variant: "destructive"
      });
      return;
    }

    const member = {
      id: Date.now(),
      ...newMember,
      status: "active",
      joinedAt: new Date().toISOString().split('T')[0],
      permissions: rolePermissions[newMember.role as keyof typeof rolePermissions]
    };

    setTeamMembers(prev => [...prev, member]);
    setNewMember({ name: '', email: '', phone: '', role: 'member' });
    setShowAddForm(false);
    
    toast({
      title: "Team Member Added",
      description: `${member.name} has been added to your team`
    });
  };

  const handleRemoveMember = (id: number) => {
    const member = teamMembers.find(m => m.id === id);
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    
    toast({
      title: "Member Removed",
      description: `${member?.name} has been removed from the team`
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionLabel = (permission: string) => {
    const labels: { [key: string]: string } = {
      view_contacts: "View Contacts",
      send_emails: "Send Emails",
      view_roi: "View ROI",
      manage_team: "Manage Team",
      assign_leads: "Assign Leads"
    };
    return labels[permission] || permission;
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Team Management
          </h1>
          <p className="text-gray-600">{teamMembers.length} team members</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <Card className="mb-6 border-cyan-200">
          <CardHeader>
            <CardTitle className="text-lg">Add New Team Member</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@company.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={newMember.phone}
                  onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 xxxxx xxxxx"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleAddMember} className="flex-1">
                Add Member
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{member.name}</h3>
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      {member.role === 'admin' && (
                        <Shield className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-2" />
                        {member.email}
                      </div>
                      {member.phone && (
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-2" />
                          {member.phone}
                        </div>
                      )}
                      <p>Joined: {new Date(member.joinedAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {getPermissionLabel(permission)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingMember(member)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  {member.role !== 'admin' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;

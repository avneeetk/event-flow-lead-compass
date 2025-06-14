
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, MessageSquare, Calendar, Check } from 'lucide-react';

const TeamCollaboration = () => {
  const [viewMode, setViewMode] = useState<'my' | 'team'>('my');

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Varma",
      role: "Lead Rep",
      avatar: "SV",
      leadsAssigned: 47,
      followUpsSent: 28,
      conversions: 3,
      status: "active"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Senior Rep",
      avatar: "RK",
      leadsAssigned: 32,
      followUpsSent: 29,
      conversions: 5,
      status: "active"
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Territory Rep",
      avatar: "PS",
      leadsAssigned: 28,
      followUpsSent: 22,
      conversions: 2,
      status: "active"
    }
  ];

  const sharedLeads = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      assignedTo: "Sarah Varma",
      assignedBy: "Team Lead",
      status: "pending",
      priority: "high",
      dueDate: "Today"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      assignedTo: "Rajesh Kumar",
      assignedBy: "Sarah Varma",
      status: "in-progress",
      priority: "medium",
      dueDate: "Tomorrow"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      company: "City General Hospital",
      assignedTo: "Priya Singh",
      assignedBy: "Sarah Varma",
      status: "completed",
      priority: "high",
      dueDate: "Completed"
    }
  ];

  const activities = [
    {
      id: 1,
      user: "Rajesh Kumar",
      action: "followed up with",
      target: "Dr. Amit Patel",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "Priya Singh",
      action: "converted",
      target: "MedTech Solutions",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      user: "Sarah Varma",
      action: "assigned lead",
      target: "Global Pharma Inc",
      timestamp: "6 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Collaboration</h1>
        <p className="text-gray-600">Manage shared leads and team performance</p>
      </div>

      {/* View Toggle */}
      <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
        <Button
          variant={viewMode === 'my' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('my')}
          className="flex-1"
        >
          My Leads
        </Button>
        <Button
          variant={viewMode === 'team' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('team')}
          className="flex-1"
        >
          Team Leads
        </Button>
      </div>

      {viewMode === 'team' && (
        <>
          {/* Team Performance */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h2>
            
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {member.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold">{member.leadsAssigned}</div>
                            <div className="text-gray-500">Leads</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{member.followUpsSent}</div>
                            <div className="text-gray-500">Follow-ups</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{member.conversions}</div>
                            <div className="text-gray-500">Conversions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shared Leads */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Assigned Leads</h2>
            
            <div className="space-y-3">
              {sharedLeads.map((lead) => (
                <Card key={lead.id} className={`border-l-4 ${getPriorityColor(lead.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                        <p className="text-xs text-gray-500">
                          Assigned to {lead.assignedTo} by {lead.assignedBy}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block w-2 h-2 rounded-full ${getStatusColor(lead.status)} mb-1`}></div>
                        <p className="text-xs text-gray-500">{lead.dueDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {lead.priority} priority
                      </Badge>
                      <div className="flex space-x-2">
                        {lead.status === 'pending' && (
                          <Button size="sm" variant="outline">
                            Reassign
                          </Button>
                        )}
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Recent Activity */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-semibold">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute left-8 mt-8 w-px h-4 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-16 flex flex-col space-y-1">
          <span className="font-semibold">Assign Lead</span>
          <span className="text-xs text-gray-500">Delegate to team</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col space-y-1">
          <span className="font-semibold">Team Report</span>
          <span className="text-xs text-gray-500">Export activity</span>
        </Button>
      </div>
    </div>
  );
};

export default TeamCollaboration;

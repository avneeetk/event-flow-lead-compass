
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, MessageSquare, Calendar } from 'lucide-react';

const ContactDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const mockLeads = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      role: "Chief Pharmacist",
      tags: ["Hot Lead", "Decision Maker"],
      capturedAt: "2 hours ago",
      notes: "Interested in our new diabetes medication line",
      urgency: "high"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      role: "Regional Manager",
      tags: ["Distributor", "Follow up tomorrow"],
      capturedAt: "4 hours ago",
      notes: "Looking for exclusive distribution rights",
      urgency: "medium"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      company: "City General Hospital",
      role: "Department Head",
      tags: ["Pharmacist", "Hot Lead"],
      capturedAt: "6 hours ago",
      notes: "Wants product demo for hospital pharmacy",
      urgency: "high"
    },
    {
      id: 4,
      name: "Amit Kumar",
      company: "PharmaTech Solutions",
      role: "Business Development",
      tags: ["Tech Integration"],
      capturedAt: "1 day ago",
      notes: "Interested in digital pharmacy solutions",
      urgency: "low"
    }
  ];

  const filters = ["All", "Hot Lead", "Pharmacist", "Distributor", "Decision Maker"];

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || lead.tags.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Dashboard</h1>
        <p className="text-gray-600">{filteredLeads.length} leads captured</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search leads by name or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className="whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className={`border-l-4 ${getUrgencyColor(lead.urgency)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <p className="text-sm text-gray-600">{lead.role}</p>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{lead.capturedAt}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {lead.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {lead.notes && (
                <div className="flex items-start space-x-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600">{lead.notes}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Follow Up
                </Button>
                <Button size="sm" variant="outline" className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No leads found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ContactDashboard;

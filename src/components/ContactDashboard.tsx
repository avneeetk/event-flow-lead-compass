
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, User, Building, Calendar, MessageSquare, Phone, Mail } from 'lucide-react';

const ContactDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'hot', label: 'Hot Lead', color: 'bg-red-500' },
    { id: 'warm', label: 'Warm Lead', color: 'bg-orange-500' },
    { id: 'cold', label: 'Cold Lead', color: 'bg-blue-500' },
    { id: 'distributor', label: 'Distributor', color: 'bg-green-500' },
    { id: 'doctor', label: 'Doctor', color: 'bg-purple-500' },
    { id: 'pharmacist', label: 'Pharmacist', color: 'bg-pink-500' },
    { id: 'decision-maker', label: 'Decision Maker', color: 'bg-yellow-500' },
  ];

  const contacts = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      designation: "Chief Pharmacist",
      email: "rakesh.sharma@medcore.com",
      phone: "+91 98765 43210",
      event: "BioAsia Expo 2024",
      capturedAt: "2 hours ago",
      tags: ["hot", "pharmacist", "decision-maker"],
      notes: "Interested in new diabetes medication line. Wants product demo next week.",
      followUpDue: "Tomorrow 2:00 PM",
      avatar: "RS"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      designation: "Regional Manager",
      email: "priya@healthfirst.com",
      phone: "+91 87654 32109",
      event: "BioAsia Expo 2024",
      capturedAt: "4 hours ago",
      tags: ["warm", "distributor"],
      notes: "Looking for exclusive distribution rights in Western region.",
      followUpDue: "Today 5:00 PM",
      avatar: "PP"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      company: "Metro Hospital",
      designation: "Head of Procurement",
      email: "sarah.j@metrohospital.com",
      phone: "+91 76543 21098",
      event: "BioAsia Expo 2024",
      capturedAt: "6 hours ago",
      tags: ["cold", "doctor"],
      notes: "Interested in bulk purchase for hospital chain.",
      followUpDue: "Next week",
      avatar: "SJ"
    }
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const getFilterLabel = (filterId: string) => {
    return filterOptions.find(f => f.id === filterId)?.label || filterId;
  };

  const getFilterColor = (filterId: string) => {
    return filterOptions.find(f => f.id === filterId)?.color || 'bg-gray-500';
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.some(filter => contact.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Dashboard</h1>
        <p className="text-gray-600">{filteredContacts.length} contacts from recent events</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilters.includes(filter.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter.id)}
              className="text-xs h-8"
            >
              <div className={`w-2 h-2 rounded-full ${filter.color} mr-2`}></div>
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.designation}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {contact.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{contact.capturedAt}</p>
                      <p className="text-xs text-gray-500">{contact.event}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {contact.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                        style={{ backgroundColor: `${getFilterColor(tag)}20` }}
                      >
                        {getFilterLabel(tag)}
                      </Badge>
                    ))}
                  </div>

                  {/* Notes */}
                  {contact.notes && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{contact.notes}</p>
                  )}

                  {/* Follow-up Info */}
                  <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Follow-up: {contact.followUpDue}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" className="flex-1 h-8">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Follow-up
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No contacts found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ContactDashboard;

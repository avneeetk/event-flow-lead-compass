import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Filter, BarChart3, Users, Mail, CheckCircle, Lock, TrendingUp, Calendar, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ROIDashboard = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'conversion'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('all');
  const [filterOwner, setFilterOwner] = useState('all');
  const [filterFollowUp, setFilterFollowUp] = useState('all');
  const itemsPerPage = 10;
  const [isProUser] = useState(false);

  // Sample data with enhanced fields
  const allLeads = [
    { 
      id: 1, 
      name: "Dr. Rakesh Sharma", 
      leadType: "Hot", 
      sourceEvent: "BioAsia Expo 2024", 
      followUpSent: "Yes", 
      assignedTo: "Sarah Verma",
      capturedBy: "Sarah Verma",
      followUpBy: "Sarah Verma",
      lastContact: "2 days ago" 
    },
    { 
      id: 2, 
      name: "Priya Patel", 
      leadType: "Warm", 
      sourceEvent: "PharmaTech India", 
      followUpSent: "Yes", 
      assignedTo: "Rahul Kumar",
      capturedBy: "Sarah Verma",
      followUpBy: "Rahul Kumar",
      lastContact: "1 week ago" 
    },
    { 
      id: 3, 
      name: "Dr. Sarah Johnson", 
      leadType: "Cold", 
      sourceEvent: "MedExpo Mumbai", 
      followUpSent: "No", 
      assignedTo: "Sarah Verma",
      capturedBy: "Rahul Kumar",
      followUpBy: "-",
      lastContact: "3 days ago" 
    },
    { 
      id: 4, 
      name: "Amit Kumar", 
      leadType: "Hot", 
      sourceEvent: "BioAsia Expo 2024", 
      followUpSent: "Yes", 
      assignedTo: "Sarah Verma",
      capturedBy: "Sarah Verma",
      followUpBy: "Sarah Verma",
      lastContact: "1 day ago" 
    },
    { 
      id: 5, 
      name: "Dr. Lisa Wong", 
      leadType: "Warm", 
      sourceEvent: "PharmaTech India", 
      followUpSent: "Yes", 
      assignedTo: "Rahul Kumar",
      capturedBy: "Rahul Kumar",
      followUpBy: "Rahul Kumar",
      lastContact: "4 days ago" 
    }
  ];

  const summaryStats = {
    totalLeadsAdded: 98,
    followUpsDone: 54,
    followUpsPending: 44,
    messagesSent: 76
  };

  const progressData = [
    { stage: "Total Leads Added", count: 98, percentage: 100 },
    { stage: "Follow-ups Done", count: 54, percentage: 55 },
    { stage: "Follow-ups Pending", count: 44, percentage: 45 },
    { stage: "Messages Sent", count: 76, percentage: 78 }
  ];

  const topEvents = [
    { name: "BioAsia Expo 2024", leads: 45, conversion: "78%" },
    { name: "PharmaTech India", leads: 32, conversion: "65%" },
    { name: "MedExpo Mumbai", leads: 21, conversion: "52%" }
  ];

  const conversionStats = {
    leadsToMeetings: 32,
    meetingsToDeals: 12,
    totalDeals: 8,
    revenue: "₹2.4L"
  };

  // Enhanced filtering
  const filteredLeads = allLeads.filter(lead => {
    const matchesGeneral = filterBy === 'all' || 
      (filterBy === 'event' && lead.sourceEvent === 'BioAsia Expo 2024') || 
      (filterBy === 'hot' && lead.leadType === 'Hot') ||
      (filterBy === 'warm' && lead.leadType === 'Warm') || 
      (filterBy === 'cold' && lead.leadType === 'Cold');
    
    const matchesOwner = filterOwner === 'all' || lead.assignedTo === filterOwner;
    const matchesFollowUp = filterFollowUp === 'all' || 
      (filterFollowUp === 'sent' && lead.followUpSent === 'Yes') ||
      (filterFollowUp === 'pending' && lead.followUpSent === 'No');

    return matchesGeneral && matchesOwner && matchesFollowUp;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getLeadTypeColor = (type: string) => {
    switch (type) {
      case 'Hot': return 'bg-red-50 text-red-700 border-red-200';
      case 'Warm': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cold': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleExportCSV = () => {
    if (!isProUser) {
      toast({
        title: "🔒 Upgrade Required",
        description: "Get full analytics with WowPro. Export feature available in paid plan.",
        variant: "destructive"
      });
      return;
    }

    const csvContent = [
      ['Name', 'Lead Type', 'Source Event', 'Follow-up Sent', 'Assigned To', 'Captured By', 'Follow-up By'],
      ...allLeads.map(lead => [
        lead.name,
        lead.leadType,
        lead.sourceEvent,
        lead.followUpSent,
        lead.assignedTo,
        lead.capturedBy,
        lead.followUpBy
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wow-circle-leads-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your leads report has been downloaded as CSV.",
    });
  };

  return (
    <TooltipProvider>
      <div className="p-4 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            ROI Dashboard
          </h1>
          <p className="text-slate-600">Track your lead performance and conversion metrics</p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 mb-6 border border-slate-200/60">
          <Button
            variant={currentView === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('overview')}
            className="flex-1 rounded-lg"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Lead Activity Overview
          </Button>
          <Button
            variant={currentView === 'conversion' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('conversion')}
            className="flex-1 rounded-lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Conversion Report
          </Button>
        </div>

        {currentView === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-teal-600 mr-2" />
                    <span className="text-2xl font-bold text-teal-600">{summaryStats.totalLeadsAdded}</span>
                  </div>
                  <p className="text-sm text-slate-500">Total Leads Added</p>
                </CardContent>
              </Card>
              
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                    <span className="text-2xl font-bold text-emerald-600">{summaryStats.followUpsDone}</span>
                  </div>
                  <p className="text-sm text-slate-500">Follow-ups Done</p>
                </CardContent>
              </Card>
              
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-amber-600 mr-2" />
                    <span className="text-2xl font-bold text-amber-600">{summaryStats.followUpsPending}</span>
                  </div>
                  <p className="text-sm text-slate-500">Follow-ups Pending</p>
                </CardContent>
              </Card>
              
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Mail className="w-5 h-5 text-indigo-600 mr-2" />
                    <span className="text-2xl font-bold text-indigo-600">{summaryStats.messagesSent}</span>
                  </div>
                  <p className="text-sm text-slate-500">Messages Sent</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card className="card-premium mb-6">
              <CardHeader>
                <CardTitle className="text-base">Lead Status Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((stage, index) => (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-slate-600">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-teal-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Events */}
            <Card className="card-premium mb-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Top 3 Performing Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div>
                        <p className="font-medium text-sm">{event.name}</p>
                        <p className="text-xs text-slate-500">{event.leads} leads captured</p>
                      </div>
                      <Badge className="bg-teal-50 text-teal-700 border-teal-200 pill-tag">
                        {event.conversion} conversion
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {currentView === 'conversion' && (
          <>
            {/* Conversion Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{conversionStats.leadsToMeetings}</div>
                  <p className="text-xs text-slate-500">Leads → Meetings</p>
                </CardContent>
              </Card>
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{conversionStats.meetingsToDeals}</div>
                  <p className="text-xs text-slate-500">Meetings → Deals</p>
                </CardContent>
              </Card>
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{conversionStats.totalDeals}</div>
                  <p className="text-xs text-slate-500">Total Deals Closed</p>
                </CardContent>
              </Card>
              <Card className="card-premium">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">{conversionStats.revenue}</div>
                  <p className="text-xs text-slate-500">Revenue Generated</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Filters */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Select value={filterOwner} onValueChange={setFilterOwner}>
                <SelectTrigger className="text-xs rounded-xl">
                  <SelectValue placeholder="Owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  <SelectItem value="Sarah Verma">Sarah Verma</SelectItem>
                  <SelectItem value="Rahul Kumar">Rahul Kumar</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterFollowUp} onValueChange={setFilterFollowUp}>
                <SelectTrigger className="text-xs rounded-xl">
                  <SelectValue placeholder="Follow-up" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Follow-up Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="text-xs rounded-xl">
                  <SelectValue placeholder="Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="event">BioAsia Expo</SelectItem>
                  <SelectItem value="hot">Hot Leads</SelectItem>
                  <SelectItem value="warm">Warm Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lead Detail Table */}
            <Card className="card-premium mb-6">
              <CardHeader>
                <CardTitle className="text-base">Lead Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Follow-up</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.sourceEvent}</div>
                            <div className="text-xs text-slate-400">
                              By: {lead.capturedBy}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getLeadTypeColor(lead.leadType)} pill-tag`} variant="secondary">
                            {lead.leadType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {lead.followUpSent === 'Yes' ? (
                              <span className="text-emerald-600">✓ Sent</span>
                            ) : (
                              <span className="text-amber-600">⏳ Pending</span>
                            )}
                          </div>
                          {lead.followUpBy !== '-' && (
                            <div className="text-xs text-slate-500">by {lead.followUpBy}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{lead.assignedTo}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setCurrentPage(i + 1)}
                              isActive={currentPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Export Button with Premium Gate */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleExportCSV} 
              className={`w-full h-12 ${isProUser ? 'btn-primary-soft' : 'bg-slate-400 cursor-not-allowed'}`}
              disabled={!isProUser}
            >
              {!isProUser && <Lock className="w-4 h-4 mr-2" />}
              <Download className="w-4 h-4 mr-2" />
              Export CSV Report {!isProUser && '(Pro Feature)'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isProUser ? 'Export detailed CSV report' : 'Upgrade to WowPro to export reports'}
          </TooltipContent>
        </Tooltip>
        
        {!isProUser && (
          <p className="text-center text-xs text-slate-500 mt-2">
            Upgrade to WowPro to export full reports and unlock advanced analytics
          </p>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ROIDashboard;

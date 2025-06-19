
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Download, Filter, BarChart3, Users, Mail, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ROIDashboard = () => {
  const [currentView, setCurrentView] = useState<'summary' | 'progress'>('summary');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('all');
  const itemsPerPage = 10;

  // Sample data
  const allLeads = [
    { id: 1, name: "Dr. Rakesh Sharma", event: "BioAsia Expo 2024", status: "Hot", followUpStatus: "Email Sent", lastContact: "2 days ago" },
    { id: 2, name: "Priya Patel", event: "PharmaTech India", status: "Warm", followUpStatus: "Follow-up Done", lastContact: "1 week ago" },
    { id: 3, name: "Dr. Sarah Johnson", event: "MedExpo Mumbai", status: "Cold", followUpStatus: "Scheduled", lastContact: "3 days ago" },
    { id: 4, name: "Amit Kumar", event: "BioAsia Expo 2024", status: "Hot", followUpStatus: "Email Sent", lastContact: "1 day ago" },
    { id: 5, name: "Dr. Lisa Wong", event: "PharmaTech India", status: "Warm", followUpStatus: "Follow-up Done", lastContact: "4 days ago" },
    { id: 6, name: "Rajesh Gupta", event: "BioAsia Expo 2024", status: "Hot", followUpStatus: "Email Sent", lastContact: "2 days ago" },
    { id: 7, name: "Dr. Meera Singh", event: "MedExpo Mumbai", status: "Warm", followUpStatus: "Scheduled", lastContact: "1 week ago" },
    { id: 8, name: "Vikram Patel", event: "PharmaTech India", status: "Cold", followUpStatus: "Follow-up Done", lastContact: "5 days ago" },
    { id: 9, name: "Dr. John Smith", event: "BioAsia Expo 2024", status: "Hot", followUpStatus: "Email Sent", lastContact: "3 days ago" },
    { id: 10, name: "Sneha Sharma", event: "MedExpo Mumbai", status: "Warm", followUpStatus: "Scheduled", lastContact: "2 days ago" },
    { id: 11, name: "Dr. Robert Johnson", event: "PharmaTech India", status: "Hot", followUpStatus: "Follow-up Done", lastContact: "1 day ago" },
    { id: 12, name: "Kavitha Reddy", event: "BioAsia Expo 2024", status: "Cold", followUpStatus: "Email Sent", lastContact: "6 days ago" }
  ];

  const summaryStats = {
    totalLeads: 98,
    emailsSent: 76,
    followUpsDone: 54,
    dealsInProgress: 12
  };

  const progressData = [
    { stage: "Contacted", count: 98, percentage: 100 },
    { stage: "Email Sent", count: 76, percentage: 78 },
    { stage: "Replied", count: 34, percentage: 35 },
    { stage: "Deal", count: 12, percentage: 12 }
  ];

  // Filter and paginate leads
  const filteredLeads = filterBy === 'all' ? allLeads : allLeads.filter(lead => 
    filterBy === 'event' ? lead.event === 'BioAsia Expo 2024' : 
    filterBy === 'hot' ? lead.status === 'Hot' :
    filterBy === 'warm' ? lead.status === 'Warm' : 
    lead.status === 'Cold'
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFollowUpColor = (status: string) => {
    switch (status) {
      case 'Email Sent': return 'bg-green-100 text-green-800';
      case 'Follow-up Done': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Event', 'Lead Status', 'Follow-up Status', 'Last Contact'],
      ...allLeads.map(lead => [
        lead.name,
        lead.event,
        lead.status,
        lead.followUpStatus,
        lead.lastContact
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
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ROI Dashboard</h1>
        <p className="text-gray-600">Track your lead performance and ROI</p>
      </div>

      {/* View Toggle */}
      <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
        <Button
          variant={currentView === 'summary' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrentView('summary')}
          className="flex-1"
        >
          Summary View
        </Button>
        <Button
          variant={currentView === 'progress' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrentView('progress')}
          className="flex-1"
        >
          Progress Report
        </Button>
      </div>

      {currentView === 'summary' && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-600">{summaryStats.totalLeads}</span>
                </div>
                <p className="text-sm text-gray-500">Total Leads Captured</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Mail className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">{summaryStats.emailsSent}</span>
                </div>
                <p className="text-sm text-gray-500">Emails Sent</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-600">{summaryStats.followUpsDone}</span>
                </div>
                <p className="text-sm text-gray-500">Follow-ups Done</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-2xl font-bold text-orange-600">{summaryStats.dealsInProgress}</span>
                </div>
                <p className="text-sm text-gray-500">Deals in Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="mb-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="event">Current Event</SelectItem>
                <SelectItem value="hot">Hot Leads</SelectItem>
                <SelectItem value="warm">Warm Leads</SelectItem>
                <SelectItem value="cold">Cold Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Leads Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Follow-up Status</TableHead>
                    <TableHead>Lead Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.event}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFollowUpColor(lead.followUpStatus)}>
                          {lead.followUpStatus}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">{lead.lastContact}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
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

      {currentView === 'progress' && (
        <>
          {/* Progress Funnel */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Lead Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{stage.stage}</span>
                      <span>{stage.count} ({stage.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event/Teammate Filter for Progress */}
          <div className="mb-4">
            <Select>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bioasia">BioAsia Expo 2024</SelectItem>
                <SelectItem value="pharmatech">PharmaTech India</SelectItem>
                <SelectItem value="medexpo">MedExpo Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Simplified Progress Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Detailed Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progressData.map((stage) => (
                    <TableRow key={stage.stage}>
                      <TableCell className="font-medium">{stage.stage}</TableCell>
                      <TableCell>{stage.count}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{stage.percentage}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {/* Export Button */}
      <Button onClick={handleExportCSV} className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600">
        <Download className="w-4 h-4 mr-2" />
        Export CSV Report
      </Button>
    </div>
  );
};

export default ROIDashboard;

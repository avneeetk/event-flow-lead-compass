
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, TrendingUp, Users, Mail, Check, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ROIDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample leads data
  const leadsData = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      event: "BioAsia Expo 2024",
      capturedDate: "2024-01-15",
      status: "Follow-up Done",
      emailSent: true,
      followUpSent: true,
      dealClosed: false,
      pipelineValue: "₹2.5L"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      event: "BioAsia Expo 2024",
      capturedDate: "2024-01-15",
      status: "Email Sent",
      emailSent: true,
      followUpSent: false,
      dealClosed: false,
      pipelineValue: "₹1.8L"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      company: "Metro Hospital",
      event: "PharmaTech India 2024",
      capturedDate: "2024-01-10",
      status: "Deal Closed",
      emailSent: true,
      followUpSent: true,
      dealClosed: true,
      pipelineValue: "₹5.2L"
    },
    {
      id: 4,
      name: "Amit Kumar",
      company: "BioTech Solutions",
      event: "MedExpo Mumbai 2023",
      capturedDate: "2023-12-20",
      status: "Scheduled",
      emailSent: true,
      followUpSent: true,
      dealClosed: false,
      pipelineValue: "₹3.1L"
    },
    {
      id: 5,
      name: "Dr. Meera Singh",
      company: "Wellness Pharma",
      event: "BioAsia Expo 2024",
      capturedDate: "2024-01-16",
      status: "Follow-up Done",
      emailSent: true,
      followUpSent: true,
      dealClosed: false,
      pipelineValue: "₹2.8L"
    }
  ];

  // Calculate summary metrics
  const totalLeads = leadsData.length;
  const emailsSent = leadsData.filter(lead => lead.emailSent).length;
  const followUpsDone = leadsData.filter(lead => lead.followUpSent).length;
  const dealsClosed = leadsData.filter(lead => lead.dealClosed).length;
  const totalPipelineValue = leadsData.reduce((sum, lead) => {
    const value = parseFloat(lead.pipelineValue.replace('₹', '').replace('L', '')) * 100000;
    return sum + value;
  }, 0);

  const filteredLeads = leadsData.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Deal Closed': return 'bg-green-500';
      case 'Follow-up Done': return 'bg-blue-500';
      case 'Email Sent': return 'bg-orange-500';
      case 'Scheduled': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Deal Closed': return 'default';
      case 'Follow-up Done': return 'secondary';
      case 'Email Sent': return 'secondary';
      case 'Scheduled': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleExportCSV = () => {
    const csvHeaders = ['Name', 'Company', 'Event', 'Captured Date', 'Status', 'Email Sent', 'Follow-up Sent', 'Deal Closed', 'Pipeline Value'];
    const csvData = filteredLeads.map(lead => [
      lead.name,
      lead.company,
      lead.event,
      lead.capturedDate,
      lead.status,
      lead.emailSent ? 'Yes' : 'No',
      lead.followUpSent ? 'Yes' : 'No',
      lead.dealClosed ? 'Yes' : 'No',
      lead.pipelineValue
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `wow-circle-roi-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: "ROI report has been downloaded as CSV"
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ROI Dashboard</h1>
        <p className="text-gray-600">Comprehensive performance and pipeline report</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{totalLeads}</span>
            </div>
            <p className="text-sm text-gray-500">Total Leads Captured</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{dealsClosed}</span>
            </div>
            <p className="text-sm text-gray-500">Deals Closed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{emailsSent}</span>
            </div>
            <p className="text-sm text-gray-500">Emails Sent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold text-orange-600">₹{(totalPipelineValue / 100000).toFixed(1)}L</span>
            </div>
            <p className="text-sm text-gray-500">Pipeline Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Leads Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Leads List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.company}</p>
                        <p className="text-xs text-gray-400">{lead.capturedDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{lead.event}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(lead.status)} className="text-xs">
                        {lead.status}
                      </Badge>
                      <div className="flex space-x-1 mt-1">
                        {lead.emailSent && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" title="Email Sent" />
                        )}
                        {lead.followUpSent && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" title="Follow-up Sent" />
                        )}
                        {lead.dealClosed && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Deal Closed" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-sm">{lead.pipelineValue}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Summary Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Leads</span>
                <span className="font-semibold">{totalLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Emails Sent</span>
                <span className="font-semibold">{emailsSent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Follow-ups Done</span>
                <span className="font-semibold">{followUpsDone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Deals Closed</span>
                <span className="font-semibold text-green-600">{dealsClosed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold">{((dealsClosed / totalLeads) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Pipeline</span>
                <span className="font-semibold text-blue-600">₹{(totalPipelineValue / 100000).toFixed(1)}L</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <Card>
        <CardContent className="p-4">
          <Button onClick={handleExportCSV} className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Export Detailed CSV Report
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Download comprehensive report for manager review and analysis
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIDashboard;

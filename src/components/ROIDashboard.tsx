
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MessageSquare, User, TrendingUp, Download, Share } from 'lucide-react';

const ROIDashboard = () => {
  const eventMetrics = [
    {
      eventName: "BioAsia Expo 2024",
      date: "Current Event",
      leadsCaptured: 47,
      followUpsSent: 28,
      conversions: 3,
      pipelineValue: "₹4.2L",
      roiMultiplier: "6.3x",
      status: "active",
      eventCost: "₹65,000",
      conversionRate: "6.4%"
    },
    {
      eventName: "PharmaTech India 2024",
      date: "Jan 2024",
      leadsCaptured: 89,
      followUpsSent: 76,
      conversions: 12,
      pipelineValue: "₹8.5L",
      roiMultiplier: "4.2x",
      status: "completed",
      eventCost: "₹2,02,000",
      conversionRate: "13.5%"
    },
    {
      eventName: "MedExpo Mumbai 2023",
      date: "Dec 2023",
      leadsCaptured: 156,
      followUpsSent: 134,
      conversions: 23,
      pipelineValue: "₹15.2L",
      roiMultiplier: "5.8x",
      status: "completed",
      eventCost: "₹2,62,000",
      conversionRate: "14.7%"
    }
  ];

  const overallStats = {
    totalLeads: 292,
    totalFollowUps: 238,
    totalConversions: 38,
    totalPipeline: "₹27.9L",
    totalInvestment: "₹5,29,000",
    avgConversionRate: "13.0%",
    avgDealSize: "₹73,421",
    totalROI: "5.27x"
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-blue-500';
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ROI Dashboard</h1>
        <p className="text-gray-600">Track performance and justify event investments</p>
      </div>

      {/* Overall ROI Banner */}
      <Card className="mb-6 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-green-100">Total Event ROI</h2>
            <p className="text-4xl font-bold">{overallStats.totalROI}</p>
            <p className="text-green-100">Return on Investment</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{overallStats.totalPipeline}</p>
              <p className="text-green-100 text-sm">Total Pipeline Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{overallStats.totalInvestment}</p>
              <p className="text-green-100 text-sm">Total Investment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{overallStats.totalLeads}</span>
            </div>
            <p className="text-sm text-gray-500">Total Leads</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{overallStats.totalConversions}</span>
            </div>
            <p className="text-sm text-gray-500">Conversions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{overallStats.avgConversionRate}</span>
            </div>
            <p className="text-sm text-gray-500">Avg Conversion</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold text-orange-600">{overallStats.avgDealSize}</span>
            </div>
            <p className="text-sm text-gray-500">Avg Deal Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Event Performance Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Performance Breakdown</h2>
        
        <div className="space-y-4">
          {eventMetrics.map((event, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(event.status)}`}></div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{event.eventName}</CardTitle>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusBadge(event.status)} className="mb-1">
                      {event.status}
                    </Badge>
                    <p className="text-lg font-bold text-green-600">{event.roiMultiplier}</p>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Leads Captured</span>
                      <span className="font-semibold">{event.leadsCaptured}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Follow-ups Sent</span>
                      <span className="font-semibold">{event.followUpsSent}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Conversions</span>
                      <span className="font-semibold text-green-600">{event.conversions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pipeline Value</span>
                      <span className="font-semibold text-blue-600">{event.pipelineValue}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Investment</p>
                      <p className="font-semibold">{event.eventCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="font-semibold text-green-600">{event.conversionRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ROI Multiple</p>
                      <p className="font-semibold text-purple-600">{event.roiMultiplier}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                {event.status === 'completed' && (
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export & Share */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Share className="w-5 h-5 mr-2" />
            Export & Share
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full h-12">
              <Download className="w-4 h-4 mr-2" />
              Export Detailed CSV Report
            </Button>
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600">
              <Share className="w-4 h-4 mr-2" />
              Share ROI Summary with Manager
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Professional reports ready for management review and budget justification
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIDashboard;

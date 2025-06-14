
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MessageSquare, User } from 'lucide-react';

const ROIDashboard = () => {
  const eventMetrics = [
    {
      eventName: "BioAsia Expo 2024",
      date: "Current Event",
      leadsCaptured: 47,
      followUpsSent: 28,
      conversions: 3,
      pipelineValue: "₹4.2L",
      status: "active"
    },
    {
      eventName: "PharmaTech India 2024",
      date: "Jan 2024",
      leadsCaptured: 89,
      followUpsSent: 76,
      conversions: 12,
      pipelineValue: "₹8.5L",
      status: "completed"
    },
    {
      eventName: "MedExpo Mumbai 2023",
      date: "Dec 2023",
      leadsCaptured: 156,
      followUpsSent: 134,
      conversions: 23,
      pipelineValue: "₹15.2L",
      status: "completed"
    }
  ];

  const overallStats = {
    totalLeads: 292,
    totalFollowUps: 238,
    totalConversions: 38,
    totalPipeline: "₹27.9L",
    conversionRate: "13.0%",
    avgDealSize: "₹73,421"
  };

  const getConversionRate = (conversions: number, leads: number) => {
    return ((conversions / leads) * 100).toFixed(1);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-blue-500';
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ROI Dashboard</h1>
        <p className="text-gray-600">Track your event performance and conversions</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{overallStats.totalLeads}</div>
            <div className="text-blue-100 text-sm">Total Leads</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{overallStats.totalPipeline}</div>
            <div className="text-green-100 text-sm">Pipeline Value</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{overallStats.conversionRate}</div>
            <div className="text-purple-100 text-sm">Conversion Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{overallStats.avgDealSize}</div>
            <div className="text-orange-100 text-sm">Avg Deal Size</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Performance */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Performance</h2>
        
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
                  <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{event.leadsCaptured}</div>
                      <div className="text-xs text-gray-500">Leads</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{event.followUpsSent}</div>
                      <div className="text-xs text-gray-500">Follow-ups</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{event.conversions}</div>
                      <div className="text-xs text-gray-500">Conversions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{event.pipelineValue}</div>
                      <div className="text-xs text-gray-500">Pipeline</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-600">Conversion Rate: </span>
                    <span className="font-semibold text-green-600">
                      {getConversionRate(event.conversions, event.leadsCaptured)}%
                    </span>
                  </div>
                  
                  {event.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      View Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export & Share</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              Export CSV
            </Button>
            <Button variant="outline" className="h-12">
              Share Report
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Perfect for manager reports and ROI justification
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIDashboard;

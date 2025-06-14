
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Calendar, Check, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FollowUpAssistant = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const pendingFollowUps = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      role: "Chief Pharmacist",
      capturedAt: "18 hours ago",
      notes: "Interested in our new diabetes medication line",
      urgency: "high",
      suggestedAction: "Send product catalog and schedule demo"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      role: "Regional Manager",
      capturedAt: "22 hours ago",
      notes: "Looking for exclusive distribution rights",
      urgency: "high",
      suggestedAction: "Share territory availability and pricing"
    }
  ];

  const emailTemplates = [
    {
      id: 'intro',
      name: 'Professional Introduction',
      subject: 'Following up from {Event Name}',
      body: `Hi {Name},

It was great meeting you at {Event Name} yesterday. I enjoyed our conversation about {Topic}.

As discussed, I'm attaching more information about our {Product/Service} that could help {Company} achieve {Specific Goal}.

Would you be available for a brief call this week to discuss how we can support your objectives?

Best regards,
{Your Name}`
    },
    {
      id: 'demo',
      name: 'Product Demo Request',
      subject: 'Product demonstration for {Company}',
      body: `Dear {Name},

Thank you for your interest in our {Product} during our meeting at {Event Name}.

I'd love to show you a personalized demonstration of how our solution can address the {Specific Challenge} you mentioned.

Are you available for a 30-minute demo call this week? I can work around your schedule.

Looking forward to continuing our conversation.

Best,
{Your Name}`
    },
    {
      id: 'followup',
      name: 'General Follow-up',
      subject: 'Great meeting you at {Event Name}',
      body: `Hello {Name},

I hope this message finds you well. It was a pleasure meeting you at {Event Name} and learning about {Company}'s initiatives.

I wanted to follow up on our discussion about {Topic} and see if you had any additional questions.

Please don't hesitate to reach out if there's anything I can help you with.

Warm regards,
{Your Name}`
    }
  ];

  const sendFollowUp = (leadId: number) => {
    toast({
      title: "Follow-up Sent!",
      description: "Email sent successfully. Reminder set for 3 days.",
    });
  };

  const snoozeFollowUp = (leadId: number) => {
    toast({
      title: "Reminder Snoozed",
      description: "Will remind you again in 24 hours.",
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Follow-up Assistant</h1>
        <p className="text-gray-600">{pendingFollowUps.length} leads need follow-up</p>
      </div>

      {/* Urgent Follow-ups */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-500" />
          Urgent Follow-ups (24hr window)
        </h2>
        
        <div className="space-y-4">
          {pendingFollowUps.map((lead) => (
            <Card key={lead.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{lead.name}</CardTitle>
                      <p className="text-sm text-gray-600">{lead.role}</p>
                      <p className="text-sm text-gray-500">{lead.company}</p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {lead.capturedAt}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {lead.notes && (
                  <div className="flex items-start space-x-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">{lead.notes}</p>
                  </div>
                )}
                
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-blue-800 mb-1">Suggested Action:</p>
                  <p className="text-sm text-blue-700">{lead.suggestedAction}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => sendFollowUp(lead.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Send Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => snoozeFollowUp(lead.id)}
                  >
                    Snooze 24h
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Templates */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Email Templates</h2>
        
        <div className="grid gap-3 mb-4">
          {emailTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">Subject: {template.subject}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customize Your Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add your custom message or modify the template..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={6}
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button className="flex-1">Send Email</Button>
                <Button variant="outline">Save Template</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FollowUpAssistant;

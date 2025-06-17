
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Calendar, Check, User, Clock, Zap, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FollowUpAssistant = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const urgentFollowUps = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      role: "Chief Pharmacist",
      capturedAt: "18 hours ago",
      notes: "Interested in our new diabetes medication line",
      urgency: "high",
      suggestedAction: "Send product catalog and schedule demo",
      avatar: "RS",
      event: "BioAsia Expo 2024",
      email: "rakesh.sharma@medcore.com"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      role: "Regional Manager",
      capturedAt: "22 hours ago",
      notes: "Looking for exclusive distribution rights",
      urgency: "high",
      suggestedAction: "Share territory availability and pricing",
      avatar: "PP",
      event: "BioAsia Expo 2024",
      email: "priya@healthfirst.com"
    }
  ];

  const emailTemplates = [
    {
      id: 'professional',
      name: 'Professional Introduction',
      subject: 'Following up from {Event}',
      preview: 'Great meeting you at the event...',
      body: `Hi {Name},

It was great meeting you at {Event} yesterday. I enjoyed our conversation about {Topic}.

As discussed, I'm attaching more information about our solutions that could help {Company} achieve {Goal}.

Would you be available for a brief call this week to discuss how we can support your objectives?

Best regards,
Sarah Verma`
    },
    {
      id: 'demo',
      name: 'Product Demo Request',
      subject: 'Product demonstration for {Company}',
      preview: 'Personalized demo of our solution...',
      body: `Dear {Name},

Thank you for your interest in our products during our meeting at {Event}.

I'd love to show you a personalized demonstration of how our solution can address the {Challenge} you mentioned.

Are you available for a 30-minute demo call this week? I can work around your schedule.

Looking forward to continuing our conversation.

Best,
Sarah Verma`
    },
    {
      id: 'urgent',
      name: 'Urgent Follow-up',
      subject: 'Time-sensitive opportunity for {Company}',
      preview: 'Limited time offer discussed...',
      body: `Hello {Name},

I wanted to quickly follow up on the time-sensitive opportunity we discussed at {Event}.

As mentioned, this offer is only available until the end of this month. I'd hate for {Company} to miss out on this opportunity.

Can we schedule a quick 15-minute call today or tomorrow to finalize the details?

Urgently,
Sarah Verma`
    }
  ];

  const handleQuickSend = (leadId: number) => {
    const lead = urgentFollowUps.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setShowEmailComposer(true);
    }
  };

  const snoozeFollowUp = (leadId: number) => {
    toast({
      title: "Follow-up Snoozed",
      description: "Will remind you again in 24 hours.",
    });
  };

  const sendEmail = () => {
    if (!selectedLead || !selectedTemplate) return;
    
    const template = emailTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Generate personalized email
    let emailBody = template.body
      .replace(/{Name}/g, selectedLead.name)
      .replace(/{Company}/g, selectedLead.company)
      .replace(/{Event}/g, selectedLead.event)
      .replace(/{Topic}/g, 'pharmaceutical solutions')
      .replace(/{Challenge}/g, 'distribution challenges')
      .replace(/{Goal}/g, 'growth objectives');

    if (customMessage) {
      emailBody = customMessage;
    }

    // Open email client
    const emailUrl = `mailto:${selectedLead.email}?subject=${encodeURIComponent(template.subject.replace(/{Event}/g, selectedLead.event).replace(/{Company}/g, selectedLead.company))}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl);

    toast({
      title: "Email Sent!",
      description: "Follow-up email opened in your default email client.",
    });

    setShowEmailComposer(false);
    setSelectedLead(null);
    setSelectedTemplate('');
    setCustomMessage('');
  };

  if (showEmailComposer && selectedLead) {
    return (
      <div className="p-4 pb-20 min-h-screen bg-gray-50">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowEmailComposer(false)}
            className="mb-4"
          >
            ← Back to Follow-ups
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Compose Email</h1>
          <p className="text-gray-600">To: {selectedLead.name} at {selectedLead.company}</p>
        </div>

        {/* Email Templates */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h2>
          <div className="space-y-3">
            {emailTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Subject: {template.subject}</p>
                  <p className="text-xs text-gray-500">{template.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        {selectedTemplate && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Customize Your Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Edit the template or write your own message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={8}
                className="mb-4"
              />
              <div className="flex space-x-3">
                <Button onClick={sendEmail} className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => setCustomMessage('')}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Follow-up Assistant</h1>
        <p className="text-gray-600 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-red-500" />
          {urgentFollowUps.length} urgent follow-ups (24hr window)
        </p>
      </div>

      {/* AI Suggestions Banner */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">AI Recommendations</h3>
              <p className="text-sm text-gray-600">Personalized email templates ready based on conversation context</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Follow-ups */}
      <div className="space-y-4">
        {urgentFollowUps.map((lead) => (
          <Card key={lead.id} className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {lead.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Lead Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.role}</p>
                      <p className="text-sm text-gray-500">{lead.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="text-xs mb-1">
                        {lead.capturedAt}
                      </Badge>
                      <p className="text-xs text-gray-500">{lead.event}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {lead.notes && (
                    <div className="flex items-start space-x-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{lead.notes}</p>
                    </div>
                  )}

                  {/* AI Suggestion */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">AI Suggested Action:</p>
                    </div>
                    <p className="text-sm text-blue-700">{lead.suggestedAction}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleQuickSend(lead.id)}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Quick Send
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => snoozeFollowUp(lead.id)}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Snooze 24h
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Follow-up Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">28</p>
              <p className="text-xs text-gray-500">Sent Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-xs text-gray-500">Response Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-xs text-gray-500">Meetings Booked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowUpAssistant;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Edit, User, Building, Calendar, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FollowUpAssistant = () => {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [includeBranding, setIncludeBranding] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const pendingLeads = [
    {
      id: 1,
      name: "Dr. Rakesh Sharma",
      company: "MedCore Pharmaceuticals",
      designation: "Chief Pharmacist",
      email: "rakesh.sharma@medcore.com",
      event: "BioAsia Expo 2024",
      capturedAt: "2 days ago",
      notes: "Interested in new diabetes medication line. Wants product demo next week.",
      tags: ["Hot Lead", "Decision Maker"],
      priority: "High"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "HealthFirst Distributors",
      designation: "Regional Manager",
      email: "priya@healthfirst.com",
      event: "BioAsia Expo 2024",
      capturedAt: "1 day ago",
      notes: "Looking for exclusive distribution rights in Western region.",
      tags: ["Warm Lead", "Distributor"],
      priority: "Medium"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      company: "Metro Hospital",
      designation: "Head of Procurement",
      email: "sarah.j@metrohospital.com",
      event: "BioAsia Expo 2024",
      capturedAt: "3 hours ago",
      notes: "Interested in bulk purchase for hospital chain.",
      tags: ["Cold Lead", "Doctor"],
      priority: "Low"
    }
  ];

  const generateEmail = (lead: any) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const businessEmail = userData.businessEmail || userData.email || 'your@company.com';
    const companyName = userData.companyName || 'Your Company';
    const fullName = userData.fullName || 'Your Name';
    
    const subject = `Following up from ${lead.event} - ${companyName}`;
    const content = `Hi ${lead.name},

It was great meeting you at ${lead.event}! I enjoyed our conversation about ${lead.company}'s initiatives.

${lead.notes ? `As we discussed, ${lead.notes.toLowerCase()}` : 'I believe our solutions could be a great fit for your needs.'}

I'd love to schedule a brief call this week to explore how we can support your objectives. Are you available for a 30-minute conversation?

Best regards,
${fullName}
${companyName}`;

    return { subject, content };
  };

  const handleSelectLead = (lead: any) => {
    setSelectedLead(lead);
    const { subject, content } = generateEmail(lead);
    setEmailSubject(subject);
    setEmailContent(content);
    setIsEditing(false);
  };

  const handleSendEmail = () => {
    if (!selectedLead) return;

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const businessEmail = userData.businessEmail || userData.email || 'your@company.com';
    
    let finalContent = emailContent;
    
    if (includeBranding) {
      finalContent += `\n\n---\nSent via WOW Circle — the tool that remembers your networking better than you do.\nGet early access → www.wowcircle.com`;
    }

    // Create mailto link with business email
    const emailUrl = `mailto:${selectedLead.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(finalContent)}&from=${encodeURIComponent(businessEmail)}`;
    
    // For demonstration, we'll also show a preview
    console.log('Email Preview:', {
      from: businessEmail,
      to: selectedLead.email,
      subject: emailSubject,
      body: finalContent
    });

    window.open(emailUrl);
    
    toast({
      title: "Email Opened",
      description: `Follow-up email to ${selectedLead.name}. Make sure to review before sending!`
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          Follow-Up Assistant
        </h1>
        <p className="text-gray-600">{pendingLeads.length} contacts pending follow-up</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Pending Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => handleSelectLead(lead)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedLead?.id === lead.id
                      ? 'border-cyan-300 bg-cyan-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{lead.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {lead.company} • {lead.designation}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{lead.capturedAt}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{lead.notes}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {lead.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{lead.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Composer */}
        {selectedLead && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Compose Follow-up Email</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email Details */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>To:</strong> {selectedLead.email}
                  </div>
                  <div>
                    <strong>From:</strong> {JSON.parse(localStorage.getItem('userData') || '{}').businessEmail || 'your@company.com'}
                  </div>
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {/* Email Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={12}
                  disabled={!isEditing}
                  className="font-mono text-sm"
                />
              </div>

              {/* Branding Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeBranding"
                  checked={includeBranding}
                  onChange={(e) => setIncludeBranding(e.target.checked)}
                />
                <Label htmlFor="includeBranding" className="text-sm">
                  Include WOW Circle signature (helps grow our community!)
                </Label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSendEmail}
                  className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const { subject, content } = generateEmail(selectedLead);
                    setEmailSubject(subject);
                    setEmailContent(content);
                  }}
                  className="flex-1"
                >
                  Reset to Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FollowUpAssistant;

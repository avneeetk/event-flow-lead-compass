import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Edit, Clock, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FollowUpAssistant = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [emailContent, setEmailContent] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const pendingFollowUps = [
    {
      id: 1,
      name: "Dr. Priya Patel",
      company: "HealthFirst Clinic",
      email: "priya@healthfirst.com",
      event: "BioAsia Expo 2024",
      notes: "Interested in diabetes management solutions",
      priority: "High",
      capturedAt: "2 hours ago",
      suggestedEmail: `Hi Dr. Patel,

It was great meeting you at the BioAsia Expo earlier today! I really enjoyed our conversation about diabetes management solutions and how they could benefit your patients at HealthFirst Clinic.

As promised, I've attached our latest product overview focusing on the diabetes care solutions we discussed. I think you'll find the patient outcome data particularly interesting.

Would you be available for a brief call next week to discuss how we might support your clinic's diabetes management program?

Best regards,
Sarah Verma
Sales Lead, PharmaTech Solutions`
    },
    // ... keep existing code (other contacts)
  ];

  const generateWowCircleSignature = () => {
    return `

---
Sent via WOW Circle — the tool that remembers your networking better than you do.
Get early access → www.wowcircle.com`;
  };

  const handleSelectContact = (contact: any) => {
    setSelectedContact(contact);
    const baseEmail = contact.suggestedEmail;
    const finalEmail = includeSignature ? baseEmail + generateWowCircleSignature() : baseEmail;
    setEmailContent(finalEmail);
    setIsEditing(false);
  };

  const handleSendEmail = () => {
    // In a real app, this would integrate with email service
    toast({
      title: "Email Sent!",
      description: `Follow-up sent to ${selectedContact.name} via your connected email`,
    });
    
    // Remove from pending list or mark as completed
    setSelectedContact(null);
    setEmailContent('');
  };

  const handleToggleSignature = (checked: boolean) => {
    setIncludeSignature(checked);
    if (selectedContact) {
      const baseEmail = selectedContact.suggestedEmail;
      const finalEmail = checked ? baseEmail + generateWowCircleSignature() : baseEmail;
      setEmailContent(finalEmail);
    }
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Follow-Up Assistant</h1>
        <p className="text-slate-600">AI-powered email templates for your contacts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Follow-ups */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Clock className="w-5 h-5" />
              <span>Pending Follow-ups</span>
              <Badge className="bg-cyan-100 text-cyan-800">{pendingFollowUps.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingFollowUps.map((contact) => (
                <div 
                  key={contact.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedContact?.id === contact.id 
                      ? 'border-cyan-300 bg-cyan-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                      <p className="text-sm text-slate-600">{contact.company}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {contact.priority === 'High' && <Star className="w-4 h-4 text-amber-500" />}
                      <Badge 
                        variant={contact.priority === 'High' ? 'default' : 'secondary'}
                        className={contact.priority === 'High' ? 'bg-amber-100 text-amber-800' : ''}
                      >
                        {contact.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{contact.notes}</p>
                  <p className="text-xs text-slate-500">{contact.event} • {contact.capturedAt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Composer */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Mail className="w-5 h-5" />
              <span>Email Composer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>To:</strong> {selectedContact.email}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Subject:</strong> Great meeting you at {selectedContact.event}
                  </p>
                </div>

                {/* Signature Toggle */}
                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                  <div>
                    <p className="text-sm font-medium text-cyan-800">Include WOW Circle Signature</p>
                    <p className="text-xs text-cyan-600">Help grow our community & show you're using cutting-edge tools</p>
                  </div>
                  <Switch 
                    checked={includeSignature}
                    onCheckedChange={handleToggleSignature}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Email Content</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-slate-600 hover:text-slate-800"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {isEditing ? 'Preview' : 'Edit'}
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <Textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className="min-h-[300px] text-sm"
                      placeholder="Edit your email content..."
                    />
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-lg p-4 min-h-[300px] text-sm whitespace-pre-wrap">
                      {emailContent}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleSendEmail}
                    className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-300 hover:to-blue-400"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="border-slate-300 text-slate-700">
                    Save Draft
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a contact to compose your follow-up email</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FollowUpAssistant;

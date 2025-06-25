
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Clock, Star, AlertCircle, CheckCircle, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FollowUpAssistant = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [emailContent, setEmailContent] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

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
      urgencyScore: 95,
      suggestedEmail: `Hi Dr. Patel,

It was great meeting you at the BioAsia Expo earlier today! I really enjoyed our conversation about diabetes management solutions and how they could benefit your patients at HealthFirst Clinic.

As promised, I've attached our latest product overview focusing on the diabetes care solutions we discussed. I think you'll find the patient outcome data particularly interesting.

Would you be available for a brief call next week to discuss how we might support your clinic's diabetes management program?

Best regards,
Sarah Verma
Sales Lead, PharmaTech Solutions`
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      company: "MediCore Hospital",
      email: "rajesh@medicore.com",
      event: "Healthcare Innovation Summit",
      notes: "Looking for advanced diagnostic equipment",
      priority: "Medium",
      capturedAt: "6 hours ago",
      urgencyScore: 75,
      suggestedEmail: `Dear Dr. Kumar,

Thank you for taking the time to discuss your diagnostic equipment needs at the Healthcare Innovation Summit today.

I believe our latest imaging solutions could significantly enhance your patient care capabilities at MediCore Hospital. The ROI data we discussed shows an average 40% improvement in diagnostic accuracy.

I'd love to schedule a demo at your facility. Are you available next week for a 30-minute presentation?

Best regards,
Sarah Verma`
    }
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
    setCurrentStep(2);
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent Successfully! ✅",
      description: `Follow-up sent to ${selectedContact.name}`,
    });
    
    setSelectedContact(null);
    setEmailContent('');
    setCurrentStep(1);
  };

  const handleRemindLater = () => {
    toast({
      title: "Reminder Set",
      description: "You'll be notified in 4 hours",
    });
  };

  const handleToggleSignature = (checked: boolean) => {
    setIncludeSignature(checked);
    if (selectedContact) {
      const baseEmail = selectedContact.suggestedEmail;
      const finalEmail = checked ? baseEmail + generateWowCircleSignature() : baseEmail;
      setEmailContent(finalEmail);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgencyScore: number) => {
    if (urgencyScore >= 90) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (urgencyScore >= 70) return <Clock className="w-4 h-4 text-amber-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Follow-Up Assistant</h1>
            <p className="text-slate-600 text-sm">AI-powered email templates for warm leads</p>
          </div>
          <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
            {pendingFollowUps.length} pending
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-cyan-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 1 ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400'
            }`}>1</div>
            <span className="text-sm font-medium">Review Lead</span>
          </div>
          <div className="flex-1 h-px bg-slate-200"></div>
          <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-cyan-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 2 ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400'
            }`}>2</div>
            <span className="text-sm font-medium">Compose Email</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Step 1: Pending Follow-ups */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">Pending Follow-ups</h2>
            </div>
            
            {pendingFollowUps.map((contact) => (
              <Card 
                key={contact.id}
                className="border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleSelectContact(contact)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                        {getUrgencyIcon(contact.urgencyScore)}
                      </div>
                      <p className="text-sm text-slate-600">{contact.company}</p>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(contact.priority)}`}>
                      {contact.priority === 'High' && <Star className="w-3 h-3 mr-1" />}
                      {contact.priority}
                    </Badge>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700 font-medium mb-1">Interest:</p>
                    <p className="text-sm text-slate-600">{contact.notes}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>{contact.event}</span>
                    <span>{contact.capturedAt}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Ready to send follow-up</span>
                      <div className="flex items-center space-x-1 text-cyan-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs">Tap to compose</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Email Composer */}
        {currentStep === 2 && selectedContact && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-800">Compose Follow-up</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="text-slate-600"
              >
                ← Back
              </Button>
            </div>

            {/* Lead Context Card */}
            <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedContact.name}</h3>
                    <p className="text-sm text-slate-600">{selectedContact.company}</p>
                    <p className="text-xs text-slate-500 mt-1">{selectedContact.event} • {selectedContact.capturedAt}</p>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(selectedContact.priority)}`}>
                    {selectedContact.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Email Fields */}
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-800">Email Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">To:</label>
                    <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Subject:</label>
                    <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      Great meeting you at {selectedContact.event}
                    </p>
                  </div>
                </div>

                {/* WOW Circle Signature Toggle */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-800">Include WOW Circle Signature</p>
                      <p className="text-xs text-purple-600">Boost trust & visibility with prospects</p>
                    </div>
                    <Switch 
                      checked={includeSignature}
                      onCheckedChange={handleToggleSignature}
                    />
                  </div>
                </div>

                {/* Email Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Message:</label>
                    <div className="flex items-center space-x-1 text-xs text-amber-600">
                      <Coins className="w-3 h-3" />
                      <span>2 Coins for AI draft</span>
                    </div>
                  </div>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="min-h-[200px] text-sm border-slate-300 focus:border-cyan-400"
                    placeholder="Edit your AI-generated email..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSendEmail}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                onClick={handleRemindLater}
                variant="outline"
                className="w-full h-10 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Clock className="w-4 h-4 mr-2" />
                Remind Me Later
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpAssistant;

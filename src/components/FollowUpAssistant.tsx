
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Mail, Send, Clock, Star, AlertCircle, CheckCircle, Coins, Edit, MoreHorizontal, ArrowLeft } from 'lucide-react';
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
      avatar: "PP",
      summary: "Diabetes management solutions — BioAsia",
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
      avatar: "RK",
      summary: "Advanced diagnostic equipment — Healthcare Summit",
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
      title: "Reminder Set ⏰",
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
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getUrgencyIcon = (urgencyScore: number) => {
    if (urgencyScore >= 90) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (urgencyScore >= 70) return <Clock className="w-4 h-4 text-amber-500" />;
    return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 pb-20">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 px-4 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Follow-Up Assistant
              </h1>
              <p className="text-slate-600 text-sm">AI-powered email templates for warm leads</p>
            </div>
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 pill-tag">
              {pendingFollowUps.length} pending
            </Badge>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-4 bg-white/50 backdrop-blur-sm border-b border-slate-100/60">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-teal-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                currentStep >= 1 ? 'bg-teal-100 text-teal-600 shadow-sm' : 'bg-slate-100 text-slate-400'
              }`}>1</div>
              <span className="text-sm font-medium">Review Lead</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-teal-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                currentStep >= 2 ? 'bg-teal-100 text-teal-600 shadow-sm' : 'bg-slate-100 text-slate-400'
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
                  className="card-premium hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleSelectContact(contact)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                          {getUrgencyIcon(contact.urgencyScore)}
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{contact.company}</p>
                        <p className="text-xs text-slate-500">{contact.event} • {contact.capturedAt}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={`pill-tag ${getPriorityColor(contact.priority)}`}>
                          {contact.priority === 'High' && <Star className="w-3 h-3 mr-1" />}
                          {contact.priority}
                        </Badge>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>More options</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50/80 rounded-xl p-4 mb-4 border border-slate-100">
                      <p className="text-sm text-slate-700 font-medium mb-1">Interest Summary:</p>
                      <p className="text-sm text-slate-600">{contact.summary}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="text-sm font-medium text-slate-700">Ready to send follow-up</span>
                      <div className="flex items-center space-x-2 text-teal-600 group-hover:text-teal-700 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs font-medium">Tap to compose</span>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                      className="text-slate-600 hover:text-slate-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Back to lead list</TooltipContent>
                </Tooltip>
              </div>

              {/* Lead Context Card */}
              <Card className="card-premium bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200/40">
                <CardContent className="p-5">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold text-sm">
                        {selectedContact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{selectedContact.name}</h3>
                      <p className="text-sm text-slate-600">{selectedContact.company}</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedContact.event} • {selectedContact.capturedAt}</p>
                    </div>
                    <Badge className={`pill-tag ${getPriorityColor(selectedContact.priority)}`}>
                      {selectedContact.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Email Fields */}
              <Card className="card-premium">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-slate-800 flex items-center space-x-2">
                    <span>Email Details</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>Edit email content</TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700">To:</label>
                      <p className="text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        {selectedContact.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Subject:</label>
                      <p className="text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        Great meeting you at {selectedContact.event}
                      </p>
                    </div>
                  </div>

                  {/* WOW Circle Signature Toggle */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/60 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-800">Include WOW Circle Signature</p>
                        <p className="text-xs text-indigo-600">Boost trust & visibility with prospects</p>
                      </div>
                      <Switch 
                        checked={includeSignature}
                        onCheckedChange={handleToggleSignature}
                        className="data-[state=checked]:bg-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Email Content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Message:</label>
                      <div className="flex items-center space-x-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        <Coins className="w-3 h-3" />
                        <span>2 Coins for AI draft</span>
                      </div>
                    </div>
                    <Textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className="min-h-[200px] text-sm border-slate-300 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl"
                      placeholder="Edit your AI-generated email..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSendEmail}
                      className="w-full h-12 btn-primary-soft"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send follow-up email now</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleRemindLater}
                      className="w-full h-10 btn-secondary-soft"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Remind Me Later
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Set reminder for 4 hours</TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FollowUpAssistant;


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, HelpCircle, Clock, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I capture leads at events?",
      answer: "Use the Capture tab to quickly add lead information. You can scan business cards, take photos, or manually enter details."
    },
    {
      question: "Can I work offline?",
      answer: "Yes! The app works offline and syncs your data when you're back online. Perfect for events with poor connectivity."
    },
    {
      question: "How do I follow up with leads?",
      answer: "Go to the Follow-up tab to see all your leads and send personalized emails or messages directly from the app."
    },
    {
      question: "Can I invite team members?",
      answer: "Yes! Go to Team Management to add team members and assign different permission levels."
    },
    {
      question: "How do I export my lead data?",
      answer: "Visit the ROI Dashboard and click the CSV Export button to download all your lead data."
    }
  ];

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your support system
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 12 hours.",
    });
    
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setIsOpen(false);
  };

  const handleEmailSupport = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const subject = encodeURIComponent('WOW Circle Support Request');
    const body = encodeURIComponent(`Hi WOW Circle Support Team,

I need help with:

Company: ${userData.company || 'N/A'}
Name: ${userData.name || 'N/A'}
Email: ${userData.email || 'N/A'}

Please describe your issue below:


Best regards,
${userData.name || 'User'}`);

    window.open(`mailto:support@wowcircle.com?subject=${subject}&body=${body}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Support Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-xl z-50"
        size="sm"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Support Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>WOW Circle Support</span>
            </DialogTitle>
          </DialogHeader>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <Button
              variant={activeTab === 'faq' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('faq')}
              className="flex-1 rounded-none"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Button>
            <Button
              variant={activeTab === 'contact' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('contact')}
              className="flex-1 rounded-none"
            >
              <Send className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>

          <div className="mt-4">
            {activeTab === 'faq' && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">
                    We typically respond within <strong>12 hours</strong>
                  </p>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={handleEmailSupport}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support Directly
                </Button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MessageCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">
                    Send us a message and we'll get back to you within <strong>12 hours</strong>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportName">Name *</Label>
                    <Input
                      id="supportName"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Email *</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportSubject">Subject (Optional)</Label>
                    <Input
                      id="supportSubject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportMessage">Message *</Label>
                    <Textarea
                      id="supportMessage"
                      placeholder="Please describe your issue or question in detail..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button onClick={handleContactSubmit} className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    
                    <Button
                      onClick={handleEmailSupport}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Or Email Us Directly
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportChat;

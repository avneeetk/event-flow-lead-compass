
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, Mail, X, Send } from 'lucide-react';

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportChat = ({ isOpen, onClose }: SupportChatProps) => {
  const [supportMethod, setSupportMethod] = useState<'form' | 'email'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSendEmail = () => {
    const subject = encodeURIComponent('WOW Circle Support Request');
    const body = encodeURIComponent(`
Hi WOW Circle Support Team,

I need help with the following:

${formData.message}

Best regards,
${formData.name}
${formData.email}
    `);
    
    const emailUrl = `mailto:support@wowcircle.com?subject=${subject}&body=${body}`;
    window.open(emailUrl);
    onClose();
  };

  const handleSubmitForm = () => {
    // In a real app, this would send to your support system
    console.log('Support request:', formData);
    alert('Support request submitted! We\'ll get back to you within 24 hours.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-cyan-600" />
            <CardTitle className="text-lg">Get Help</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Method Selection */}
          <div className="flex space-x-2">
            <Button
              variant={supportMethod === 'form' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSupportMethod('form')}
              className="flex-1"
            >
              Quick Form
            </Button>
            <Button
              variant={supportMethod === 'email' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSupportMethod('email')}
              className="flex-1"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>

          {supportMethod === 'form' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="What do you need help with?"
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your issue or question..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmitForm} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h3 className="font-medium text-cyan-800 mb-2">Email Support</h3>
                <p className="text-sm text-cyan-700 mb-3">
                  Click the button below to open your email client with a pre-filled message to our support team.
                </p>
                <p className="text-xs text-cyan-600">
                  <strong>Response time:</strong> Within 24 hours<br />
                  <strong>Email:</strong> support@wowcircle.com
                </p>
              </div>

              <div className="space-y-2">
                <Label>Brief description (optional)</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="What do you need help with?"
                  rows={3}
                />
              </div>

              <Button onClick={handleSendEmail} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Open Email Client
              </Button>
            </div>
          )}

          {/* Quick Help Links */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 mb-2">Quick Help</h4>
            <div className="space-y-2 text-sm">
              <Button variant="ghost" size="sm" className="w-full justify-start p-2 h-auto">
                📱 How to scan business cards
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start p-2 h-auto">
                📧 Setting up email templates
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start p-2 h-auto">
                👥 Adding team members
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start p-2 h-auto">
                📊 Understanding ROI reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportChat;

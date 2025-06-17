
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Check, Mail, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LeadEditModalProps {
  leadData: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

const LeadEditModal = ({ leadData, onSave, onClose }: LeadEditModalProps) => {
  const [formData, setFormData] = useState({
    name: leadData.name || '',
    company: leadData.company || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    designation: leadData.designation || '',
    notes: leadData.notes || '',
    tags: leadData.tags || [],
    followUpTime: leadData.followUpTime || '24h'
  });

  const [showEmailGenerator, setShowEmailGenerator] = useState(false);

  const tagOptions = [
    "Hot Lead", "Cold Lead", "Warm Lead", 
    "Distributor", "Doctor", "Pharmacist", 
    "Decision Maker", "Investor", "Partner"
  ];

  const followUpOptions = [
    { value: '2h', label: '2 hours' },
    { value: '24h', label: '24 hours' },
    { value: '3d', label: '3 days' },
    { value: '1w', label: '1 week' },
    { value: 'custom', label: 'Custom' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSave = () => {
    const savedData = {
      ...leadData,
      ...formData,
      updatedAt: new Date().toISOString()
    };
    
    onSave(savedData);
    toast({
      title: "Lead Saved!",
      description: "Contact information updated successfully.",
    });
  };

  const handleSaveAndEmail = () => {
    handleSave();
    setShowEmailGenerator(true);
  };

  const generateEmail = () => {
    const emailContent = `Hi ${formData.name},

It was great meeting you at ${leadData.event} today! I enjoyed our conversation about ${formData.company}'s initiatives.

As discussed, I think our solutions could be a great fit for your needs. I'd love to schedule a brief call this week to explore how we can support your objectives.

Are you available for a 30-minute conversation?

Best regards,
Sarah Verma`;

    // In a real app, this would integrate with email client
    toast({
      title: "Email Generated!",
      description: "Opening email draft in your default email client.",
    });
    
    // Simulate opening email client
    const emailUrl = `mailto:${formData.email}?subject=Following up from ${leadData.event}&body=${encodeURIComponent(emailContent)}`;
    window.open(emailUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Review & Edit Lead</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Confidence Score */}
          {leadData.confidence && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">AI Extraction Confidence</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {leadData.confidence}%
                </Badge>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Title</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Company name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 xxxxx xxxxx"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <Button
                  key={tag}
                  variant={formData.tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Follow-up Time */}
          <div className="space-y-2">
            <Label>Follow-up Reminder</Label>
            <div className="grid grid-cols-3 gap-2">
              {followUpOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.followUpTime === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('followUpTime', option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add notes about this lead..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleSave} variant="outline" className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </Button>
              <Button onClick={handleSaveAndEmail} className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Save & Email</span>
              </Button>
            </div>
            
            {showEmailGenerator && (
              <Button onClick={generateEmail} className="w-full bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Generate & Send Email
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadEditModal;

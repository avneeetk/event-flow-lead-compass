
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge, User, Building, Globe, Linkedin, Upload, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationScreenProps {
  onComplete: (userData: any) => void;
}

const RegistrationScreen = ({ onComplete }: RegistrationScreenProps) => {
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    role: '',
    // Business Details
    company: '',
    website: '',
    industry: '',
    primaryRole: '',
    eventsPerYear: '',
    teamSize: '',
    leadingTeam: '',
    addTeammatesNow: '',
    // Preferences
    linkedin: '',
    preferredCommunication: '',
    hearAboutUs: '',
    // Optional
    brochure: null as File | null
  });

  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Personal Information",
      icon: <User className="w-6 h-6" />,
      fields: ['name', 'email', 'phone', 'role']
    },
    {
      title: "Business Details", 
      icon: <Building className="w-6 h-6" />,
      fields: ['company', 'website', 'industry', 'primaryRole', 'eventsPerYear']
    },
    {
      title: "Team & Preferences",
      icon: <Users className="w-6 h-6" />,
      fields: ['teamSize', 'leadingTeam', 'preferredCommunication']
    },
    {
      title: "Social & Optional",
      icon: <Globe className="w-6 h-6" />,
      fields: ['linkedin', 'hearAboutUs', 'brochure']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, brochure: file }));
  };

  const isCurrentSectionValid = () => {
    const currentFields = sections[currentSection].fields;
    return currentFields.every(field => {
      if (['brochure', 'linkedin', 'website', 'hearAboutUs', 'addTeammatesNow'].includes(field)) return true;
      return formData[field as keyof typeof formData];
    });
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      completeRegistration();
    }
  };

  const completeRegistration = () => {
    toast({
      title: "Registration Complete!",
      description: "Welcome to WOW Circle. Let's set up your event mode.",
    });
    onComplete(formData);
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8 space-x-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentSection ? 'bg-cyan-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                {currentSectionData.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{currentSectionData.title}</CardTitle>
                <p className="text-white/80 text-sm">Step {currentSection + 1} of {sections.length}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Personal Information */}
            {currentSection === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Sarah Verma"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sarah@pharmatech.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white/90">Job Title *</Label>
                  <Input
                    id="role"
                    placeholder="Sales Lead, Business Development"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
              </>
            )}

            {/* Business Details */}
            {currentSection === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white/90">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="PharmaTech Solutions"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white/90">Company Website</Label>
                  <Input
                    id="website"
                    placeholder="https://pharmatech.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white/90">Industry Type *</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="b2b-saas">B2B SaaS</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryRole" className="text-white/90">Primary Role at Events *</Label>
                  <Select onValueChange={(value) => handleInputChange('primaryRole', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exhibitor">Exhibitor</SelectItem>
                      <SelectItem value="visitor">Visitor</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventsPerYear" className="text-white/90">Events Attended Annually *</Label>
                  <Select onValueChange={(value) => handleInputChange('eventsPerYear', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 events</SelectItem>
                      <SelectItem value="4-8">4-8 events</SelectItem>
                      <SelectItem value="9-15">9-15 events</SelectItem>
                      <SelectItem value="15+">15+ events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Team & Preferences */}
            {currentSection === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-white/90">Team Size *</Label>
                  <Select onValueChange={(value) => handleInputChange('teamSize', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="just-me">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="15+">15+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadingTeam" className="text-white/90">Are you leading a team? *</Label>
                  <Select onValueChange={(value) => handleInputChange('leadingTeam', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I'm a team lead</SelectItem>
                      <SelectItem value="no">No, I'm an individual contributor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredCommunication" className="text-white/90">Preferred Communication *</Label>
                  <Select onValueChange={(value) => handleInputChange('preferredCommunication', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Social & Optional */}
            {currentSection === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-white/90 flex items-center space-x-2">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/sarahverma"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hearAboutUs" className="text-white/90">How did you hear about WOW Circle?</Label>
                  <Select onValueChange={(value) => handleInputChange('hearAboutUs', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="colleague">Colleague referral</SelectItem>
                      <SelectItem value="event">At an event</SelectItem>
                      <SelectItem value="search">Google search</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90 flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Company Brochure (Optional)</span>
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="bg-white/10 border-white/30 border-2 border-dashed rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-white/70" />
                      <p className="text-white/70 text-sm">
                        {formData.brochure ? formData.brochure.name : "Tap to upload PDF or DOC"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 space-y-3">
              <Button
                onClick={nextSection}
                disabled={!isCurrentSectionValid()}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg"
              >
                {currentSection === sections.length - 1 ? "Enter Event Mode" : "Continue"}
              </Button>
              
              {currentSection > 0 && (
                <Button
                  onClick={() => setCurrentSection(currentSection - 1)}
                  variant="ghost"
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  Back
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationScreen;

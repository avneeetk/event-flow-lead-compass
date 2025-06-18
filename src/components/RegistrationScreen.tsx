import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge, Upload, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationScreenProps {
  onComplete: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegistrationScreen = ({ onComplete, onSwitchToLogin }: RegistrationScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    password: '',
    phone: '',
    
    // Business Details
    companyName: '',
    businessEmail: '',
    jobTitle: '',
    location: '',
    website: '',
    primaryRole: '',
    industryType: '',
    eventsPerYear: '1-5',
    
    // Team & Preferences
    teamSize: '1',
    isTeamLead: false,
    addTeammates: false,
    preferredComm: 'email',
    
    // Social & Optional
    linkedinProfile: '',
    instagram: '',
    whatsappBusiness: '',
    twitter: '',
    companyBrochure: null as File | null,
    hearAboutUs: ''
  });

  const steps = [
    {
      title: "Personal Information",
      subtitle: "Let's start with your basic details",
      fields: ['fullName', 'email', 'password', 'phone']
    },
    {
      title: "Business Details",
      subtitle: "Tell us about your business",
      fields: ['companyName', 'businessEmail', 'jobTitle', 'location', 'website', 'primaryRole', 'industryType', 'eventsPerYear']
    },
    {
      title: "Team & Preferences",
      subtitle: "How do you work with your team?",
      fields: ['teamSize', 'isTeamLead', 'addTeammates', 'preferredComm']
    },
    {
      title: "Social & Optional",
      subtitle: "Connect your social presence (optional)",
      fields: ['linkedinProfile', 'instagram', 'whatsappBusiness', 'twitter', 'companyBrochure', 'hearAboutUs']
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('companyBrochure', file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully`
      });
    }
  };

  const validateStep = () => {
    const currentStepData = steps[currentStep];
    const requiredFields = currentStepData.fields.filter(field => {
      // Define required fields per step
      if (currentStep === 0) return ['fullName', 'email', 'password'].includes(field);
      if (currentStep === 1) return ['companyName', 'businessEmail', 'jobTitle'].includes(field);
      return false;
    });

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before continuing",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeRegistration();
      }
    }
  };

  const completeRegistration = () => {
    const userData = {
      ...formData,
      registeredAt: new Date().toISOString(),
      id: Date.now()
    };

    toast({
      title: "Registration Complete!",
      description: "Welcome to WOW Circle. Let's get you started!"
    });

    onComplete(userData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/90">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a secure password"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 xxxxx xxxxx"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white/90">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmail" className="text-white/90">Business Email *</Label>
              <Input
                id="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                placeholder="business@company.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
              <p className="text-xs text-white/60">This will be used for sending follow-up emails</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-white/90">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Your role"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white/90">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-white/90">Company Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="primaryRole" className="text-white/90">Primary Role at Events</Label>
                <select
                  id="primaryRole"
                  value={formData.primaryRole}
                  onChange={(e) => handleInputChange('primaryRole', e.target.value)}
                  className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
                >
                  <option value="" className="text-gray-800">Select role</option>
                  <option value="exhibitor" className="text-gray-800">Exhibitor</option>
                  <option value="visitor" className="text-gray-800">Visitor</option>
                  <option value="buyer" className="text-gray-800">Buyer</option>
                  <option value="speaker" className="text-gray-800">Speaker</option>
                  <option value="sponsor" className="text-gray-800">Sponsor</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industryType" className="text-white/90">Industry Type</Label>
                <select
                  id="industryType"
                  value={formData.industryType}
                  onChange={(e) => handleInputChange('industryType', e.target.value)}
                  className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
                >
                  <option value="" className="text-gray-800">Select industry</option>
                  <option value="pharmaceuticals" className="text-gray-800">Pharmaceuticals</option>
                  <option value="healthcare" className="text-gray-800">Healthcare</option>
                  <option value="b2b-saas" className="text-gray-800">B2B SaaS</option>
                  <option value="education" className="text-gray-800">Education</option>
                  <option value="fintech" className="text-gray-800">FinTech</option>
                  <option value="manufacturing" className="text-gray-800">Manufacturing</option>
                  <option value="other" className="text-gray-800">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventsPerYear" className="text-white/90">Events Attended Annually</Label>
              <select
                id="eventsPerYear"
                value={formData.eventsPerYear}
                onChange={(e) => handleInputChange('eventsPerYear', e.target.value)}
                className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
              >
                <option value="1-5" className="text-gray-800">1-5 events</option>
                <option value="6-15" className="text-gray-800">6-15 events</option>
                <option value="16-30" className="text-gray-800">16-30 events</option>
                <option value="30+" className="text-gray-800">30+ events</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="teamSize" className="text-white/90">Team Size</Label>
                <select
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
                >
                  <option value="1" className="text-gray-800">Just me</option>
                  <option value="2-5" className="text-gray-800">2-5 people</option>
                  <option value="6-15" className="text-gray-800">6-15 people</option>
                  <option value="16+" className="text-gray-800">16+ people</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredComm" className="text-white/90">Preferred Communication</Label>
                <select
                  id="preferredComm"
                  value={formData.preferredComm}
                  onChange={(e) => handleInputChange('preferredComm', e.target.value)}
                  className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
                >
                  <option value="email" className="text-gray-800">Email</option>
                  <option value="whatsapp" className="text-gray-800">WhatsApp</option>
                  <option value="both" className="text-gray-800">Both</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isTeamLead"
                  checked={formData.isTeamLead}
                  onChange={(e) => handleInputChange('isTeamLead', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isTeamLead" className="text-white/90">I lead a team at events</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="addTeammates"
                  checked={formData.addTeammates}
                  onChange={(e) => handleInputChange('addTeammates', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="addTeammates" className="text-white/90">I want to add teammates now</Label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-white/70 mb-4">Connect your social profiles (all optional)</p>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="linkedinProfile" className="text-white/90">LinkedIn Profile</Label>
                <Input
                  id="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  placeholder="https://linkedin.com/in/yourname"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white/90">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="@yourusername"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappBusiness" className="text-white/90">WhatsApp Business</Label>
                <Input
                  id="whatsappBusiness"
                  value={formData.whatsappBusiness}
                  onChange={(e) => handleInputChange('whatsappBusiness', e.target.value)}
                  placeholder="+91 xxxxx xxxxx"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-white/90">X/Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="@yourusername"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyBrochure" className="text-white/90">Company Brochure/Deck (Optional)</Label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="companyBrochure"
                  onChange={handleFileUpload}
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => document.getElementById('companyBrochure')?.click()}
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.companyBrochure ? formData.companyBrochure.name : 'Upload File'}
                </Button>
                <p className="text-xs text-white/60 mt-2">PDF, PPT, DOC files up to 10MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hearAboutUs" className="text-white/90">How did you hear about WOW Circle?</Label>
              <select
                id="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                className="w-full p-2 border border-white/30 rounded-md bg-white/20 text-white"
              >
                <option value="" className="text-gray-800">Select source</option>
                <option value="google" className="text-gray-800">Google Search</option>
                <option value="linkedin" className="text-gray-800">LinkedIn</option>
                <option value="referral" className="text-gray-800">Friend/Colleague Referral</option>
                <option value="event" className="text-gray-800">At an event</option>
                <option value="social" className="text-gray-800">Social Media</option>
                <option value="other" className="text-gray-800">Other</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8 space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-cyan-400 w-8' : 'bg-white/30 w-2'
              }`}
            />
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Badge className="w-16 h-16 text-cyan-400 bg-white/10 backdrop-blur-sm border-white/20" />
            </div>
            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
            <p className="text-white/80 text-sm">{steps[currentStep].subtitle}</p>
            <p className="text-white/60 text-xs">Step {currentStep + 1} of {steps.length}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStepContent()}

            <div className="space-y-3 pt-4">
              <Button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg"
              >
                {currentStep === steps.length - 1 ? "Complete Registration" : "Continue"}
              </Button>
              
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="ghost"
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  Back
                </Button>
              )}

              {currentStep === 0 && (
                <div className="text-center">
                  <p className="text-white/80 text-sm">
                    Already have an account?{' '}
                    <Button
                      variant="link"
                      onClick={onSwitchToLogin}
                      className="text-cyan-300 hover:text-cyan-200 p-0 h-auto font-semibold"
                    >
                      Sign In
                    </Button>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationScreen;

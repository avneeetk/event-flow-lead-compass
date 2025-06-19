
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Building, Globe, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationScreenProps {
  onComplete: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegistrationScreen = ({ onComplete, onSwitchToLogin }: RegistrationScreenProps) => {
  const [formData, setFormData] = useState({
    // Section 1: Create Account
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Section 2: Business Information
    company: '',
    industry: '',
    city: '',
    role: '',
    // Section 3: Communication Channels
    whatsappEnabled: false,
    whatsappNumber: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    website: '',
    businessEmail: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const sections = [
    {
      title: "Create Account",
      icon: <User className="w-6 h-6" />,
      fields: ['name', 'email', 'password', 'confirmPassword']
    },
    {
      title: "Business Information", 
      icon: <Building className="w-6 h-6" />,
      fields: ['company', 'industry', 'city', 'role']
    },
    {
      title: "Communication Channels",
      icon: <Globe className="w-6 h-6" />,
      fields: [] // All optional fields
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateCurrentSection = () => {
    const errors: string[] = [];
    const currentFields = sections[currentSection].fields;
    
    if (currentSection === 0) {
      // Section 1: All fields required + password match
      if (!formData.name.trim()) errors.push("Full Name is required");
      if (!formData.email.trim()) errors.push("Email Address is required");
      if (!formData.password) errors.push("Password is required");
      if (!formData.confirmPassword) errors.push("Confirm Password is required");
      if (formData.password && formData.password.length < 6) errors.push("Password must be at least 6 characters");
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        errors.push("Passwords don't match");
      }
    } else if (currentSection === 1) {
      // Section 2: All fields required
      if (!formData.company.trim()) errors.push("Company Name is required");
      if (!formData.industry) errors.push("Industry is required");
      if (!formData.city.trim()) errors.push("City is required");
      if (!formData.role.trim()) errors.push("Your Role is required");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const isCurrentSectionValid = () => {
    const currentFields = sections[currentSection].fields;
    
    if (currentSection === 0) {
      // Section 1: All fields required + password match
      const requiredValid = currentFields.every(field => formData[field as keyof typeof formData]);
      const passwordMatch = formData.password === formData.confirmPassword;
      const passwordLength = formData.password.length >= 6;
      return requiredValid && passwordMatch && passwordLength;
    } else if (currentSection === 1) {
      // Section 2: All fields required
      return currentFields.every(field => formData[field as keyof typeof formData]);
    } else {
      // Section 3: All optional
      return true;
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      if (validateCurrentSection()) {
        setCurrentSection(currentSection + 1);
      }
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
            {/* Section 1: Create Account */}
            {currentSection === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Sarah Verma"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
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
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">Password * (min 6 characters)</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Section 2: Business Information */}
            {currentSection === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white/90">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="PharmaTech Solutions"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white/90">Industry *</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white focus:bg-white/20">
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
                  <Label htmlFor="city" className="text-white/90">City *</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai, Bengaluru, Delhi"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white/90">Your Role *</Label>
                  <Input
                    id="role"
                    placeholder="Sales Lead, Business Development"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
              </>
            )}

            {/* Section 3: Communication Channels */}
            {currentSection === 2 && (
              <>
                <p className="text-white/80 text-sm mb-4">All fields in this section are optional</p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={formData.whatsappEnabled}
                      onCheckedChange={(checked) => handleInputChange('whatsappEnabled', checked)}
                    />
                    <Label className="text-white/90">WhatsApp Business</Label>
                  </div>
                  {formData.whatsappEnabled && (
                    <Input
                      placeholder="+91 98765 43210"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessEmail" className="text-white/90">Business Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="sarah@company.com (for lead follow-ups)"
                    value={formData.businessEmail}
                    onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-white/90">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/sarahverma"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-white/90">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourcompany"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-white/90">X/Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="@yourcompany"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white/90">Company Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
              </>
            )}

            {/* Validation Error Messages */}
            {validationErrors.length > 0 && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Please fix the following:</span>
                </div>
                <ul className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-red-300 text-sm">• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button
                onClick={nextSection}
                disabled={!isCurrentSectionValid()}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg"
              >
                {currentSection === sections.length - 1 ? "Complete Registration" : "Continue"}
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

              {currentSection === 0 && (
                <div className="pt-4 text-center">
                  <p className="text-white/60 text-sm">
                    Already have an account?{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Login
                    </button>
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

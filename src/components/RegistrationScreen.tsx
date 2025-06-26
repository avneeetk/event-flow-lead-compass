
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, MessageSquare, Eye, EyeOff, AlertCircle, Check, X, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationScreenProps {
  onComplete: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegistrationScreen = ({ onComplete, onSwitchToLogin }: RegistrationScreenProps) => {
  const [formData, setFormData] = useState({
    // Step 1: Account Setup
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Company Details
    companyName: '',
    companyLogo: '',
    website: '',
    businessCategory: '',
    industry: '',
    // Step 3: Communication & Branding
    whatsappNumber: '',
    businessContactNumber: '',
    facebookPage: '',
    instagramHandle: '',
    linkedinHandle: '',
    meetingLink: '',
    companyBrochure: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const steps = [
    {
      title: "Account Setup",
      subtitle: "Create your login credentials",
      icon: <User className="w-6 h-6" />,
    },
    {
      title: "Company Details",
      subtitle: "Tell us about your business",
      icon: <Building className="w-6 h-6" />,
    },
    {
      title: "Communication & Branding",
      subtitle: "How can clients reach you? (All Optional)",
      icon: <MessageSquare className="w-6 h-6" />,
    }
  ];

  const businessCategories = [
    "Healthcare & Pharmaceuticals",
    "Technology & Software",
    "Manufacturing",
    "Retail & E-commerce",
    "Financial Services",
    "Real Estate",
    "Education",
    "Consulting & Services",
    "Food & Beverage",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(criteria).forEach(met => met && score++);
    
    return { score, criteria };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateStep1 = () => {
    const errors: string[] = [];
    
    if (!formData.email.trim()) {
      errors.push("Business email is required");
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errors.push("Please enter a valid email address");
    }
    
    if (!formData.password) {
      errors.push("Password is required");
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    
    if (!formData.confirmPassword) {
      errors.push("Please confirm your password");
    } else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.push("Passwords don't match");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const validateStep2 = () => {
    const errors: string[] = [];
    
    if (!formData.companyName.trim()) {
      errors.push("Company name is required");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const isStep1Valid = () => {
    const hasEmail = formData.email.trim().length > 0;
    const hasValidEmail = formData.email.includes('@') && formData.email.includes('.');
    const hasPassword = formData.password.length >= 6;
    const hasConfirmPassword = formData.confirmPassword.length > 0;
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    return hasEmail && hasValidEmail && hasPassword && hasConfirmPassword && passwordsMatch;
  };

  const isStep2Valid = () => {
    return formData.companyName.trim().length > 0;
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (validateStep1()) {
        setCurrentStep(1);
      }
    } else if (currentStep === 1) {
      if (validateStep2()) {
        setCurrentStep(2);
      }
    } else {
      completeRegistration();
    }
  };

  const completeRegistration = () => {
    const userData = {
      email: formData.email,
      companyName: formData.companyName,
      companyLogo: formData.companyLogo,
      website: formData.website,
      businessCategory: formData.businessCategory,
      industry: formData.industry,
      businessContactNumber: formData.businessContactNumber,
      whatsappNumber: formData.whatsappNumber,
      facebookPage: formData.facebookPage,
      instagramHandle: formData.instagramHandle,
      linkedinHandle: formData.linkedinHandle,
      meetingLink: formData.meetingLink,
      companyBrochure: formData.companyBrochure,
      profileCompleteness: calculateProfileCompleteness()
    };

    toast({
      title: "🎉 Profile Created Successfully!",
      description: "Welcome to WOW Circle. Your 14-day free trial has started.",
    });
    
    onComplete(userData);
  };

  const calculateProfileCompleteness = () => {
    let completed = 3; // email, password, company name always completed
    let total = 13;
    
    if (formData.companyLogo) completed++;
    if (formData.website) completed++;
    if (formData.businessCategory) completed++;
    if (formData.industry) completed++;
    if (formData.businessContactNumber) completed++;
    if (formData.whatsappNumber) completed++;
    if (formData.facebookPage) completed++;
    if (formData.instagramHandle) completed++;
    if (formData.linkedinHandle) completed++;
    if (formData.meetingLink) completed++;
    if (formData.companyBrochure) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-cyan-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                {currentStepData.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <p className="text-white/80 text-sm">{currentStepData.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Step 1: Account Setup */}
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sarah@pharmatech.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                  <p className="text-white/60 text-xs">This email will be your login credential</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">Password *</Label>
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-white/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.score < 2 ? 'bg-red-400' :
                              passwordStrength.score < 4 ? 'bg-yellow-400' : 'bg-green-400'
                            }`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/70">
                          {passwordStrength.score < 2 ? 'Weak' :
                           passwordStrength.score < 4 ? 'Medium' : 'Strong'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {Object.entries({
                          '8+ characters': passwordStrength.criteria.length,
                          'Uppercase': passwordStrength.criteria.uppercase,
                          'Lowercase': passwordStrength.criteria.lowercase,
                          'Number': passwordStrength.criteria.number
                        }).map(([label, met]) => (
                          <div key={label} className="flex items-center space-x-1">
                            {met ? 
                              <Check className="w-3 h-3 text-green-400" /> : 
                              <X className="w-3 h-3 text-white/40" />
                            }
                            <span className={met ? 'text-green-400' : 'text-white/40'}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

            {/* Step 2: Company Details */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white/90">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Pharmatech Solutions"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyLogo" className="text-white/90">Company Logo (Optional)</Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <span className="text-white/60 text-xs">JPG, PNG up to 2MB</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white/90">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="www.pharmatech.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessCategory" className="text-white/90">Business Category (Optional)</Label>
                  <Select value={formData.businessCategory} onValueChange={(value) => handleInputChange('businessCategory', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white focus:bg-white/20">
                      <SelectValue placeholder="Select your business category" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white/90">Industry (Optional)</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Pharmaceutical Manufacturing"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                  />
                </div>
              </>
            )}

            {/* Step 3: Communication & Branding */}
            {currentStep === 2 && (
              <>
                <div className="mb-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <p className="text-blue-200 text-sm">
                    ℹ️ All fields are optional. Complete these to boost your credibility and make it easier for leads to connect with you.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Core Communication Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber" className="text-white/90">WhatsApp Business Number</Label>
                    <Input
                      id="whatsappNumber"
                      placeholder="+91 98765 43210"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessContactNumber" className="text-white/90">Business Contact Number</Label>
                    <Input
                      id="businessContactNumber"
                      placeholder="+91 98765 43210"
                      value={formData.businessContactNumber}
                      onChange={(e) => handleInputChange('businessContactNumber', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meetingLink" className="text-white/90">Calendly / Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      placeholder="calendly.com/sarah-pharmatech"
                      value={formData.meetingLink}
                      onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                    />
                    <p className="text-white/50 text-xs">Google Meet, Zoom, or Calendly link</p>
                  </div>

                  {/* Expandable More Details Section */}
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                      className="w-full text-white/80 hover:text-white hover:bg-white/10 justify-between"
                    >
                      Add More Details (Social & Branding)
                      {showMoreDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                    
                    {showMoreDetails && (
                      <div className="mt-4 space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="space-y-3">
                          <Label className="text-white/90">Social Media Presence</Label>
                          <div className="space-y-2">
                            <Input
                              placeholder="Facebook Business Page URL"
                              value={formData.facebookPage}
                              onChange={(e) => handleInputChange('facebookPage', e.target.value)}
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                            />
                            <Input
                              placeholder="Instagram handle (@yourcompany)"
                              value={formData.instagramHandle}
                              onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                            />
                            <Input
                              placeholder="LinkedIn profile or company page URL"
                              value={formData.linkedinHandle}
                              onChange={(e) => handleInputChange('linkedinHandle', e.target.value)}
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyBrochure" className="text-white/90">Company Brochure</Label>
                          <div className="flex items-center space-x-3">
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Brochure
                            </Button>
                            <span className="text-white/60 text-xs">PDF, JPG, PNG up to 5MB</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                onClick={nextStep}
                disabled={
                  (currentStep === 0 && !isStep1Valid()) ||
                  (currentStep === 1 && !isStep2Valid())
                }
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 2 ? "Complete Registration" : "Next"}
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

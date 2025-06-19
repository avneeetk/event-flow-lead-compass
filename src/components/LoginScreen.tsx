
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onLogin: (credentials: any) => void;
  onSwitchToRegister: () => void;
  onGuestMode: () => void;
}

const LoginScreen = ({ onLogin, onSwitchToRegister, onGuestMode }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        description: "Email and password are required to login.",
        variant: "destructive"
      });
      return;
    }

    // Simulate login validation
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.email === formData.email) {
        toast({
          title: "Welcome back!",
          description: "Login successful. Redirecting to your dashboard.",
        });
        onLogin(formData);
        return;
      }
    }

    toast({
      title: "Invalid credentials",
      description: "Please check your email and password.",
      variant: "destructive"
    });
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Welcome Back</CardTitle>
                <p className="text-white/80 text-sm">Use your registered credentials to continue</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email Address</Label>
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
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleLogin}
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg"
              >
                Login
              </Button>

              <Button
                onClick={() => toast({
                  title: "Feature Coming Soon",
                  description: "Password reset functionality will be available soon.",
                })}
                variant="ghost"
                className="w-full text-white/80 hover:text-white hover:bg-white/10"
              >
                Forgot Password?
              </Button>

              <Button
                onClick={onGuestMode}
                variant="ghost"
                className="w-full text-white/60 hover:text-white/80 hover:bg-white/5 text-sm"
              >
                Continue as Guest (Optional)
              </Button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;

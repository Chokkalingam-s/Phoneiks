import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, GraduationCap, User, Users, Building, Eye, EyeOff } from 'lucide-react';

interface RoleBasedLoginProps {
  onBack: () => void;
  onLogin: (role: string, credentials: any) => void;
}

type UserRole = 'student' | 'parent' | 'institution' | 'government';

export function RoleBasedLogin({ onBack, onLogin }: RoleBasedLoginProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    udid: '',
    password: '',
    institutionId: '',
    govId: ''
  });

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Student / PwD',
      subtitle: 'UDID Linked Account',
      icon: User,
      description: 'Access personalized schemes, educational resources, and employment opportunities.',
      fields: ['udid', 'password']
    },
    {
      id: 'parent' as UserRole,
      title: 'Parent / Guardian',
      subtitle: 'Family Support Access',
      icon: Users,
      description: 'Monitor progress and access support resources for your child.',
      fields: ['email', 'password']
    },
    {
      id: 'institution' as UserRole,
      title: 'Institution / Faculty',
      subtitle: 'Educational Partner',
      icon: GraduationCap,
      description: 'Share resources, connect with other educators, and track student progress.',
      fields: ['email', 'institutionId', 'password']
    },
    {
      id: 'government' as UserRole,
      title: 'Government / Admin',
      subtitle: 'Administrative Access',
      icon: Building,
      description: 'Manage schemes, monitor impact, and oversee platform operations.',
      fields: ['email', 'govId', 'password']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeRole, formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInputField = (field: string) => {
    switch (field) {
      case 'email':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00]"
              required
            />
          </div>
        );
      case 'udid':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="udid">UDID Number</Label>
            <Input
              id="udid"
              type="text"
              placeholder="Enter your UDID"
              value={formData.udid}
              onChange={(e) => handleInputChange('udid', e.target.value)}
              className="border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00]"
              required
            />
          </div>
        );
      case 'institutionId':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="institutionId">Institution ID</Label>
            <Input
              id="institutionId"
              type="text"
              placeholder="Enter institution ID"
              value={formData.institutionId}
              onChange={(e) => handleInputChange('institutionId', e.target.value)}
              className="border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00]"
              required
            />
          </div>
        );
      case 'govId':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="govId">Government ID</Label>
            <Input
              id="govId"
              type="text"
              placeholder="Enter government ID"
              value={formData.govId}
              onChange={(e) => handleInputChange('govId', e.target.value)}
              className="border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00]"
              required
            />
          </div>
        );
      case 'password':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00] pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-[#F77F00]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F77F00] to-[#FF9500] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">P</span>
              </div>
              <h1 className="text-3xl text-gray-900">Welcome to Phoeniks</h1>
            </div>
            <p className="text-lg text-gray-600">Choose your role to access personalized features</p>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white border border-gray-200">
            {roles.map((role) => (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="flex flex-col items-center p-4 space-y-2 data-[state=active]:bg-[#F77F00] data-[state=active]:text-white"
              >
                <role.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="text-sm">{role.title}</div>
                  <div className="text-xs opacity-75">{role.subtitle}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {roles.map((role) => (
            <TabsContent key={role.id} value={role.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-md mx-auto shadow-lg border-0">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#F77F00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{role.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {role.fields.map(field => renderInputField(field))}
                      
                      <div className="space-y-4 pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-[#F77F00] hover:bg-[#E67000] text-white py-3 rounded-xl"
                        >
                          Sign In
                        </Button>
                        
                        <div className="flex justify-between text-sm">
                          <Button variant="link" className="text-[#F77F00] hover:text-[#E67000] p-0">
                            Forgot Password?
                          </Button>
                          <Button variant="link" className="text-[#F77F00] hover:text-[#E67000] p-0">
                            Register
                          </Button>
                        </div>
                        
                        <div className="text-center pt-4 border-t border-gray-200">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => onLogin('guest', {})}
                          >
                            Continue as Guest
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Accessibility Note */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need assistance? Press <kbd className="px-2 py-1 bg-gray-200 rounded">Alt + A</kbd> for accessibility options</p>
        </div>
      </div>
    </div>
  );
}
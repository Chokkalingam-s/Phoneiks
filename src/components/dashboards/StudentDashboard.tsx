import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { DashboardHeader } from '../DashboardHeader';
import { ChatbotWidget } from '../ChatbotWidget';
import { 
  GraduationCap, 
  Briefcase, 
  Brain, 
  FileText, 
  Star, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface StudentDashboardProps {
  userProfile: {
    name: string;
    udid: string;
    disability: string;
    grade: string;
    profileImage?: string;
  };
  onLogout: () => void;
}

export function StudentDashboard({ userProfile, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('schemes');

  const schemes = [
    {
      id: 1,
      title: "National Scholarship for Persons with Disabilities",
      description: "Financial assistance for higher education",
      amount: "₹50,000/year",
      eligibility: "10th pass, Annual income < ₹2.5L",
      deadline: "2024-12-15",
      status: "recommended",
      match: 95
    },
    {
      id: 2,
      title: "Skill Development Program - Digital Literacy",
      description: "Free computer training and certification",
      amount: "Free + Certificate",
      eligibility: "18+ years, Basic education",
      deadline: "2024-11-30",
      status: "eligible",
      match: 88
    },
    {
      id: 3,
      title: "State Special Education Support",
      description: "Assistive devices and learning materials",
      amount: "₹25,000",
      eligibility: "Enrolled students, Valid UDID",
      deadline: "2024-12-31",
      status: "applied",
      match: 92
    }
  ];

  const jobOpportunities = [
    {
      id: 1,
      title: "Customer Support Executive",
      company: "TechServe Solutions",
      location: "Remote/Hybrid",
      type: "Full-time",
      salary: "₹3-4 LPA",
      accessibility: "Screen reader compatible",
      match: 89
    },
    {
      id: 2,
      title: "Data Entry Specialist",
      company: "InfoCorp Ltd",
      location: "Mumbai",
      type: "Full-time",
      salary: "₹2.5-3.5 LPA",
      accessibility: "Wheelchair accessible",
      match: 76
    },
    {
      id: 3,
      title: "Content Writer",
      company: "CreativeMinds",
      location: "Remote",
      type: "Freelance",
      salary: "₹15,000-25,000/month",
      accessibility: "Flexible hours",
      match: 84
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: "Sign Language Basics",
      progress: 75,
      duration: "4 weeks",
      level: "Beginner",
      icon: "👐"
    },
    {
      id: 2,
      title: "Digital Skills for Employment",
      progress: 45,
      duration: "6 weeks",
      level: "Intermediate",
      icon: "💻"
    },
    {
      id: 3,
      title: "Financial Literacy",
      progress: 20,
      duration: "3 weeks",
      level: "Beginner",
      icon: "💰"
    }
  ];

  const documents = [
    {
      id: 1,
      title: "UDID Certificate",
      type: "Identity",
      status: "verified",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Disability Certificate",
      type: "Medical",
      status: "verified",
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "Education Certificate",
      type: "Academic",
      status: "pending",
      date: "2024-10-15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'eligible': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userProfile={userProfile} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-[#F77F00] to-[#FF9500] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{userProfile.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl mb-1">Welcome back, {userProfile.name}!</h1>
                  <p className="text-white/90">UDID: {userProfile.udid} • {userProfile.disability} • Grade {userProfile.grade}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/90">Profile Completion</div>
                  <div className="text-2xl">85%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
            <TabsTrigger value="schemes" className="flex items-center space-x-2 data-[state=active]:bg-[#F77F00] data-[state=active]:text-white">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2 data-[state=active]:bg-[#F77F00] data-[state=active]:text-white">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2 data-[state=active]:bg-[#F77F00] data-[state=active]:text-white">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2 data-[state=active]:bg-[#F77F00] data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>

          {/* Schemes & Scholarships Tab */}
          <TabsContent value="schemes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-900">Recommended Schemes & Scholarships</h2>
                <Badge className="bg-[#F77F00] text-white">
                  {schemes.length} Available
                </Badge>
              </div>
              
              <div className="grid gap-6">
                {schemes.map((scheme, index) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[#F77F00]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-900">{scheme.title}</CardTitle>
                            <CardDescription className="mt-1">{scheme.description}</CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(scheme.status)}>
                              {scheme.status}
                            </Badge>
                            <div className="text-sm text-gray-500 mt-1">
                              {scheme.match}% match
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-[#F77F00]" />
                            <span className="text-sm">{scheme.amount}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{scheme.eligibility}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Due: {scheme.deadline}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="bg-[#F77F00] hover:bg-[#E67000] text-white">
                            Apply Now
                          </Button>
                          <Button variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Employment Opportunities Tab */}
          <TabsContent value="jobs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-900">Employment Opportunities</h2>
                <Badge className="bg-[#F77F00] text-white">
                  {jobOpportunities.length} Available
                </Badge>
              </div>
              
              <div className="grid gap-6">
                {jobOpportunities.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-gray-900">{job.title}</CardTitle>
                            <CardDescription>{job.company} • {job.location}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-lg text-[#F77F00]">{job.salary}</div>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-green-100 text-green-800">
                            {job.accessibility}
                          </Badge>
                          <div className="text-sm text-gray-500">
                            {job.match}% match
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="bg-[#F77F00] hover:bg-[#E67000] text-white">
                            Apply Now
                          </Button>
                          <Button variant="outline">
                            Save Job
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Skill Learning Tab */}
          <TabsContent value="learning">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-900">Skill Learning Modules</h2>
                <Badge className="bg-[#F77F00] text-white">
                  In Progress: 3
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="text-center">
                          <div className="text-4xl mb-2">{module.icon}</div>
                          <CardTitle className="text-lg text-gray-900">{module.title}</CardTitle>
                          <CardDescription>{module.duration} • {module.level}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                          <Button 
                            className="w-full bg-[#F77F00] hover:bg-[#E67000] text-white"
                            variant={module.progress > 0 ? "default" : "outline"}
                          >
                            {module.progress > 0 ? "Continue Learning" : "Start Course"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-900">My Benefits & Documents</h2>
                <Button className="bg-[#F77F00] hover:bg-[#E67000] text-white">
                  Upload Document
                </Button>
              </div>
              
              <div className="grid gap-4">
                {documents.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#F77F00]/10 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-[#F77F00]" />
                            </div>
                            <div>
                              <h3 className="text-lg text-gray-900">{doc.title}</h3>
                              <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Chat Widget */}
      <ChatbotWidget />
    </div>
  );
}
import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, Briefcase, Users, ChevronRight, Shield, Phone, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const features = [
    {
      icon: GraduationCap,
      title: "Empower through Education",
      description: "Access personalized learning resources, scholarships, and educational support tailored for every ability.",
      image: "https://images.unsplash.com/photo-1542725752-e9f7259b3881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMGJvb2tzfGVufDF8fHx8MTc1OTY2NTE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Briefcase,
      title: "Enable through Employment",
      description: "Discover meaningful employment opportunities and skill development programs designed for success.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBsb3ltZW50JTIwd29ya3BsYWNlJTIwb2ZmaWNlfGVufDF8fHx8MTc1OTczNzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Users,
      title: "Connect through Community",
      description: "Join a supportive network of educators, families, and advocates working together for inclusion.",
      image: "https://images.unsplash.com/photo-1746727207301-aeaf7c08f9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjb25uZWN0aW9uJTIwcGVvcGxlfGVufDF8fHx8MTc1OTczMjE3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F77F00] to-[#FF9500] rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">P</span>
              </div>
              <span className="text-xl text-[#F77F00]">Phoeniks</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin} className="text-gray-600 hover:text-[#F77F00]">
                Login
              </Button>
              <Button onClick={onGetStarted} className="bg-[#F77F00] hover:bg-[#E67000] text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl mb-6">
                <span className="text-gray-900">Empowering</span>{' '}
                <span className="text-[#F77F00]">Every Ability</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A unified platform connecting specially-abled individuals with personalized opportunities, 
                support systems, and inclusive communities. Together, we build a more accessible world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-[#F77F00] hover:bg-[#E67000] text-white px-8 py-4 rounded-xl"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={onLogin}
                  variant="outline"
                  size="lg"
                  className="border-[#F77F00] text-[#F77F00] hover:bg-[#F77F00] hover:text-white px-8 py-4 rounded-xl"
                >
                  Login as Role
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1726407702962-e0d51cc6df9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhYmlsaXR5JTIwaW5jbHVzaW9uJTIwZGl2ZXJzaXR5JTIwYWNjZXNzaWJpbGl0eXxlbnwxfHx8fDE3NTk3Mzc2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Inclusive community representation"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F77F00]/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4 text-gray-900">Three Pillars of Empowerment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform addresses the core needs of the specially-abled community 
              through education, employment, and connection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-[#F77F00] rounded-lg flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F77F00]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl text-white mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of individuals, families, and institutions creating a more inclusive world together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-[#F77F00] hover:bg-gray-100 px-8 py-4 rounded-xl"
              >
                Explore Schemes
              </Button>
              <Button
                onClick={onLogin}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#F77F00] px-8 py-4 rounded-xl"
              >
                Join Our Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#F77F00] to-[#FF9500] rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">P</span>
                </div>
                <span className="text-xl text-[#F77F00]">Phoeniks</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering every ability through unified access to opportunities and support.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Accessibility Policy</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Government Partnerships</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">Educational Institutions</a></li>
                <li><a href="#" className="hover:text-[#F77F00] transition-colors">NGO Network</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Phoeniks. All rights reserved. Built with accessibility in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Check, Star, Crown, Zap, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("basic");
  const { toast } = useToast();
const navigate = useNavigate();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "/month",
      jobLimit: 20,
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: [
        "Apply to 20 jobs per month",
        "Basic profile visibility",
        "Email support",
        "Job recommendations",
        "Resume builder access"
      ]
    },
    {
      id: "legend",
      name: "Legend",
      price: "$19.99",
      period: "/month",
      jobLimit: 40,
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        "Apply to 40 jobs per month",
        "Premium profile visibility",
        "Priority email support",
        "Advanced job matching",
        "Resume builder & templates",
        "Interview scheduling tools"
      ],
      popular: true
    },
    {
      id: "ultra-legend",
      name: "Ultra Legend",
      price: "$39.99",
      period: "/month",
      jobLimit: "Unlimited",
      icon: Zap,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      features: [
        "Unlimited job applications",
        "Maximum profile visibility",
        "24/7 priority support",
        "AI-powered job matching",
        "Premium resume templates",
        "Personal career advisor",
        "Salary negotiation tools",
        "Company insights access"
      ]
    }
  ];

  const handleLogout = () => {
  toast({
    title: "Logged Out",
    description: "You have been successfully logged out.",
  });

  // Simulate session clear, e.g., localStorage.removeItem("token");
  // localStorage.removeItem("authToken");

  setTimeout(() => {
    navigate("/login");
  }, 1000); // Delay so toast shows briefly
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/job-seeker-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/browse-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Browse Jobs</Link>
        {/* <Link to="/subscription" className="text-blue-600 font-medium">Subscription</Link> */}
        <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
      </nav>

      {/* Sign Out Button - Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Hamburger Icon - Mobile */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
      <Link to="/job-seeker-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
      <Link to="/browse-jobs" className="block text-gray-700 hover:text-blue-600">Browse Jobs</Link>
      {/* <Link to="/subscription" className="block text-blue-600 font-medium">Subscription</Link> */}
      <Link to="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setMobileMenuOpen(false);
          handleLogout();
        }}
        className="w-full mt-2 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )}
</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock your career potential with our flexible subscription plans. 
            Apply to more jobs and get priority access to opportunities.
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Current Plan</h3>
                  <p className="text-blue-700">
                    You are currently on the <strong>{plans.find(p => p.id === currentPlan)?.name}</strong> plan
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white">
                  {plans.find(p => p.id === currentPlan)?.jobLimit === "Unlimited" 
                    ? "Unlimited" 
                    : `${plans.find(p => p.id === currentPlan)?.jobLimit} jobs/month`}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = plan.id === currentPlan;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative hover-scale transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                } ${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      Current
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto ${plan.bgColor} rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="text-lg font-semibold">
                    {typeof plan.jobLimit === 'string' ? plan.jobLimit : `${plan.jobLimit} job applications`} per month
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={isCurrentPlan ? "#" : "/checkout"} state={{ selectedPlan: plan }}>
                    <Button 
                      className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
                        isCurrentPlan 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : plan.popular 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-2">What happens if I exceed my job limit?</h3>
              <p className="text-gray-600">You'll be notified when you're close to your limit. You can upgrade your plan or wait for the next billing cycle.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! New users get a 7-day free trial of the Legend plan to explore all premium features.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Absolutely! You can cancel your subscription at any time from your account settings. No hidden fees.</p>
            </div>
          </div>
        </div>
      </div>
       {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                       <img src="/public/logo2.png" alt="Logo" className="h-8 w-8 object-contain" />
                      <span className="ml-2 text-xl font-bold">JobPortal</span>
                    </div>
                    <p className="text-gray-400">Connecting talented professionals with amazing opportunities worldwide.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><Link to="/login" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                      <li><Link to="/login" className="hover:text-white transition-colors">Career Advice</Link></li>
                      <li><Link to="/login" className="hover:text-white transition-colors">Resume Builder</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">For Employers</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><Link to="/login" className="hover:text-white transition-colors">Post a Job</Link></li>
                      <li><Link to="/login" className="hover:text-white transition-colors">Browse Resumes</Link></li>
                      <li><Link to="/login" className="hover:text-white transition-colors">Recruiting Solutions</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                      <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                      <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 JobPortal. All rights reserved.</p>
                </div>
              </div>
            </footer>
    </div>
  );
};

export default Subscription;
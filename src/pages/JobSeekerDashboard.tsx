import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building, Search, MapPin, Calendar, Users, Bell, User, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobSeekerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const appliedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      status: "Under Review",
      appliedDate: "2024-01-15",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignStudio",
      status: "Interview Scheduled",
      appliedDate: "2024-01-12",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateLab",
      status: "Rejected",
      appliedDate: "2024-01-10",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  const recommendedJobs = [
    {
      id: 4,
      title: "Senior React Developer",
      company: "WebFlow Inc",
      location: "Remote",
      salary: "$130,000 - $160,000",
      type: "Full-time",
      skills: ["React", "TypeScript", "Node.js"],
      match: "95%"
    },
    {
      id: 5,
      title: "Full Stack Engineer",
      company: "DataTech Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      skills: ["JavaScript", "Python", "AWS"],
      match: "88%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Middle: Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/job-seeker-dashboard" className="text-blue-600 font-medium hover:underline">Dashboard</Link>
        <Link to="/browse-jobs" className="text-gray-700 hover:text-blue-600">Browse Jobs</Link>
        <Link to="/subscription" className="text-gray-700 hover:text-blue-600">Subscription</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
      </nav>

      {/* Right: Mobile Icons & Menu */}
      <div className="flex items-center space-x-4 md:hidden">
        <Button variant="ghost" size="sm" className="hover:bg-blue-50">
          <Bell className="h-5 w-5 text-gray-700" />
        </Button>
        <Link to="/profile">
  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
    <User className="h-5 w-5 text-gray-700" />
  </Button>
</Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right: Desktop Icons + Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="hover:bg-blue-50">
          <Bell className="h-5 w-5" />
        </Button>
        <Link to="/profile">
  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
    <User className="h-5 w-5 text-gray-700" />
  </Button>
</Link>

        {/* Optional: Desktop only Sign Out */}
        {/* <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button> */}
      </div>
    </div>

    {/* Mobile Nav Dropdown */}
    {mobileMenuOpen && (
      <div className="md:hidden mt-2 space-y-2">
        <Link to="/job-seeker-dashboard" className="block text-blue-600 font-medium">Dashboard</Link>
        <Link to="/browse-jobs" className="block text-gray-700 hover:text-blue-600">Browse Jobs</Link>
        <Link to="/subscription" className="block text-gray-700 hover:text-blue-600">Subscription</Link>
        {/* <Link to="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link> */}
      </div>
    )}
  </div>
</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your job search today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Applications Sent</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3">
                  <Building className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applied Jobs */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your recent job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appliedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">Applied on {job.appliedDate}</p>
                    </div>
                    <Badge className={`${job.statusColor} border-0`}>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 hover:bg-blue-50">
                View All Applications
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Jobs that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {job.match} match
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs hover:bg-blue-50 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-600">{job.salary}</span>
                      <Button size="sm" className="hover:bg-blue-700 transition-colors">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/browse-jobs">
                <Button variant="outline" className="w-full mt-4 hover:bg-blue-50">
                  View More Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Job Search */}
        <Card className="mt-8 hover-scale">
  <CardHeader>
    <CardTitle>Quick Job Search</CardTitle>
    <CardDescription>Find your next opportunity</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search for jobs, companies, or keywords"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-11 w-full"
      />
      <Link to="/browse-jobs" className="w-full">
        <Button className="w-full px-8 hover:bg-blue-700 transition-colors">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Users, Eye, Calendar, Bell, User, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react"; 

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, approved, rejected

  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applications: 45,
      views: 234,
      status: "Active",
      postedDate: "2024-01-15",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 23,
      views: 156,
      status: "Active",
      postedDate: "2024-01-12",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      title: "UX Designer",
      applications: 67,
      views: 345,
      status: "Closed",
      postedDate: "2024-01-08",
      statusColor: "bg-gray-100 text-gray-800"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-16",
      status: "New",
      experience: "5 years",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      candidateName: "Mike Chen",
      position: "Product Manager",
      appliedDate: "2024-01-16",
      status: "Reviewed",
      experience: "3 years",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      position: "UX Designer",
      appliedDate: "2024-01-15",
      status: "Interview",
      experience: "4 years",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const getVerificationStatusDisplay = () => {
    switch (verificationStatus) {
      case "pending":
        return {
          text: "Verification Pending",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          description: "Your company is under admin review. You'll be able to post jobs once approved."
        };
      case "approved":
        return {
          text: "Verified Company",
          color: "bg-green-100 text-green-800 border-green-200",
          description: "Your company has been verified. You can now post jobs and manage applications."
        };
      case "rejected":
        return {
          text: "Verification Rejected",
          color: "bg-red-100 text-red-800 border-red-200",
          description: "Your company verification was rejected. Please contact support for more information."
        };
      default:
        return {
          text: "Unknown Status",
          color: "bg-gray-100 text-gray-800 border-gray-200",
          description: "Please contact support for assistance."
        };
    }
  };

  const verificationDisplay = getVerificationStatusDisplay();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/company-dashboard" className="text-blue-600 font-medium">Dashboard</Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition-colors">Post Job</Link>
            <Link to="/manage-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Manage Jobs</Link>
            <Link to="/applications" className="text-gray-700 hover:text-blue-600 transition-colors">Applications</Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Icons and Hamburger */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2">
          <Link to="/company-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/post-job" className="block text-gray-700 hover:text-blue-600">Post Job</Link>
          <Link to="/manage-jobs" className="block text-gray-700 hover:text-blue-600">Manage Jobs</Link>
          <Link to="/applications" className="block text-gray-700 hover:text-blue-600">Applications</Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, TechCorp Solutions!</h1>
          <p className="text-gray-600">Manage your job postings and candidate applications.</p>
        </div>

        {/* Verification Status */}
        <Card className={`mb-8 border-2 ${verificationDisplay.color.replace('text-', 'border-').replace('bg-', 'border-')}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className={`${verificationDisplay.color} border-0 mb-2`}>
                  {verificationDisplay.text}
                </Badge>
                <p className="text-gray-600">{verificationDisplay.description}</p>
              </div>
              {verificationStatus === "approved" && (
                <Link to="/post-job">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">1,245</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Postings */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Job Postings</CardTitle>
                  <CardDescription>Manage your active job listings</CardDescription>
                </div>
                {verificationStatus === "approved" && (
                  <Link to="/post-job">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{job.applications} applications</span>
                        <span>{job.views} views</span>
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>
                    <Badge className={`${job.statusColor} border-0`}>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link to="/manage-jobs">
                <Button variant="outline" className="w-full mt-4">
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>New candidates for your positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{application.candidateName}</h3>
                        <p className="text-sm text-gray-600">{application.position}</p>
                        <p className="text-xs text-gray-500">
                          {application.experience} • Applied {application.appliedDate}
                        </p>
                      </div>
                      <Badge className={`${application.statusColor} border-0`}>
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {verificationStatus === "approved" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/post-job">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Post New Job
                  </Button>
                </Link>
                <Link to="/applications">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Review Applications
                  </Button>
                </Link>
                <Link to="/manage-jobs">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Building className="h-6 w-6 mb-2" />
                    Manage Jobs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;

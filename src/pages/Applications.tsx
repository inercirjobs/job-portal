
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, Filter, Download, Eye, Mail, Calendar, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";


const Applications = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();


  const applications = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-16",
      status: "New",
      experience: "5 years",
      location: "San Francisco, CA",
      expectedSalary: "$140,000",
      resumeUrl: "#",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      statusColor: "bg-blue-100 text-blue-800",
      coverLetter: "I am excited to apply for the Senior Frontend Developer position..."
    },
    {
      id: 2,
      candidateName: "Mike Chen",
      email: "mike.chen@email.com",
      position: "Product Manager",
      appliedDate: "2024-01-16",
      status: "Under Review",
      experience: "3 years",
      location: "New York, NY",
      expectedSalary: "$120,000",
      resumeUrl: "#",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      statusColor: "bg-yellow-100 text-yellow-800",
      coverLetter: "With my experience in product management and passion for innovation..."
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      email: "emily.davis@email.com",
      position: "UX Designer",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      experience: "4 years",
      location: "Austin, TX",
      expectedSalary: "$95,000",
      resumeUrl: "#",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      statusColor: "bg-green-100 text-green-800",
      coverLetter: "I believe my design philosophy and user-centered approach..."
    },
    {
      id: 4,
      candidateName: "David Wilson",
      email: "david.wilson@email.com",
      position: "Backend Engineer",
      appliedDate: "2024-01-14",
      status: "Rejected",
      experience: "2 years",
      location: "Seattle, WA",
      expectedSalary: "$110,000",
      resumeUrl: "#",
      skills: ["Node.js", "Python", "AWS", "PostgreSQL"],
      statusColor: "bg-red-100 text-red-800",
      coverLetter: "I am writing to express my interest in the Backend Engineer role..."
    },
    {
      id: 5,
      candidateName: "Lisa Rodriguez",
      email: "lisa.rodriguez@email.com",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-13",
      status: "Hired",
      experience: "6 years",
      location: "Los Angeles, CA",
      expectedSalary: "$145,000",
      resumeUrl: "#",
      skills: ["React", "Vue.js", "TypeScript", "GraphQL"],
      statusColor: "bg-green-100 text-green-800",
      coverLetter: "I am thrilled to apply for this opportunity to contribute..."
    }
  ];

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    console.log(`Changing application ${applicationId} status to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `Application status has been updated to ${newStatus}.`,
    });
  };

  const handleSendEmail = (candidateEmail: string, candidateName: string) => {
    console.log(`Sending email to ${candidateEmail}`);
    toast({
      title: "Email Sent",
      description: `Email sent to ${candidateName} successfully.`,
    });
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || application.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusCounts = () => {
    return {
      all: applications.length,
      new: applications.filter(app => app.status === "New").length,
      "under-review": applications.filter(app => app.status === "Under Review").length,
      "interview-scheduled": applications.filter(app => app.status === "Interview Scheduled").length,
      hired: applications.filter(app => app.status === "Hired").length,
      rejected: applications.filter(app => app.status === "Rejected").length
    };
  };

  const statusCounts = getStatusCounts();
const handleSignOut = () => {
  // Clear any user session or token if stored
  localStorage.clear(); // or specific item like: localStorage.removeItem("token")
  navigate("/login");   // Redirect to login page
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/company-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition-colors">Post Job</Link>
        <Link to="/applications" className="text-blue-600 font-medium">Applications</Link>
          <button onClick={handleSignOut} className="text-gray-700 hover:text-red-600">Sign Out</button>
      </nav>

      {/* Mobile toggle button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile nav menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden mt-2 space-y-2 pb-4">
        <Link to="/company-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/post-job" className="block text-gray-700 hover:text-blue-600">Post Job</Link>
        <Link to="/applications" className="block text-blue-600 font-medium">Applications</Link>
       <button
      onClick={() => {
        setIsMobileMenuOpen(false);
        handleSignOut();
      }}
      className="block text-left w-full text-gray-700 hover:text-red-600"
    >
      Sign Out
    </button>
  </div>
    )}
  </div>
</header>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
          <p className="text-gray-600">Review and manage candidate applications for your job postings.</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search candidates or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 h-11">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                    <SelectItem value="new">New ({statusCounts.new})</SelectItem>
                    <SelectItem value="under-review">Under Review ({statusCounts["under-review"]})</SelectItem>
                    <SelectItem value="interview-scheduled">Interview Scheduled ({statusCounts["interview-scheduled"]})</SelectItem>
                    <SelectItem value="hired">Hired ({statusCounts.hired})</SelectItem>
                    <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-11">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Candidate Info */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {application.candidateName}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium mb-2">
                          {application.position}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {application.email}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.location}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {application.experience}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${application.statusColor} border-0`}>
                        {application.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {application.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter Preview</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {application.coverLetter}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Applied on {application.appliedDate}
                        </div>
                        <div className="font-medium text-green-600">
                          Expected: {application.expectedSalary}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSendEmail(application.email, application.candidateName)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    
                    <div className="border-t pt-3">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Update Status
                      </Label>
                      <Select
                        onValueChange={(value) => handleStatusChange(application.id, value)}
                        defaultValue={application.status.toLowerCase().replace(" ", "-")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredApplications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterStatus !== "all"
                    ? "No applications match your current search or filter criteria."
                    : "You haven't received any applications yet. Make sure to promote your job postings to attract candidates."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, Eye, Calendar, CheckCircle, XCircle, AlertCircle, Search, Settings, Bell, User, Grid2X2, List, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [pendingCompanies, setPendingCompanies] = useState([
    {
      id: 1,
      companyName: "TechStart Solutions",
      contactPerson: "John Smith",
      email: "john@techstart.com",
      website: "https://techstart.com",
      description: "A innovative tech startup focusing on AI solutions",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      companyName: "GrowthLab Inc",
      contactPerson: "Sarah Johnson",
      email: "sarah@growthlab.com",
      website: "https://growthlab.com",
      description: "Digital marketing agency helping businesses scale",
      submittedDate: "2024-01-14",
      status: "pending"
    }
  ]);

  const allUsers = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@email.com",
      type: "Job Seeker",
      joinDate: "2024-01-10",
      status: "Active",
      subscription: "Legend",
      applications: 8
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@email.com",
      type: "Job Seeker",
      joinDate: "2024-01-12",
      status: "Active",
      subscription: "Basic",
      applications: 12
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      type: "Job Seeker",
      joinDate: "2024-01-05",
      status: "Active",
      subscription: "Ultra Legend",
      applications: 25
    },
    {
      id: 4,
      name: "Mike Davis",
      email: "mike@email.com",
      type: "Job Seeker",
      joinDate: "2024-01-15",
      status: "Active",
      subscription: "Basic",
      applications: 5
    },
    {
      id: 5,
      name: "TechCorp Solutions",
      email: "hr@techcorp.com",
      type: "Company",
      joinDate: "2024-01-08",
      status: "Verified",
      subscription: "N/A",
      jobPosts: 5
    }
  ];

  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      applications: 45,
      views: 234,
      status: "Active",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      applications: 23,
      views: 156,
      status: "Active",
      postedDate: "2024-01-12"
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio Pro",
      location: "Remote",
      applications: 67,
      views: 345,
      status: "Closed",
      postedDate: "2024-01-08"
    }
  ];

  const handleCompanyVerification = (companyId: number, action: "approve" | "reject") => {
    setPendingCompanies(companies => 
      companies.map(company => 
        company.id === companyId 
          ? { ...company, status: action === "approve" ? "approved" : "rejected" }
          : company
      )
    );

    toast({
      title: action === "approve" ? "Company Approved" : "Company Rejected",
      description: `The company has been ${action === "approve" ? "approved" : "rejected"} successfully.`,
      variant: action === "approve" ? "default" : "destructive"
    });
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal Admin</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/admin-dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link to="/admin-users" className="text-gray-700 hover:text-blue-600 transition-colors">Users</Link>
              <Link to="/admin-companies" className="text-gray-700 hover:text-blue-600 transition-colors">Companies</Link>
              <Link to="/admin-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Jobs</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage the JobPortal platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">2,547</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">284</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">1,856</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCompanies.filter(c => c.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending Verifications</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          </TabsList>

          {/* Pending Company Verifications */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Company Verification Requests</CardTitle>
                <CardDescription>
                  Review and approve company registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingCompanies.filter(company => company.status === "pending").map((company) => (
                    <div key={company.id} className="p-6 border rounded-lg bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.companyName}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Contact Person:</strong> {company.contactPerson}</p>
                            <p><strong>Email:</strong> {company.email}</p>
                            <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{company.website}</a></p>
                            <p><strong>Submitted:</strong> {company.submittedDate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-4">
                            <strong>Description:</strong> {company.description}
                          </p>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleCompanyVerification(company.id, "approve")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleCompanyVerification(company.id, "reject")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingCompanies.filter(company => company.status === "pending").length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No pending company verifications</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Monitor and manage platform users</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                    >
                      {viewMode === "list" ? <Grid2X2 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                  {filteredUsers.map((user) => (
                    <div key={user.id} className={viewMode === "grid" ? "p-4 border rounded-lg bg-white" : "flex items-center justify-between p-4 border rounded-lg"}>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <div className={`${viewMode === "grid" ? "space-y-1" : "flex items-center space-x-4"} text-sm text-gray-600 mt-1`}>
                          <span>{user.email}</span>
                          <Badge variant="outline">{user.type}</Badge>
                          <span>Joined {user.joinDate}</span>
                        </div>
                      </div>
                      <div className={`${viewMode === "grid" ? "mt-3 flex flex-wrap gap-2" : "flex items-center space-x-2"}`}>
                        <Badge className={user.status === "Active" || user.status === "Verified" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {user.status}
                        </Badge>
                        {user.type === "Job Seeker" && (
                          <Badge className={
                            user.subscription === "Ultra Legend" ? "bg-amber-100 text-amber-800" :
                            user.subscription === "Legend" ? "bg-purple-100 text-purple-800" :
                            user.subscription === "Basic" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {user.subscription}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Management */}
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>Company Management</CardTitle>
                <CardDescription>
                  Monitor verified companies and their activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.filter(user => user.type === "Company").map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{company.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{company.email}</span>
                          <span>{company.jobPosts} job posts</span>
                          <span>Verified {company.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-green-100 text-green-800">
                          Verified
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Postings Management */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Job Postings Management</CardTitle>
                    <CardDescription>Monitor and manage job postings across the platform</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                    >
                      {viewMode === "list" ? <Grid2X2 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                  {filteredJobs.map((job) => (
                    <div key={job.id} className={viewMode === "grid" ? "p-4 border rounded-lg bg-white" : "flex items-center justify-between p-4 border rounded-lg"}>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <div className={`${viewMode === "grid" ? "space-y-1" : "flex items-center space-x-4"} text-sm text-gray-600 mt-1`}>
                          <span>{job.company}</span>
                          <span>{job.location}</span>
                          <span>{job.applications} applications</span>
                          <span>{job.views} views</span>
                          <span>Posted {job.postedDate}</span>
                        </div>
                      </div>
                      <div className={`${viewMode === "grid" ? "mt-3 flex justify-between" : "flex items-center space-x-4"}`}>
                        <Badge className={job.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {job.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
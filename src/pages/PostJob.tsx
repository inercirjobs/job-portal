
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, ArrowLeft, LogOut, Bell, User, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    workArrangement: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    currency: "",
    description: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    benefits: "",
    applicationDeadline: "",
    isUrgent: false,
    isRemote: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Job Posted Successfully",
        description: "Your job posting has been published and is now live on the platform.",
      });
      navigate("/company-dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link to="/" className="flex items-center">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/company-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/post-job" className="text-blue-600 font-medium">Post Job</Link>
        <Link to="/manage-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Manage Jobs</Link>
      </nav>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/login")} className="hover:bg-red-50 hover:text-red-600">
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
        <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Nav Links */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
      <Link to="/company-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
      <Link to="/post-job" className="block text-blue-600 font-medium">Post Job</Link>
      <Link to="/manage-jobs" className="block text-gray-700 hover:text-blue-600">Manage Jobs</Link>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/login")}
        className="w-full mt-2 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )}
</header>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/company-dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold text-gray-900">Post a New Job</CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the details below to create your job posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Job Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Frontend Developer"
                      className="mt-1 h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                      Department
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Engineering"
                      className="mt-1 h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA"
                      className="mt-1 h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobType" className="text-sm font-medium text-gray-700">
                      Job Type *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("jobType", value)}>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="workArrangement" className="text-sm font-medium text-gray-700">
                      Work Arrangement
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("workArrangement", value)}>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Select work arrangement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experienceLevel" className="text-sm font-medium text-gray-700">
                      Experience Level *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("experienceLevel", value)}>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                        <SelectItem value="lead">Lead/Manager (7+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Salary Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="salaryMin" className="text-sm font-medium text-gray-700">
                      Minimum Salary
                    </Label>
                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      placeholder="80000"
                      className="mt-1 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax" className="text-sm font-medium text-gray-700">
                      Maximum Salary
                    </Label>
                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      placeholder="120000"
                      className="mt-1 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                      Currency
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("currency", value)}>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="cad">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Job Details</h3>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Job Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed description of the role..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="responsibilities" className="text-sm font-medium text-gray-700">
                    Key Responsibilities *
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    placeholder="List the main responsibilities (one per line)..."
                    className="mt-1 min-h-24"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="requirements" className="text-sm font-medium text-gray-700">
                    Requirements *
                  </Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="List the requirements and qualifications (one per line)..."
                    className="mt-1 min-h-24"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                    Required Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., React, TypeScript, Node.js (comma-separated)"
                    className="mt-1 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="benefits" className="text-sm font-medium text-gray-700">
                    Benefits & Perks
                  </Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="List the benefits and perks (one per line)..."
                    className="mt-1 min-h-20"
                  />
                </div>
              </div>

              {/* Additional Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Settings</h3>
                
                <div>
                  <Label htmlFor="applicationDeadline" className="text-sm font-medium text-gray-700">
                    Application Deadline
                  </Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="mt-1 h-11"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isUrgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isUrgent: checked as boolean }))
                      }
                    />
                    <Label htmlFor="isUrgent" className="text-sm font-medium text-gray-700">
                      Mark as urgent hiring
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRemote"
                      checked={formData.isRemote}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isRemote: checked as boolean }))
                      }
                    />
                    <Label htmlFor="isRemote" className="text-sm font-medium text-gray-700">
                      Remote work available
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link to="/company-dashboard">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building, Plus, Edit, Trash2, Eye, Calendar, Users, LogOut, Bell, User, Settings, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ManageJobs = () => {
  const { toast } = useToast();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      applications: 45,
      views: 234,
      status: "Active",
      postedDate: "2024-01-15",
      description: "We are looking for a Senior Frontend Developer with experience in React, TypeScript, and modern web technologies.",
      requirements: "5+ years experience with React, TypeScript, HTML5, CSS3, and modern JavaScript frameworks.",
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"]
    },
    {
      id: 2,
      title: "Product Manager",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      applications: 23,
      views: 156,
      status: "Active",
      postedDate: "2024-01-12",
      description: "Join our product team to drive innovation and deliver exceptional user experiences.",
      requirements: "3+ years in product management, strong analytical skills, experience with agile methodologies.",
      skills: ["Product Management", "Agile", "Data Analysis", "User Research"]
    },
    {
      id: 3,
      title: "UX Designer",
      location: "Remote",
      type: "Contract",
      salary: "$80,000 - $100,000",
      applications: 67,
      views: 345,
      status: "Closed",
      postedDate: "2024-01-08",
      description: "Create intuitive and engaging user experiences for our digital products.",
      requirements: "4+ years UX design experience, proficiency in Figma, strong portfolio.",
      skills: ["UX Design", "Figma", "Prototyping", "User Research"]
    }
  ]);

  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    skills: ""
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      skills: job.skills.join(", ")
    });
  };

  const handleSave = () => {
    setJobs(jobs.map(job => 
      job.id === editingJob.id 
        ? { 
            ...job, 
            ...editForm,
            skills: editForm.skills.split(", ").filter(skill => skill.trim())
          }
        : job
    ));
    setEditingJob(null);
    toast({
      title: "Job Updated",
      description: "Job posting has been successfully updated.",
    });
  };

  const handleDelete = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "Job posting has been removed.",
      variant: "destructive"
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Redirect logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center hover-scale">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                JobPortal
              </span>
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link
                to="/company-dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/post-job"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Post Job
              </Link>
              <Link
                to="/manage-jobs"
                className="text-blue-600 font-medium"
              >
                Manage Jobs
              </Link>
              <Link
                to="/applications"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Applications
              </Link>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
              {/* <Button
                variant="outline"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button> */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 pb-3 space-y-2 border-t pt-4">
        <Link to="/company-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/post-job" className="block text-gray-700 hover:text-blue-600">Post Job</Link>
        <Link to="/manage-jobs" className="block text-blue-600 font-medium">Manage Jobs</Link>
        <Link to="/applications" className="block text-gray-700 hover:text-blue-600">Applications</Link>

        <div className="flex items-center gap-2 mt-4">
          {/* <Bell className="h-5 w-5 text-gray-600" />
          <User className="h-5 w-5 text-gray-600" /> */}
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="mt-4 w-full hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
            <p className="text-gray-600">Edit and manage your job postings</p>
          </div>
          <Link to="/post-job">
            <Button className="bg-blue-600 hover:bg-blue-700 btn-hover-effect">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover-scale animate-fade-in">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                      <Badge className={job.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applications} applications
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {job.views} views
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {job.postedDate}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Job Posting</DialogTitle>
                          <DialogDescription>
                            Update the details of your job posting
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Job Title</Label>
                              <Input
                                id="title"
                                value={editForm.title}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={editForm.location}
                                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="type">Job Type</Label>
                              <Input
                                id="type"
                                value={editForm.type}
                                onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="salary">Salary Range</Label>
                              <Input
                                id="salary"
                                value={editForm.salary}
                                onChange={(e) => setEditForm({...editForm, salary: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                              id="description"
                              value={editForm.description}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="requirements">Requirements</Label>
                            <Textarea
                              id="requirements"
                              value={editForm.requirements}
                              onChange={(e) => setEditForm({...editForm, requirements: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="skills">Skills (comma separated)</Label>
                            <Input
                              id="skills"
                              value={editForm.skills}
                              onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                              placeholder="React, TypeScript, JavaScript"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setEditingJob(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSave}>
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(job.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;

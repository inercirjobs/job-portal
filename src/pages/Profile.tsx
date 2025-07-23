
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Building, User, Mail, Phone, MapPin, Calendar, Edit, LogOut, Settings, Briefcase, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const Profile = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    experience: "5 years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    bio: "Passionate frontend developer with 5 years of experience building modern web applications. Love working with React and creating amazing user experiences.",
    joinDate: "January 2023"
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
   <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
        <Building className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/job-seeker-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/browse-jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Browse Jobs</Link>
        <Link to="/profile" className="text-blue-600 font-medium">Profile</Link>
        <Link to="/subscription" className="text-blue-600 font-medium">Subscription</Link>
      </nav>

      {/* Sign Out Button */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu Dropdown */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-white px-4 py-2 space-y-2 shadow border-t">
      <Link to="/job-seeker-dashboard" className="block text-gray-700">Dashboard</Link>
      <Link to="/browse-jobs" className="block text-gray-700">Browse Jobs</Link>
      {/* <Link to="/profile" className="block text-blue-600">Profile</Link> */}
      <Link to="/subscription" className="block text-blue-600">Subscription</Link>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full justify-start hover:bg-red-50 hover:text-red-600 mt-2"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )}
</header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-lg text-gray-700">{profile.title}</p>
                  <p className="text-sm text-gray-500">Member since {profile.joinDate}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {profile.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.location}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Experience</Label>
                    <p className="font-medium">{profile.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Bio</Label>
                    <p className="text-gray-700">{profile.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="hover:bg-blue-50 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="mt-4">
                  <Label htmlFor="skills">Add Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    placeholder="React, TypeScript, Node.js"
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/browse-jobs">
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/job-seeker-dashboard">
                <Button variant="outline" className="w-full justify-start hover:bg-green-50">
                  <User className="h-4 w-4 mr-2" />
                  View Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          {/* Application Stats */}
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Application Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600">Applications</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">3</p>
                  <p className="text-sm text-gray-600">Interviews</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">28</p>
                  <p className="text-sm text-gray-600">Profile Views</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">15</p>
                  <p className="text-sm text-gray-600">Saved Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Upload, 
  FolderOpen, 
  Clock, 
  FileCheck,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
  Bot,
  Brain,
  Sparkles,
  ArrowRight,
  Star,
  Grid,
  List
} from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [view, setView] = useState('grid');
  const [documents] = useState([
    {
      id: 1,
      title: "AI Research Paper 2024",
      filename: "ai_research.pdf",
      uploaded_at: "2024-05-28T10:30:00Z",
      pages: 45,
      type: "pdf"
    },
    {
      id: 2,
      title: "Marketing Strategy Report",
      filename: "marketing_strategy.docx",
      uploaded_at: "2024-05-27T14:15:00Z",
      pages: 28,
      type: "docx"
    },
    {
      id: 3,
      title: "Financial Analysis Q2",
      filename: "financial_q2.pdf",
      uploaded_at: "2024-05-26T09:45:00Z",
      pages: 67,
      type: "pdf"
    }
  ]);

  const filteredDocuments = documents
    .filter(doc => 
      doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.filename?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.uploaded_at) - new Date(a.uploaded_at);
      }
      return a.title?.localeCompare(b.title) || 0;
    });

  const totalDocuments = documents.length;
  const recentDocuments = documents.filter(doc => {
    const uploadDate = new Date(doc.uploaded_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return uploadDate > weekAgo;
  }).length;
  const totalPages = documents.reduce((sum, doc) => sum + (doc.pages || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
      <div className="container mx-auto px-6 py-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-800 via-pink-600 to-teal-600 bg-clip-text text-transparent">
                DocIntel
              </h1>
              <p className="text-2xl font-semibold text-purple-600">AI Intelligence Platform</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Transform your documents into intelligent conversations. Upload, analyze, and interact with your content using cutting-edge AI technology.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {['AI-Powered Analysis', 'Smart Search', 'Instant Chat', 'Document Intelligence'].map((feature, index) => (
              <div key={index} className="px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200 text-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Card */}
          <Link to="/upload" className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="p-5 bg-white/20 rounded-3xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Upload className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Upload Documents</h3>
                    <p className="text-purple-100 text-lg">Add new documents to your AI library</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    <span className="text-lg font-semibold">AI Processing Ready</span>
                  </div>
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Library Card */}
          <div className="group cursor-pointer" onClick={() => document.getElementById('documents-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 hover:-rotate-1 transition-all duration-500">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 -translate-x-12"></div>
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full translate-y-8 translate-x-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="p-5 bg-white/20 rounded-3xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <FolderOpen className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Document Library</h3>
                    <p className="text-emerald-100 text-lg">Browse your intelligent collection</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-6 w-6 text-cyan-300" />
                    <span className="text-lg font-semibold">{totalDocuments} AI-Ready Documents</span>
                  </div>
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-800 mb-1">{totalDocuments}</p>
                <p className="text-gray-600 text-lg font-semibold">Total Documents</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-800 mb-1">{recentDocuments}</p>
                <p className="text-gray-600 text-lg font-semibold">This Week</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-800 mb-1">{totalPages.toLocaleString()}</p>
                <p className="text-gray-600 text-lg font-semibold">Total Pages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div id="documents-section" className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-10">
            
            {/* Section Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-10">
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-gray-800">Document Library</h2>
                <p className="text-xl text-gray-600">Manage and interact with your intelligent document collection</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                <div className="relative flex-1 xl:w-80">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search your documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-medium placeholder-gray-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl px-4 py-4">
                    <Filter className="h-6 w-6 text-purple-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="name">Name (A-Z)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-2">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        view === 'grid' 
                          ? 'bg-purple-500 text-white shadow-lg' 
                          : 'text-gray-600 hover:bg-purple-100'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        view === 'list' 
                          ? 'bg-purple-500 text-white shadow-lg' 
                          : 'text-gray-600 hover:bg-purple-100'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Content */}
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mb-8 shadow-lg">
                  <FileText className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {searchTerm ? 'No documents found' : 'Your intelligent library awaits'}
                </h3>
                <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
                  {searchTerm 
                    ? 'Try adjusting your search terms or explore different keywords'
                    : 'Upload your first document and start having intelligent conversations with your content'
                  }
                </p>
                {!searchTerm && (
                  <Link to="/upload" className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                    <Plus className="h-6 w-6" />
                    <span>Upload Your First Document</span>
                    <Zap className="h-6 w-6" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
                      <FileCheck className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                      {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} ready for AI interaction
                    </span>
                  </div>
                </div>

                <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1' : 'grid-cols-1'}`}>
                  {filteredDocuments.map((document) => (
                    <EnhancedDocumentCard key={document.id} document={document} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Document Card Component
const EnhancedDocumentCard = ({ document }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileTypeInfo = (filename) => {
    const extension = filename?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return { color: 'from-red-500 to-pink-500', bg: 'bg-red-100', text: 'text-red-700' };
      case 'docx':
        return { color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'txt':
        return { color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-100', text: 'text-emerald-700' };
      default:
        return { color: 'from-gray-500 to-slate-500', bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  const fileInfo = getFileTypeInfo(document.filename);

  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-500 transform hover:-translate-y-2">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-6 flex-1">
          <div className={`p-5 bg-gradient-to-br ${fileInfo.color} rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <FileText className="h-10 w-10 text-white" />
          </div>
          
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold text-gray-800 truncate group-hover:text-purple-700 transition-colors">
                {document.title || document.filename}
              </h3>
              <div className={`px-3 py-1 ${fileInfo.bg} rounded-full`}>
                <span className={`text-sm font-semibold ${fileInfo.text} uppercase`}>
                  {document.filename?.split('.').pop()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{formatDate(document.uploaded_at)}</span>
              </div>
              
              {document.pages && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">{document.pages} pages</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">AI Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to={`/chat?doc=${document.id}`}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          >
            <Bot className="h-6 w-6" />
            <span>Chat with AI</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
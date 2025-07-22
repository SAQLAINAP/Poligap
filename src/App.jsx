import { useState } from 'react';
import LandingPage from './components/LandingPage';
import PolicyAnalyzer from './components/PolicyAnalyzer';
import PolicyGenerator from './components/PolicyGenerator';
import KnowCompliances from './components/KnowCompliances';
import RiskAssessment from './components/RiskAssessment';
import ChatButton from './components/ChatButton';
import ChatExpert from './components/ChatExpert';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleDocumentUpload = (document) => {
    setUploadedDocument(document);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={navigate} />;
      case 'analyzer':
        return <PolicyAnalyzer onNavigate={navigate} onDocumentUpload={handleDocumentUpload} />;
      case 'generator':
        return <PolicyGenerator onNavigate={navigate} />;
      case 'compliances':
        return <KnowCompliances onNavigate={navigate} />;
      case 'assessment':
        return <RiskAssessment onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="App bg-white min-h-screen">
      {renderPage()}
      
      {/* Chat Button - only show when document is uploaded */}
      <ChatButton 
        hasDocument={!!uploadedDocument}
        onClick={() => setIsChatOpen(true)}
      />
      
      {/* Chat Expert Modal */}
      <ChatExpert
        policyDocument={uploadedDocument}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

export default App;

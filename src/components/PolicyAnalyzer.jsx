import { useState } from 'react';
import DocumentUpload from './DocumentUpload';
import AnalysisResults from './AnalysisResults';
import { analyzeDocument } from '../lib/gemini';

function PolicyAnalyzer({ onNavigate, onDocumentUpload }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');

  const extractTextFromPDF = async (file) => {
    try {
      // For now, let's use a simple text extraction fallback
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = function(e) {
          // This is a simplified approach - in a real app, you'd need proper PDF parsing
          // For demo purposes, we'll create a mock text content
          const mockPolicyText = `
            PRIVACY POLICY
            
            This is a demonstration of policy analysis. The system has detected that this is a ${file.name} file.
            
            Data Collection: We collect personal information when you interact with our services.
            
            Data Processing: We process your data for legitimate business purposes.
            
            Data Sharing: We may share data with third parties under certain circumstances.
            
            Security Measures: We implement appropriate security measures to protect your data.
            
            User Rights: You have the right to access, modify, and delete your personal information.
            
            Contact Information: For privacy concerns, please contact our privacy team.
          `;
          resolve(mockPolicyText);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    } catch (error) {
      console.error('PDF extraction error:', error);
      // Return mock content for demonstration
      return `Mock policy content for ${file.name} - demonstrating rules benchmarking functionality`;
    }
  };

  const handleFileUpload = async (uploadData) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      // Extract file and configuration
      const { file, industry, frameworks } = uploadData;
      
      // Notify parent component about document upload
      if (onDocumentUpload) {
        const documentInfo = {
          file,
          fileName: file.name,
          fileType: file.type,
          uploadDate: new Date(),
          industry,
          frameworks,
          size: file.size
        };
        onDocumentUpload(documentInfo);
      }
      
      setProgress('📄 Extracting text from document...');
      
      let text;
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else {
        const fileText = await file.text();
        text = fileText;
      }

      if (!text || text.trim().length === 0) {
        throw new Error('No text content found in the document');
      }

      setProgress('🤖 Analyzing document with AI...');
      
      // Pass the configuration data to the AI analysis
      const results = await analyzeDocument(text, {
        industry: industry,
        frameworks: frameworks
      });
      
      setAnalysis(results);
      setProgress('');
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during analysis');
      setProgress('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-osmo">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="bg-osmo-dark text-white px-6 py-3 rounded-osmo font-bold hover:bg-gray-700 transition-all shadow-osmo"
          >
            ← Back to home
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-black text-osmo-dark">Policy Gap Analyzer</h1>
            <p className="text-gray-600">AI-powered compliance analysis</p>
          </div>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="w-full max-w-[70%] mx-auto space-y-8">
          
          {/* Instructions */}
          <div className="bg-white rounded-osmo-lg p-8 shadow-osmo-lg border border-gray-100">
            <h2 className="text-2xl font-black text-osmo-dark mb-6 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-b from-osmo-purple/5 to-osmo-purple/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📁</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">Upload PDF</p>
                <p className="text-sm text-gray-600">Select your policy document</p>
              </div>
              <div className="bg-gradient-to-b from-osmo-blue/5 to-osmo-blue/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">AI Analysis</p>
                <p className="text-sm text-gray-600">AI scans for compliance gaps</p>
              </div>
              <div className="bg-gradient-to-b from-osmo-green/5 to-osmo-green/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">Get Results</p>
                <p className="text-sm text-gray-600">Detailed gap analysis & fixes</p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <DocumentUpload 
            onUpload={handleFileUpload}
            uploading={loading}
            progress={progress}
            error={error}
          />

          {/* Results Section */}
          {analysis && <AnalysisResults analysis={analysis} />}

        </div>
      </div>
    </div>
  );
}

export default PolicyAnalyzer;

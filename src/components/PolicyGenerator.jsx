import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { analyzeWithGemini } from '../lib/gemini';

function PolicyGenerator({ onNavigate }) {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [selectedCompliances, setSelectedCompliances] = useState([]);

  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Education', 
    'Manufacturing', 'Retail', 'Government', 'Non-Profit', 'Other'
  ];

  const policyTypes = [
    'Privacy Policy', 'Data Protection Policy', 'Security Policy',
    'Employee Handbook', 'Code of Conduct', 'IT Policy',
    'Remote Work Policy', 'Incident Response Policy'
  ];

  const frameworks = [
    { id: 'iso27001', name: 'ISO 27001', description: 'Information Security Management' },
    { id: 'nist', name: 'NIST Framework', description: 'Cybersecurity Framework' },
    { id: 'cobit', name: 'COBIT', description: 'Control Objectives for IT' },
    { id: 'itil', name: 'ITIL', description: 'IT Service Management' },
    { id: 'sox', name: 'SOX', description: 'Sarbanes-Oxley Act' },
    { id: 'coso', name: 'COSO', description: 'Enterprise Risk Management' },
    { id: 'fair', name: 'FAIR', description: 'Factor Analysis of Information Risk' },
    { id: 'octave', name: 'OCTAVE', description: 'Operationally Critical Threat Assessment' }
  ];

  const compliances = [
    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation (EU)' },
    { id: 'ccpa', name: 'CCPA', description: 'California Consumer Privacy Act' },
    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability Act' },
    { id: 'ferpa', name: 'FERPA', description: 'Family Educational Rights and Privacy Act' },
    { id: 'pci-dss', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
    { id: 'fisma', name: 'FISMA', description: 'Federal Information Security Management Act' },
    { id: 'glba', name: 'GLBA', description: 'Gramm-Leach-Bliley Act' },
    { id: 'coppa', name: 'COPPA', description: 'Children\'s Online Privacy Protection Act' },
    { id: 'pipeda', name: 'PIPEDA', description: 'Personal Information Protection (Canada)' },
    { id: 'lgpd', name: 'LGPD', description: 'Lei Geral de Proteção de Dados (Brazil)' }
  ];

  const handleFrameworkChange = (frameworkId) => {
    setSelectedFrameworks(prev => 
      prev.includes(frameworkId)
        ? prev.filter(id => id !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const handleComplianceChange = (complianceId) => {
    setSelectedCompliances(prev => 
      prev.includes(complianceId)
        ? prev.filter(id => id !== complianceId)
        : [...prev, complianceId]
    );
  };

  const clearAllFrameworks = () => setSelectedFrameworks([]);
  const clearAllCompliances = () => setSelectedCompliances([]);

  const generatePolicyPDF = async (policyContent, metadata) => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 40;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(metadata.title, margin, yPosition);
    yPosition += 15;

    // Company info
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text(metadata.companyName, margin, yPosition);
    yPosition += 10;

    // Metadata
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    doc.text(`Document Type: ${metadata.policyType}`, margin, yPosition + 5);
    doc.text(`Version: 1.0`, margin, yPosition + 10);
    
    yPosition += 25;
    doc.setTextColor(0, 0, 0);
    
    // Process content
    const lines = policyContent.split('\n');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    for (let line of lines) {
      if (line.trim() === '') {
        yPosition += 5;
        continue;
      }
      
      // Check for headers (lines starting with #)
      if (line.startsWith('# ')) {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 40;
        }
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        const headerText = line.substring(2);
        doc.text(headerText, margin, yPosition);
        yPosition += 15;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        continue;
      }
      
      // Check for subheaders (lines starting with ##)
      if (line.startsWith('## ')) {
        if (yPosition > pageHeight - 35) {
          doc.addPage();
          yPosition = 40;
        }
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(51, 51, 51);
        const subheaderText = line.substring(3);
        doc.text(subheaderText, margin, yPosition);
        yPosition += 12;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        continue;
      }
      
      // Regular text
      const textWidth = pageWidth - 2 * margin;
      const splitText = doc.splitTextToSize(line, textWidth);
      
      for (let splitLine of splitText) {
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 40;
        }
        doc.text(splitLine, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 2;
    }

    return doc;
  };

  const handleGeneratePolicy = async () => {
    if (!companyName || !industry || !policyType) {
      setError('Please fill in all required fields');
      return;
    }

    setGenerating(true);
    setError('');
    setProgress('');
    
    try {
      setProgress('Analyzing requirements and preferences...');
      
      let prompt = `Generate a comprehensive ${policyType} for ${companyName}, a company in the ${industry} industry.

The policy should be professional, legally sound, and include:
1. Clear objectives and scope
2. Detailed procedures and guidelines
3. Roles and responsibilities
4. Compliance requirements
5. Implementation guidelines
6. Review and update procedures

`;

      if (selectedFrameworks.length > 0) {
        const frameworkNames = selectedFrameworks.map(id => frameworks.find(f => f.id === id)?.name).join(', ');
        prompt += `Please ensure the policy aligns with these frameworks: ${frameworkNames}.\n`;
      }

      if (selectedCompliances.length > 0) {
        const complianceNames = selectedCompliances.map(id => compliances.find(c => c.id === id)?.name).join(', ');
        prompt += `The policy must comply with these standards: ${complianceNames}.\n`;
      }

      prompt += `
Make it specific to ${companyName} and relevant to the ${industry} industry.`;

      setProgress('Generating comprehensive policy content...');
      
      const policyContent = await analyzeWithGemini(prompt);
      
      if (!policyContent || policyContent.trim() === '') {
        throw new Error('Failed to generate policy content');
      }

      setGeneratedPolicy(policyContent);
      setProgress('Policy generated successfully!');
      
    } catch (error) {
      console.error('Error generating policy:', error);
      setError('Failed to generate policy. Please try again.');
      setProgress('');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!generatedPolicy) {
      setError('No policy to download. Please generate a policy first.');
      return;
    }

    try {
      setProgress('Preparing professional PDF document...');
      
      const metadata = {
        title: policyType,
        companyName,
        industry,
        policyType
      };

      const doc = await generatePolicyPDF(generatedPolicy, metadata);
      
      const fileName = `${companyName}_${policyType.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
      doc.save(fileName);
      
      setProgress('PDF downloaded successfully!');
      setTimeout(() => setProgress(''), 3000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
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
            <h1 className="text-4xl font-black text-osmo-dark">AI Policy Generator</h1>
            <p className="text-gray-600">Generate professional policies instantly</p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Instructions */}
          <div className="bg-white rounded-osmo-lg p-8 shadow-osmo-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-black text-osmo-dark mb-6 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-b from-osmo-purple/5 to-osmo-purple/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📝</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">Fill Details</p>
                <p className="text-sm text-gray-600">Enter company info and select policy type</p>
              </div>
              <div className="bg-gradient-to-b from-osmo-blue/5 to-osmo-blue/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">AI Generation</p>
                <p className="text-sm text-gray-600">AI creates customized policy</p>
              </div>
              <div className="bg-gradient-to-b from-osmo-green/5 to-osmo-green/10 p-6 rounded-osmo">
                <div className="w-16 h-16 bg-osmo-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📄</span>
                </div>
                <p className="font-bold text-osmo-dark mb-2">Download PDF</p>
                <p className="text-sm text-gray-600">Get professional formatted document</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-osmo-lg p-8 shadow-osmo-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-black text-osmo-dark mb-6">Policy Details</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-osmo-dark font-semibold mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-osmo text-osmo-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-osmo-purple"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-osmo-dark font-semibold mb-2">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-osmo text-osmo-dark focus:outline-none focus:ring-2 focus:ring-osmo-purple"
                >
                  <option value="">Select Industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-osmo-dark font-semibold mb-2">Policy Type</label>
                <select
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-osmo text-osmo-dark focus:outline-none focus:ring-2 focus:ring-osmo-purple"
                >
                  <option value="">Select Policy Type</option>
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Frameworks and Compliances Selection */}
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              {/* Frameworks Section */}
              <div className="bg-osmo-gray/50 rounded-osmo p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-osmo-dark flex items-center">
                    🏗️ Frameworks
                    <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                  </h3>
                  {selectedFrameworks.length > 0 && (
                    <button
                      onClick={clearAllFrameworks}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">Select frameworks to align your policy with:</p>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {frameworks.map(framework => (
                    <div key={framework.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={framework.id}
                        checked={selectedFrameworks.includes(framework.id)}
                        onChange={() => handleFrameworkChange(framework.id)}
                        className="mt-1 w-4 h-4 text-osmo-purple bg-white border-gray-300 rounded focus:ring-osmo-purple focus:ring-2"
                      />
                      <label htmlFor={framework.id} className="flex-1 cursor-pointer">
                        <div className="text-osmo-dark font-medium">{framework.name}</div>
                        <div className="text-gray-600 text-xs">{framework.description}</div>
                      </label>
                    </div>
                  ))}
                </div>
                {selectedFrameworks.length > 0 && (
                  <div className="mt-4 p-3 bg-osmo-blue/10 border border-osmo-blue/20 rounded-osmo">
                    <div className="text-osmo-blue text-sm font-medium">
                      Selected: {selectedFrameworks.map(id => frameworks.find(f => f.id === id)?.name).join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Compliances Section */}
              <div className="bg-osmo-gray/50 rounded-osmo p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-osmo-dark flex items-center">
                    📋 Compliance Standards
                    <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                  </h3>
                  {selectedCompliances.length > 0 && (
                    <button
                      onClick={clearAllCompliances}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">Select compliance standards to include:</p>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {compliances.map(compliance => (
                    <div key={compliance.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={compliance.id}
                        checked={selectedCompliances.includes(compliance.id)}
                        onChange={() => handleComplianceChange(compliance.id)}
                        className="mt-1 w-4 h-4 text-osmo-purple bg-white border-gray-300 rounded focus:ring-osmo-purple focus:ring-2"
                      />
                      <label htmlFor={compliance.id} className="flex-1 cursor-pointer">
                        <div className="text-osmo-dark font-medium">{compliance.name}</div>
                        <div className="text-gray-600 text-xs">{compliance.description}</div>
                      </label>
                    </div>
                  ))}
                </div>
                {selectedCompliances.length > 0 && (
                  <div className="mt-4 p-3 bg-osmo-green/10 border border-osmo-green/20 rounded-osmo">
                    <div className="text-osmo-green text-sm font-medium">
                      Selected: {selectedCompliances.map(id => compliances.find(c => c.id === id)?.name).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleGeneratePolicy}
                disabled={generating || !companyName || !industry || !policyType}
                className="bg-osmo-dark text-white px-8 py-4 rounded-osmo-lg font-bold text-lg shadow-osmo-lg hover:shadow-osmo hover:transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? '🔄 Generating...' : '🚀 Generate Policy'}
              </button>
            </div>
          </div>

          {progress && (
            <div className="mb-6 p-4 bg-osmo-blue/10 border border-osmo-blue/20 rounded-osmo">
              <p className="text-osmo-blue text-center font-medium">{progress}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-osmo">
              <p className="text-red-600 text-center font-medium">{error}</p>
            </div>
          )}

          {generatedPolicy && (
            <div className="bg-white rounded-osmo-lg p-8 shadow-osmo-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-osmo-dark">Generated Policy Preview</h3>
                  <p className="text-gray-600">Professional policy ready for download</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-osmo-green/10 text-osmo-green px-4 py-2 rounded-osmo text-sm font-bold border border-osmo-green/20">
                    📄 PDF Ready
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-osmo-green text-white px-6 py-3 rounded-osmo font-bold hover:bg-green-600 transition-all shadow-osmo"
                  >
                    📄 Download PDF
                  </button>
                </div>
              </div>
              
              <div className="bg-osmo-gray/30 rounded-osmo p-6 max-h-96 overflow-y-auto border border-gray-200">
                <pre className="text-osmo-dark whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedPolicy}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PolicyGenerator;

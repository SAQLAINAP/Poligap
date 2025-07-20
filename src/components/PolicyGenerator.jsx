import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { analyzeWithGemini } from '../lib/gemini';

function PolicyGenerator() {
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

  const clearAllFrameworks = () => {
    setSelectedFrameworks([]);
  };

  const clearAllCompliances = () => {
    setSelectedCompliances([]);
  };

  const generatePolicyPDF = async (policyContent, metadata) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Header styling
    doc.setFillColor(30, 58, 138); // Blue header
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(metadata.title, margin, 25);
    
    // Company info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${metadata.companyName} | ${metadata.industry}`, margin, 35);
    
    // Reset color for content
    doc.setTextColor(0, 0, 0);
    let yPosition = 60;
    
    // Document metadata section
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
      
      // Handle bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const bulletText = line.substring(2);
        const wrappedBullet = doc.splitTextToSize(`• ${bulletText}`, contentWidth - 10);
        
        for (let bulletLine of wrappedBullet) {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 40;
          }
          doc.text(bulletLine, margin + 10, yPosition);
          yPosition += 6;
        }
        continue;
      }
      
      // Regular paragraph text
      const wrappedText = doc.splitTextToSize(line, contentWidth);
      for (let wrappedLine of wrappedText) {
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 40;
        }
        doc.text(wrappedLine, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 3;
    }
    
    // Footer on each page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `${metadata.companyName} - ${metadata.policyType} | Page ${i} of ${totalPages}`,
        margin,
        pageHeight - 10
      );
    }
    
    return doc;
  };

  const handleGenerate = async () => {
    if (!companyName || !industry || !policyType) {
      setError('Please fill in all fields');
      return;
    }

    setGenerating(true);
    setError('');
    setProgress('Initializing AI policy generation...');

    try {
      setProgress('Analyzing company requirements...');
      
      // Build frameworks and compliances text
      const selectedFrameworkNames = selectedFrameworks.map(id => 
        frameworks.find(f => f.id === id)?.name
      ).filter(Boolean);
      
      const selectedComplianceNames = selectedCompliances.map(id => 
        compliances.find(c => c.id === id)?.name
      ).filter(Boolean);

      const frameworksText = selectedFrameworkNames.length > 0 
        ? `\n\nPlease ensure the policy aligns with these frameworks: ${selectedFrameworkNames.join(', ')}`
        : '';
        
      const compliancesText = selectedComplianceNames.length > 0 
        ? `\n\nPlease ensure the policy complies with these regulations: ${selectedComplianceNames.join(', ')}`
        : '';
      
      const prompt = `Create a comprehensive ${policyType} for ${companyName}, a company in the ${industry} industry. 

Please structure the policy with:
1. Clear headings using # for main sections and ## for subsections
2. Professional, legally sound language
3. Industry-specific considerations for ${industry}
4. Practical implementation guidelines
5. Compliance requirements where applicable${frameworksText}${compliancesText}

The policy should be thorough, professional, and ready for corporate use. Include sections like:
- Purpose and Scope
- Definitions
- Policy Statement
- Procedures
- Responsibilities
- Compliance and Enforcement
- Review and Updates

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">🏢 AI Policy Generator</h1>
            <p className="text-white/80 text-lg">Generate professional policies with AI-powered precision</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-white/90 font-semibold mb-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-2">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" className="bg-gray-800">Select Industry</option>
                {industries.map(ind => (
                  <option key={ind} value={ind} className="bg-gray-800">{ind}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-2">Policy Type</label>
              <select
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" className="bg-gray-800">Select Policy Type</option>
                {policyTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-800">{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frameworks and Compliances Selection */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Frameworks Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  🏗️ Frameworks
                  <span className="text-sm font-normal text-white/70 ml-2">(Optional)</span>
                </h3>
                {selectedFrameworks.length > 0 && (
                  <button
                    onClick={clearAllFrameworks}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <p className="text-white/60 text-sm mb-4">Select frameworks to align your policy with:</p>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {frameworks.map(framework => (
                  <div key={framework.id} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={framework.id}
                      checked={selectedFrameworks.includes(framework.id)}
                      onChange={() => handleFrameworkChange(framework.id)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor={framework.id} className="flex-1 cursor-pointer">
                      <div className="text-white font-medium">{framework.name}</div>
                      <div className="text-white/60 text-xs">{framework.description}</div>
                    </label>
                  </div>
                ))}
              </div>
              {selectedFrameworks.length > 0 && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <div className="text-blue-200 text-sm font-medium">
                    Selected: {selectedFrameworks.map(id => frameworks.find(f => f.id === id)?.name).join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Compliances Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  ⚖️ Compliance Requirements
                  <span className="text-sm font-normal text-white/70 ml-2">(Optional)</span>
                </h3>
                {selectedCompliances.length > 0 && (
                  <button
                    onClick={clearAllCompliances}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <p className="text-white/60 text-sm mb-4">Select regulations to ensure compliance:</p>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {compliances.map(compliance => (
                  <div key={compliance.id} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={compliance.id}
                      checked={selectedCompliances.includes(compliance.id)}
                      onChange={() => handleComplianceChange(compliance.id)}
                      className="mt-1 w-4 h-4 text-green-600 bg-white/10 border-white/20 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <label htmlFor={compliance.id} className="flex-1 cursor-pointer">
                      <div className="text-white font-medium">{compliance.name}</div>
                      <div className="text-white/60 text-xs">{compliance.description}</div>
                    </label>
                  </div>
                ))}
              </div>
              {selectedCompliances.length > 0 && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <div className="text-green-200 text-sm font-medium">
                    Selected: {selectedCompliances.map(id => compliances.find(c => c.id === id)?.name).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                generating
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              } text-white shadow-lg`}
            >
              {generating ? '🔄 Generating...' : '🚀 Generate Policy'}
            </button>
          </div>

          {progress && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
              <p className="text-blue-200 text-center font-medium">{progress}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
              <p className="text-red-200 text-center font-medium">{error}</p>
            </div>
          )}

          {generatedPolicy && (
            <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white">GENERATED POLICY PREVIEW</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold border-2 border-green-600">
                    📄 Professional PDF Ready
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    📄 DOWNLOAD PDF
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6 max-h-96 overflow-y-auto border border-white/20">
                <pre className="text-white/90 whitespace-pre-wrap font-mono text-sm leading-relaxed">
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

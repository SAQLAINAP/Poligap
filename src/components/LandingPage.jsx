import React from 'react';

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl rotate-12 opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-40 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl -rotate-6 opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-tl from-green-400 to-teal-500 rounded-lg rotate-45 opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 mb-6 animate-pulse">
            POLICY.AI
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            REVOLUTIONIZING COMPLIANCE FOR ORGANIZATIONS
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Transform your compliance workflow with AI-powered gap analysis, policy generation, 
            and risk assessment across GDPR, HIPAA, SOX, PCI DSS, and 12+ regulatory frameworks.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => onNavigate('analyzer')}
              className="bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-2xl font-black text-xl border-4 border-pink-400 shadow-[8px_8px_0px_0px_#ec4899] hover:shadow-[12px_12px_0px_0px_#ec4899] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
            >
              🔍 START FREE ANALYSIS
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="bg-gradient-to-r from-cyan-600 to-blue-700 px-8 py-4 rounded-2xl font-black text-xl border-4 border-cyan-400 shadow-[8px_8px_0px_0px_#06b6d4] hover:shadow-[12px_12px_0px_0px_#06b6d4] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
            >
              ⚡ GENERATE POLICY
            </button>
          </div>
        </div>

        {/* Market Stats Section */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg p-8 rounded-3xl border-4 border-purple-400 shadow-[8px_8px_0px_0px_#a855f7] mb-16">
          <h3 className="text-3xl font-black text-white mb-8 text-center">📈 MASSIVE MARKET OPPORTUNITY</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-cyan-400 mb-2">$75.8B</div>
              <div className="text-white font-bold text-lg">Compliance Market by 2031</div>
              <div className="text-gray-300 text-sm">10.9% CAGR Growth</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-pink-400 mb-2">83%</div>
              <div className="text-white font-bold text-lg">AI Adoption Expected</div>
              <div className="text-gray-300 text-sm">Within 5 Years</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-400 mb-2">40%</div>
              <div className="text-white font-bold text-lg">Breach Reduction</div>
              <div className="text-gray-300 text-sm">With AI Compliance</div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-lg p-8 rounded-3xl border-4 border-red-400 shadow-[8px_8px_0px_0px_#ef4444] mb-16">
          <h3 className="text-3xl font-black text-white mb-6 flex items-center">
            ⚠️ THE COMPLIANCE CRISIS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-red-300 mb-4">Traditional Methods Are Failing:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Manual processes are time-consuming and error-prone
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Regulatory landscape is overwhelming and ever-changing
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Requires significant specialized expertise
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  300M+ new regulations expected globally
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-300 mb-4">Consequences of Non-Compliance:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">•</span>
                  Severe financial penalties (up to 4% global revenue)
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">•</span>
                  Irreparable reputational damage
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">•</span>
                  Business operations disruption
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-3">•</span>
                  Legal liability and investigations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solution Overview */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
            THE AI-POWERED SOLUTION
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Policy Gap Analyzer combines cutting-edge AI with compliance expertise to deliver 
            automated, accurate, and actionable compliance management.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Policy Gap Analyzer */}
          <div 
            onClick={() => onNavigate('analyzer')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-8 rounded-3xl border-4 border-pink-400 shadow-[8px_8px_0px_0px_#ec4899] hover:shadow-[12px_12px_0px_0px_#ec4899] transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-black mr-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-2xl font-black text-white">GAP ANALYZER</h3>
              </div>
              <p className="text-pink-100 text-lg mb-4">
                Upload policy documents and get instant AI-powered compliance gap analysis against GDPR, HIPAA, SOX, and more.
              </p>
              <div className="bg-pink-500 text-white px-4 py-2 rounded-xl font-bold inline-block border-2 border-pink-300">
                ANALYZE NOW →
              </div>
            </div>
          </div>

          {/* Policy Generator */}
          <div 
            onClick={() => onNavigate('generator')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-8 rounded-3xl border-4 border-cyan-400 shadow-[8px_8px_0px_0px_#06b6d4] hover:shadow-[12px_12px_0px_0px_#06b6d4] transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center border-4 border-black mr-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-black text-white">POLICY GENERATOR</h3>
              </div>
              <p className="text-cyan-100 text-lg mb-4">
                Generate compliant policy templates instantly using AI. Choose your industry and regulations for custom policies.
              </p>
              <div className="bg-cyan-500 text-white px-4 py-2 rounded-xl font-bold inline-block border-2 border-cyan-300">
                CREATE NOW →
              </div>
            </div>
          </div>

          {/* Know Compliances Section - Replacing Compliance Monitor */}
          <div 
            onClick={() => onNavigate('compliances')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl border-4 border-indigo-400 shadow-[8px_8px_0px_0px_#6366f1] hover:shadow-[12px_12px_0px_0px_#6366f1] transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-black mr-4">
                  <span className="text-3xl">�</span>
                </div>
                <h3 className="text-2xl font-black text-white">KNOW COMPLIANCES</h3>
              </div>
              <p className="text-indigo-100 text-lg mb-4">
                Learn about major regulatory frameworks and compliance requirements in simple, easy-to-understand language.
              </p>
              <div className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold inline-block border-2 border-indigo-300">
                LEARN NOW →
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div 
            onClick={() => onNavigate('assessment')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-3xl border-4 border-green-400 shadow-[8px_8px_0px_0px_#22c55e] hover:shadow-[12px_12px_0px_0px_#22c55e] transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-400 rounded-2xl flex items-center justify-center border-4 border-black mr-4">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-black text-white">RISK ASSESSMENT</h3>
              </div>
              <p className="text-green-100 text-lg mb-4">
                Comprehensive risk analysis of your current policies with severity scoring and prioritized action plans.
              </p>
              <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold inline-block border-2 border-green-300">
                ASSESS NOW →
              </div>
            </div>
          </div>

        </div>

        {/* What Sets Us Apart */}
        <div className="bg-gradient-to-r from-purple-800 to-pink-800 p-8 rounded-3xl border-4 border-purple-400 shadow-[8px_8px_0px_0px_#a855f7] mb-16">
          <h3 className="text-3xl font-black text-white mb-8 text-center">🚀 WHAT SETS US APART</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-black mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Quantitative Scoring</h4>
              <p className="text-purple-100 text-sm">Numeric compliance scores with industry comparisons</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center border-4 border-black mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">User-Friendly Design</h4>
              <p className="text-purple-100 text-sm">Neo-brutal UI makes complex compliance simple</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center border-4 border-black mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Automated PDF Generation</h4>
              <p className="text-purple-100 text-sm">Professional, branded policies ready for auditors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-400 rounded-2xl flex items-center justify-center border-4 border-black mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Education + Analysis</h4>
              <p className="text-purple-100 text-sm">Empowers business users, not just legal teams</p>
            </div>
          </div>
        </div>

        {/* Proof of Impact */}
        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-lg p-8 rounded-3xl border-4 border-green-400 shadow-[8px_8px_0px_0px_#22c55e] mb-16">
          <h3 className="text-3xl font-black text-white mb-8 text-center">📈 PROVEN AI IMPACT</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-2">40%</div>
              <div className="text-white font-bold">Regulatory Breach Reduction</div>
              <div className="text-gray-300 text-sm">Standard Chartered Bank with AI compliance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">20-40%</div>
              <div className="text-white font-bold">False Positive Reduction</div>
              <div className="text-gray-300 text-sm">Saving millions in investigation costs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-2">Weeks</div>
              <div className="text-white font-bold">Faster Audit Processes</div>
              <div className="text-gray-300 text-sm">Automation reduces manual work significantly</div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-lg p-8 rounded-3xl border-4 border-indigo-400 shadow-[8px_8px_0px_0px_#6366f1] mb-16">
          <h3 className="text-3xl font-black text-white mb-6 text-center">🔧 POWERED BY CUTTING-EDGE TECH</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-indigo-300 mb-4">AI & Machine Learning:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="text-indigo-400 mr-3">🤖</span>
                  Google Gemini AI for natural language processing
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-400 mr-3">📊</span>
                  Domain-specific compliance logic
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-400 mr-3">⚡</span>
                  Real-time regulatory update adaptation
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-purple-300 mb-4">Modern Architecture:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="text-purple-400 mr-3">⚛️</span>
                  React.js for responsive, modular design
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-3">🎨</span>
                  Tailwind CSS with unique visual branding
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-3">📱</span>
                  Cross-platform compatibility
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800 to-pink-800 p-8 rounded-3xl border-4 border-purple-400 shadow-[8px_8px_0px_0px_#a855f7]">
            <h3 className="text-3xl font-black text-white mb-4">🚀 READY TO REVOLUTIONIZE YOUR COMPLIANCE?</h3>
            <p className="text-purple-100 text-lg mb-6">
              Join the AI compliance revolution. Transform months of manual work into minutes of intelligent analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onNavigate('analyzer')}
                className="bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-2xl font-black text-xl border-4 border-pink-400 shadow-[8px_8px_0px_0px_#ec4899] hover:shadow-[12px_12px_0px_0px_#ec4899] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
              >
                🔍 START FREE ANALYSIS
              </button>
              <button
                onClick={() => onNavigate('compliances')}
                className="bg-gradient-to-r from-indigo-600 to-blue-700 px-8 py-4 rounded-2xl font-black text-xl border-4 border-indigo-400 shadow-[8px_8px_0px_0px_#6366f1] hover:shadow-[12px_12px_0px_0px_#6366f1] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
              >
                � LEARN COMPLIANCES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

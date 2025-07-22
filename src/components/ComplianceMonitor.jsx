import { useState, useEffect } from 'react';

function ComplianceMonitor({ onNavigate }) {
  const [selectedRegulations, setSelectedRegulations] = useState(['gdpr', 'ccpa']);
  const [alerts, setAlerts] = useState([]);
  const [monitoring, setMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Mock regulation data
  const regulations = [
    { 
      id: 'gdpr', 
      name: 'GDPR', 
      fullName: 'General Data Protection Regulation',
      jurisdiction: 'EU',
      status: 'Active',
      riskLevel: 'High',
      lastChange: '2024-12-15'
    },
    { 
      id: 'ccpa', 
      name: 'CCPA', 
      fullName: 'California Consumer Privacy Act',
      jurisdiction: 'California, US',
      status: 'Active',
      riskLevel: 'Medium',
      lastChange: '2024-11-22'
    },
    { 
      id: 'hipaa', 
      name: 'HIPAA', 
      fullName: 'Health Insurance Portability and Accountability Act',
      jurisdiction: 'US',
      status: 'Active',
      riskLevel: 'High',
      lastChange: '2024-10-08'
    },
    { 
      id: 'sox', 
      name: 'SOX', 
      fullName: 'Sarbanes-Oxley Act',
      jurisdiction: 'US',
      status: 'Active',
      riskLevel: 'Medium',
      lastChange: '2024-09-15'
    },
    { 
      id: 'pci', 
      name: 'PCI DSS', 
      fullName: 'Payment Card Industry Data Security Standard',
      jurisdiction: 'Global',
      status: 'Active',
      riskLevel: 'High',
      lastChange: '2024-12-01'
    },
  ];

  // Mock recent alerts data
  const mockAlerts = [
    {
      id: 1,
      regulation: 'GDPR',
      type: 'Update',
      severity: 'Medium',
      title: 'New guidance on AI systems published',
      description: 'European Data Protection Board releases updated guidance on automated decision-making',
      date: '2024-12-15',
      impact: 'Review AI/ML processes for compliance'
    },
    {
      id: 2,
      regulation: 'CCPA',
      type: 'Amendment',
      severity: 'High',
      title: 'CPRA enforcement updates',
      description: 'New enforcement priorities announced by California Privacy Protection Agency',
      date: '2024-12-10',
      impact: 'Update privacy notice and consent mechanisms'
    },
    {
      id: 3,
      regulation: 'PCI DSS',
      type: 'Standard Update',
      severity: 'High',
      title: 'PCI DSS v4.0 transition deadline approaching',
      description: 'Organizations must transition to PCI DSS v4.0 by March 2024',
      date: '2024-12-01',
      impact: 'Schedule security assessment and update controls'
    }
  ];

  const startMonitoring = () => {
    setMonitoring(true);
    setAlerts(mockAlerts);
    setLastUpdate(new Date());
  };

  const stopMonitoring = () => {
    setMonitoring(false);
    setAlerts([]);
    setLastUpdate(null);
  };

  const toggleRegulation = (regId) => {
    setSelectedRegulations(prev => 
      prev.includes(regId) 
        ? prev.filter(id => id !== regId)
        : [...prev, regId]
    );
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'border-red-200 bg-red-50';
      case 'Medium': return 'border-yellow-200 bg-yellow-50';
      case 'Low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-osmo shadow-osmo p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Compliance Monitor</h1>
                <p className="text-gray-600">Real-time regulatory updates and alerts</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {monitoring ? (
                <button
                  onClick={stopMonitoring}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-osmo font-semibold transition-colors duration-200"
                >
                  <span className="mr-2">⏹️</span>
                  Stop Monitoring
                </button>
              ) : (
                <button
                  onClick={startMonitoring}
                  className="bg-osmo-green hover:bg-green-600 text-white px-6 py-3 rounded-osmo font-semibold transition-colors duration-200"
                >
                  <span className="mr-2">▶️</span>
                  Start Monitoring
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`rounded-osmo p-4 ${monitoring ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${monitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="font-semibold text-gray-900">
                {monitoring ? 'Actively Monitoring' : 'Monitoring Disabled'}
              </span>
              {lastUpdate && (
                <span className="text-sm text-gray-600">
                  Last update: {lastUpdate.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {selectedRegulations.length} regulation{selectedRegulations.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Regulation Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-osmo shadow-osmo p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Regulations to Monitor</h2>
              <div className="space-y-3">
                {regulations.map(reg => (
                  <div key={reg.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={selectedRegulations.includes(reg.id)}
                            onChange={() => toggleRegulation(reg.id)}
                            className="mr-3 w-4 h-4 text-osmo-blue focus:ring-osmo-blue border-gray-300 rounded"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{reg.name}</div>
                            <div className="text-sm text-gray-600">{reg.fullName}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{reg.jurisdiction}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(reg.riskLevel)}`}>
                            {reg.riskLevel} Risk
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Last change: {reg.lastChange}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts and Updates */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-osmo shadow-osmo p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts & Updates</h2>
              
              {!monitoring ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Monitoring</h3>
                  <p className="text-gray-600 mb-4">Enable monitoring to receive real-time regulatory updates and alerts</p>
                  <button
                    onClick={startMonitoring}
                    className="bg-osmo-blue hover:bg-blue-600 text-white px-6 py-3 rounded-osmo font-semibold transition-colors duration-200"
                  >
                    Begin Monitoring
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-osmo-purple">{alert.regulation}</span>
                            <span className="bg-osmo-blue text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {alert.type}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{alert.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm font-semibold text-gray-900">{alert.date}</div>
                          <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                            alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.severity}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-50 rounded p-3">
                        <div className="text-sm font-semibold text-gray-700 mb-1">Recommended Action:</div>
                        <div className="text-sm text-gray-600">{alert.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compliance Dashboard */}
        {monitoring && (
          <div className="bg-white rounded-osmo shadow-osmo p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Dashboard</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Active Monitors</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">{alerts.length}</div>
                <div className="text-sm text-gray-600">Recent Alerts</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Coverage</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplianceMonitor;

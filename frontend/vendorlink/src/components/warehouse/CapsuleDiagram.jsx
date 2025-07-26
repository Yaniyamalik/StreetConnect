import React from 'react';

const CapsuleDiagram = ({ capsules, selectedCapsule, onCapsuleSelect }) => {
  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#2a9d8f] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#4361ee] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Cold Storage</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#e2e8f0] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-[#e8630a] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
      </div>
      
      {/* Warehouse Diagram */}
      <div className="relative overflow-auto p-4 border border-gray-200 rounded-lg bg-gray-50" style={{ height: '500px' }}>
        <svg width="800" height="600" viewBox="0 0 800 600" className="mx-auto">
          {/* Warehouse Outline */}
          <rect x="50" y="50" width="700" height="500" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" rx="5" />
          
          {/* Entrance */}
          <rect x="375" y="50" width="50" height="20" fill="#94a3b8" />
          <text x="400" y="40" textAnchor="middle" fontSize="14" fill="#475569">Entrance</text>
          
          {/* CCTV Cameras */}
          <circle cx="100" cy="100" r="5" fill="#ef4444" />
          <circle cx="700" cy="100" r="5" fill="#ef4444" />
          <circle cx="100" cy="500" r="5" fill="#ef4444" />
          <circle cx="700" cy="500" r="5" fill="#ef4444" />
          <text x="100" y="85" textAnchor="middle" fontSize="10" fill="#475569">CCTV</text>
          <text x="700" y="85" textAnchor="middle" fontSize="10" fill="#475569">CCTV</text>
          <text x="100" y="515" textAnchor="middle" fontSize="10" fill="#475569">CCTV</text>
          <text x="700" y="515" textAnchor="middle" fontSize="10" fill="#475569">CCTV</text>
          
          {/* Section Labels */}
          <text x="200" y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">Section A</text>
          <text x="600" y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">Section B</text>
          <text x="200" y="330" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">Section C</text>
          <text x="600" y="330" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">Section D</text>
          
          {/* Aisle */}
          <rect x="350" y="100" width="100" height="400" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" />
          <text x="400" y="300" textAnchor="middle" fontSize="14" fill="#64748b" transform="rotate(90, 400, 300)">Main Aisle</text>
          
          {/* Capsules */}
          {capsules.map(capsule => {
            const fillColor = capsule.isColdStorage ? '#4361ee' : 
                             capsule.status === 'available' ? '#2a9d8f' : '#e2e8f0';
            
            const isSelected = selectedCapsule && selectedCapsule.id === capsule.id;
            const isSelectable = capsule.status === 'available';
            
            return (
              <g key={capsule.id}>
                <rect 
                  id={`capsule-${capsule.id}`}
                  x={capsule.x}
                  y={capsule.y}
                  width="40"
                  height="60"
                  rx="5"
                  fill={fillColor}
                  stroke={isSelected ? '#e8630a' : 'none'}
                  strokeWidth={isSelected ? 3 : 0}
                  className={`capsule ${capsule.status} ${isSelected ? 'selected' : ''}`}
                  style={{ cursor: isSelectable ? 'pointer' : 'default' }}
                  onClick={() => isSelectable && onCapsuleSelect(capsule)}
                />
                <text 
                  x={capsule.x + 20} 
                  y={capsule.y + 35} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                  pointerEvents="none"
                >
                  {capsule.id.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CapsuleDiagram;
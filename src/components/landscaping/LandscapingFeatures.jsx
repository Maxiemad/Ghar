import { useState } from 'react';
import { TreeDeciduous, CloudSun, Save, ShoppingCart, Map } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';

const LandscapingFeatures = () => {
  const { addToCart } = useCart();
  const [selectedFeatures, setSelectedFeatures] = useState([
    { id: 'trees', name: 'Trees & Shrubs', selected: true },
    { id: 'lawn', name: 'Lawn Design', selected: false },
    { id: 'water', name: 'Water Features', selected: true },
    { id: 'lighting', name: 'Outdoor Lighting', selected: false },
    { id: 'patio', name: 'Patio & Deck', selected: true },
    { id: 'garden', name: 'Garden Beds', selected: false },
  ]);
  
  // New terrain shaping features
  const [terrainSettings, setTerrainSettings] = useState({
    elevation: 'flat',
    climate: 'temperate',
    size: 'medium'
  });
  
  const landscapingImages = {
    modern: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3",
    minimalist: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
    water: "https://images.unsplash.com/photo-1558693168-c370615b54e0?ixlib=rb-4.0.3",
    garden: "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-4.0.3"
  };
  
  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(features => 
      features.map(f => f.id === featureId ? {...f, selected: !f.selected} : f)
    );
  };
  
  const calculateLandscapingPrice = () => {
    const basePrice = 15000;
    const featurePrice = selectedFeatures.filter(f => f.selected).length * 8000;
    
    // Add pricing for terrain complexity
    const terrainPrice = 
      terrainSettings.elevation === 'hilly' ? 12000 :
      terrainSettings.elevation === 'sloped' ? 8000 : 5000;
    
    return basePrice + featurePrice + terrainPrice;
  };
  
  const saveLandscapingDesign = () => {
    const design = {
      id: `landscaping-${Date.now()}`,
      type: 'landscaping',
      name: `Custom Landscaping Design`,
      features: selectedFeatures.filter(f => f.selected).map(f => f.name),
      terrain: terrainSettings,
      price: calculateLandscapingPrice(),
      image: landscapingImages.modern,
      timestamp: new Date().toISOString()
    };
    
    addToCart(design);
    
    // Show success toast
    toast.success("Landscaping design added to cart!");
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card dark:glass-card-dark p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Landscaping Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedFeatures.map((feature) => (
              <div 
                key={feature.id}
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 
                  ${feature.selected ? 'bg-primary/10 border-primary' : 'border-muted-foreground/20'}`}
                onClick={() => handleFeatureToggle(feature.id)}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.selected ? 'bg-primary text-white' : 'border border-muted-foreground/50'}`}>
                  {feature.selected && <span className="text-xs">✓</span>}
                </div>
                <span className="text-sm">{feature.name}</span>
              </div>
            ))}
          </div>
          
          {/* AI-assisted terrain shaping */}
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">AI-Terrain Shaping</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Elevation Profile</label>
                <select 
                  className="w-full p-2 border rounded bg-background"
                  value={terrainSettings.elevation}
                  onChange={e => setTerrainSettings({...terrainSettings, elevation: e.target.value})}
                >
                  <option value="flat">Flat Land</option>
                  <option value="sloped">Gentle Slope</option>
                  <option value="hilly">Hilly Terrain</option>
                  <option value="custom">Custom Elevation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Climate Zone</label>
                <select 
                  className="w-full p-2 border rounded bg-background"
                  value={terrainSettings.climate}
                  onChange={e => setTerrainSettings({...terrainSettings, climate: e.target.value})}
                >
                  <option value="temperate">Temperate</option>
                  <option value="tropical">Tropical</option>
                  <option value="arid">Arid/Desert</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="continental">Continental</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Property Size</label>
                <select 
                  className="w-full p-2 border rounded bg-background"
                  value={terrainSettings.size}
                  onChange={e => setTerrainSettings({...terrainSettings, size: e.target.value})}
                >
                  <option value="small">Small (under 0.25 acre)</option>
                  <option value="medium">Medium (0.25-1 acre)</option>
                  <option value="large">Large (1-5 acres)</option>
                  <option value="estate">Estate (5+ acres)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="aspect-video bg-muted/30 rounded-lg relative overflow-hidden">
              <img 
                src={landscapingImages.modern}
                alt="Landscaping Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <Button size="sm" className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-xs">3D View</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="glass-card dark:glass-card-dark p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Map size={18} /> Climate-Based Recommendations
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CloudSun className="text-amber-500" size={24} />
                <div>
                  <h5 className="font-medium">Climate Optimized Plants</h5>
                  <p className="text-sm text-muted-foreground">
                    Based on your {terrainSettings.climate} climate selection
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-2 bg-background/50">
                  <div className="aspect-square rounded overflow-hidden mb-2">
                    <img 
                      src={landscapingImages.garden} 
                      alt="Plant recommendation" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs font-medium">Native Flowering</span>
                </div>
                
                <div className="border rounded-lg p-2 bg-background/50">
                  <div className="aspect-square rounded overflow-hidden mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3" 
                      alt="Plant recommendation" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs font-medium">Drought Resistant</span>
                </div>
                
                <div className="border rounded-lg p-2 bg-background/50">
                  <div className="aspect-square rounded overflow-hidden mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3" 
                      alt="Plant recommendation" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs font-medium">Shade Trees</span>
                </div>
                
                <div className="border rounded-lg p-2 bg-background/50">
                  <div className="aspect-square rounded overflow-hidden mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3" 
                      alt="Plant recommendation" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs font-medium">Ground Cover</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Site Layout</h4>
              <div className="aspect-square bg-muted/30 rounded-lg relative">
                <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/30 rounded"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-accent/20 rounded"></div>
                <div className="absolute bottom-6 right-6">
                  <Button size="sm" variant="outline" className="text-xs">Edit Layout</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={saveLandscapingDesign} className="flex items-center gap-2">
              <Save size={16} />
              Save & Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapingFeatures;

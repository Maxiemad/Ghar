import { useState } from 'react';
import { 
  TreeDeciduous, 
  Image,
  Fence,
  CloudSun,
  Map,
  PaintBucket,
  Settings,
  Home,
  ArrowUpRight,
  Check,
  Save,
  ShoppingCart,
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useCart } from '../hooks/useCart';
import LandscapingFeatures from './landscaping/LandscapingFeatures';

const Exterior = () => {
  const [activeTab, setActiveTab] = useState('landscaping');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [selectedColors, setSelectedColors] = useState(['#F9F9F9', '#1A2421']);
  const { addToCart } = useCart();
  
  const exteriorStyles = [
    { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'minimalist', name: 'Minimalist', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'countryside', name: 'Countryside', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  ];
  
  const exteriorColors = [
    { id: 'neutral', name: 'Neutral Tones', colors: ['#F9F9F9', '#E0E0E0', '#C4C4C4', '#1A2421'] },
    { id: 'warm', name: 'Warm Palette', colors: ['#FFF3E0', '#FFE0B2', '#FFB74D', '#8D6E63'] },
    { id: 'cool', name: 'Cool Palette', colors: ['#E8F5E9', '#C8E6C9', '#81C784', '#37474F'] },
    { id: 'bold', name: 'Bold Statement', colors: ['#FFEBEE', '#F8BBD0', '#EC407A', '#C2185B'] },
  ];
  
  const saveExteriorDesign = () => {
    const design = {
      id: `exterior-${Date.now()}`,
      type: 'exterior',
      name: `${selectedStyle} Exterior Design`,
      style: selectedStyle,
      colors: selectedColors,
      price: calculateExteriorPrice(),
      image: exteriorStyles.find(style => style.id === selectedStyle)?.image,
      timestamp: new Date().toISOString()
    };
    
    // Add design to cart
    addToCart(design);
    
    // Show success toast
    toast.success("Exterior design added to cart!", {
      description: `Your ${selectedStyle} exterior design has been saved and added to your cart.`
    });
  };
  
  const calculateExteriorPrice = () => {
    // Base price for the exterior design
    let basePrice = 25000;
    
    // Add price based on style
    const stylePremium = selectedStyle === 'modern' ? 15000 : 
                        selectedStyle === 'minimalist' ? 12000 : 
                        selectedStyle === 'traditional' ? 18000 : 20000;
    
    return basePrice + stylePremium;
  };

  const changeExteriorTab = (tab) => {
    setActiveTab(tab);
  };

  const renderExteriorTabContent = () => {
    switch(activeTab) {
      case 'landscaping':
        return <LandscapingFeatures />;
      case 'architecture':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Architectural Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {exteriorStyles.map((style) => (
                <button 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative overflow-hidden rounded-lg aspect-video ${selectedStyle === style.id ? 'ring-2 ring-primary' : ''}`}
                >
                  <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white font-medium">{style.name}</span>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">3D Architectural Preview</h4>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <ArrowUpRight size={14} /> 
                  Full Screen
                </Button>
              </div>
              <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                <img 
                  src={exteriorStyles.find(style => style.id === selectedStyle)?.image || exteriorStyles[0].image} 
                  alt={selectedStyle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Save Architecture Button */}
            <div className="flex justify-end">
              <Button onClick={saveExteriorDesign} className="flex items-center gap-2">
                <Save size={16} />
                Save & Add to Cart
              </Button>
            </div>
          </div>
        );
      case 'colors':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PaintBucket size={20} /> Exterior Finish & Colors
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Recommended Palettes</h4>
                <div className="space-y-3">
                  {exteriorColors.map((palette) => (
                    <div 
                      key={palette.id}
                      className="bg-background/50 p-3 rounded-lg"
                      onClick={() => setSelectedColors(palette.colors)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{palette.name}</span>
                        <button className="text-xs text-primary hover:underline">Apply</button>
                      </div>
                      <div className="flex h-8 rounded-md overflow-hidden">
                        {palette.colors.map((color, i) => (
                          <div 
                            key={i} 
                            className="flex-1" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium mb-2">Live Preview</h4>
                <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden relative">
                  <img 
                    src={exteriorStyles.find(s => s.id === selectedStyle)?.image} 
                    alt="Exterior Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                </div>
                
                {/* Save Colors Button */}
                <div className="flex justify-end">
                  <Button onClick={saveExteriorDesign} className="flex items-center gap-2">
                    <Save size={16} />
                    Save Colors & Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'custom':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Custom Exterior Features</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings size={14} />
                Advanced Settings
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card dark:glass-card-dark rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Home size={16} /> Facade
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Material</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Brick</option>
                      <option>Stone</option>
                      <option>Stucco</option>
                      <option>Wood Siding</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Windows</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Modern</option>
                      <option>Traditional</option>
                      <option>Bay Windows</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Roof Style</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Flat</option>
                      <option>Gabled</option>
                      <option>Hip</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Fence size={16} /> Boundary
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fence Type</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Wooden</option>
                      <option>Iron</option>
                      <option>Stone Wall</option>
                      <option>Hedge</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gate</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Matching</option>
                      <option>Statement</option>
                      <option>Smart Gate</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Height</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Low (3ft)</option>
                      <option>Medium (5ft)</option>
                      <option>Tall (7ft)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <TreeDeciduous size={16} /> Greenery
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trees</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Evergreen</option>
                      <option>Flowering</option>
                      <option>Fruit Trees</option>
                      <option>Native Species</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plants</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Drought Resistant</option>
                      <option>Seasonal Flowers</option>
                      <option>Low Maintenance</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lawn</span>
                    <select className="text-xs bg-background border rounded px-2 py-1">
                      <option>Natural Grass</option>
                      <option>Artificial Turf</option>
                      <option>Xeriscaping</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={saveExteriorDesign} className="flex items-center gap-2">
                <Save size={16} />
                Save Custom Design & Add to Cart
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <section id="exterior" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Exterior</span> Design
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Create stunning exterior designs with intelligent landscaping and architectural tools.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant={activeTab === 'landscaping' ? 'default' : 'outline'} 
              onClick={() => changeExteriorTab('landscaping')}
              className="flex items-center gap-2"
            >
              <TreeDeciduous size={16} />
              Landscaping
            </Button>
            <Button 
              variant={activeTab === 'architecture' ? 'default' : 'outline'} 
              onClick={() => changeExteriorTab('architecture')}
              className="flex items-center gap-2"
            >
              <Home size={16} />
              Architecture
            </Button>
            <Button 
              variant={activeTab === 'colors' ? 'default' : 'outline'} 
              onClick={() => changeExteriorTab('colors')}
              className="flex items-center gap-2"
            >
              <PaintBucket size={16} />
              Colors & Finishes
            </Button>
            <Button 
              variant={activeTab === 'custom' ? 'default' : 'outline'} 
              onClick={() => changeExteriorTab('custom')}
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Custom Features
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {renderExteriorTabContent()}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 -right-64 w-96 h-96 rounded-full bg-ghar-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 -left-32 w-64 h-64 rounded-full bg-ghar-secondary/10 blur-3xl -z-10"></div>
    </section>
  );
};

export default Exterior;

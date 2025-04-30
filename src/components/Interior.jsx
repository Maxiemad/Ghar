import { useState, useEffect } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from 'react-beautiful-dnd';
import { 
  Sofa, 
  Lamp, 
  Palette, 
  SunMoon, 
  Search, 
  Eye, 
  CircleDollarSign, 
  Image,
  Check,
  Clock,
  ShoppingCart,
  PanelTop,
  Save
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useCart } from '../hooks/useCart';

const Interior = () => {
  const [activeTab, setActiveTab] = useState('designer');
  const [items, setItems] = useState([
    { id: 'sofa1', content: 'Modern Sofa', type: 'sofa' },
    { id: 'table1', content: 'Coffee Table', type: 'table' },
    { id: 'lamp1', content: 'Floor Lamp', type: 'lamp' },
    { id: 'rug1', content: 'Area Rug', type: 'rug' },
    { id: 'chair1', content: 'Accent Chair', type: 'chair' },
  ]);
  const [roomItems, setRoomItems] = useState([]);
  const [lightingMode, setLightingMode] = useState('day');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [budgetTotal, setBudgetTotal] = useState(78500);
  const { addToCart } = useCart();
  
  const styles = [
    { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'minimalist', name: 'Minimalist', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'boho', name: 'Boho', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 'darkAcademia', name: 'Dark Academia', image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  ];

  const furnitureRecommendations = [
    { id: 'rec1', name: 'Elegance Chair', price: 12999, brand: 'Design Home', material: 'Leather', available: true, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 'rec2', name: 'Cloud Sofa', price: 24999, brand: 'Comfort Plus', material: 'Fabric', available: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 'rec3', name: 'Aura Lamp', price: 5499, brand: 'LightLife', material: 'Metal/Glass', available: false, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
  ];

  const colorPalettes = [
    { id: 'palette1', name: 'Serene Blue', colors: ['#E0F7FF', '#89CFF0', '#4682B4', '#000080'] },
    { id: 'palette2', name: 'Earthy Tones', colors: ['#F4E6CC', '#D4B592', '#A47551', '#3A2718'] },
    { id: 'palette3', name: 'Vibrant Pop', colors: ['#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9'] },
  ];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;
    
    if (sourceId === 'catalog' && destId === 'room') {
      // Moving from catalog to room
      const item = items.find(item => item.id === result.draggableId);
      setRoomItems([...roomItems, item]);
    } else if (sourceId === 'room' && destId === 'catalog') {
      // Moving from room back to catalog
      const itemIndex = roomItems.findIndex(item => item.id === result.draggableId);
      const newRoomItems = [...roomItems];
      newRoomItems.splice(itemIndex, 1);
      setRoomItems(newRoomItems);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // Function to save the current design and add it to cart
  const saveDesign = () => {
    // Create a design object based on current state
    const design = {
      id: `interior-${Date.now()}`,
      type: 'interior',
      name: `${selectedStyle} Interior Design`,
      items: roomItems,
      style: selectedStyle,
      lighting: lightingMode,
      price: calculateDesignPrice(),
      image: styles.find(style => style.id === selectedStyle)?.image,
      timestamp: new Date().toISOString()
    };

    // Add the design to cart
    addToCart(design);
    
    // Show success notification
    toast.success("Design added to cart!", {
      description: `Your ${selectedStyle} interior design has been saved and added to your cart.`
    });
  };

  // Calculate price based on included items and selected style
  const calculateDesignPrice = () => {
    // Base price for the design
    let basePrice = 15000;
    
    // Add cost for each room item
    const itemsPrice = roomItems.length * 5000;
    
    // Premium for certain styles
    const stylePremium = selectedStyle === 'modern' ? 10000 : 
                         selectedStyle === 'minimalist' ? 8000 : 
                         selectedStyle === 'boho' ? 12000 : 15000;
    
    return basePrice + itemsPrice + stylePremium;
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'designer':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card dark:glass-card-dark p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Drag & Drop Items</h3>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="catalog">
                  {(provided) => (
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-primary/10 p-2 rounded-md w-full sm:w-auto cursor-move"
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                <div className="relative bg-muted/30 rounded-lg h-64 md:h-80">
                  <h3 className="absolute top-2 left-2 text-sm font-medium bg-background/50 px-2 py-1 rounded">Room Layout</h3>
                  <Droppable droppableId="room">
                    {(provided) => (
                      <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="h-full p-4 grid grid-cols-4 gap-1"
                      >
                        {roomItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-accent/20 p-1 text-xs border border-dashed border-accent/40 flex items-center justify-center text-center rounded"
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
              
              {/* Save Design Button */}
              <div className="mt-4 flex justify-end">
                <Button onClick={saveDesign} className="flex items-center gap-2">
                  <Save size={16} />
                  Save & Add to Cart
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card dark:glass-card-dark p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <SunMoon size={18} /> Mood Lighting
                </h3>
                <div className="flex items-center gap-3">
                  {['day', 'evening', 'party', 'calm'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLightingMode(mode)}
                      className={`px-3 py-1 rounded-full text-sm ${lightingMode === mode ? 'bg-primary text-white' : 'bg-muted'}`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="mt-4 bg-muted/30 rounded-lg h-32 overflow-hidden">
                  <div className={`h-full w-full transition-all duration-500 ${
                    lightingMode === 'day' ? 'bg-gradient-to-br from-blue-50 to-yellow-50' :
                    lightingMode === 'evening' ? 'bg-gradient-to-br from-orange-100 to-purple-100' :
                    lightingMode === 'party' ? 'bg-gradient-to-br from-pink-100 to-purple-200 animate-pulse' :
                    'bg-gradient-to-br from-blue-100 to-indigo-100'
                  }`}></div>
                </div>
              </div>
              
              <div className="glass-card dark:glass-card-dark p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CircleDollarSign size={18} /> Budget Tracker
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget:</p>
                    <p className="text-2xl font-bold">₹{budgetTotal.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <button className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">₹50K</button>
                    <button className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full block">₹1L+</button>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{width: '78%'}}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'styles':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">AI Style Generator</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {styles.map((style) => (
                <button 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative overflow-hidden rounded-lg aspect-square ${selectedStyle === style.id ? 'ring-2 ring-primary' : ''}`}
                >
                  <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:opacity-70">
                    <span className="text-white font-medium text-lg">{style.name}</span>
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
                <h4 className="font-medium">Upload Inspiration Image</h4>
                <Button size="sm" className="text-xs">Upload</Button>
              </div>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <Image className="mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              </div>
            </div>
            
            {/* Save Style Button */}
            <div className="flex justify-end">
              <Button onClick={saveDesign} className="flex items-center gap-2">
                <Save size={16} />
                Save Style & Add to Cart
              </Button>
            </div>
          </div>
        );
      case 'furniture':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Furniture Smart Match</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search furniture..." 
                  className="pl-8 pr-4 py-2 text-sm rounded-lg border border-input bg-background" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {furnitureRecommendations.map((item) => (
                <div key={item.id} className="glass-card dark:glass-card-dark rounded-lg overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="font-bold">₹{item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.brand} • {item.material}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`text-xs ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                        {item.available ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <Button size="sm" disabled={!item.available} className="text-xs flex items-center gap-1">
                        <ShoppingCart size={14} />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">Filter: Brand</Button>
              <Button variant="outline" size="sm" className="text-xs">Price Range</Button>
              <Button variant="outline" size="sm" className="text-xs">Material</Button>
              <Button variant="outline" size="sm" className="text-xs">In Stock Only</Button>
            </div>
          </div>
        );
      case 'colors':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette size={20} /> Color Palette Tools
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">AI Suggested Palettes</h4>
                {colorPalettes.map((palette) => (
                  <div key={palette.id} className="bg-background/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{palette.name}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">Apply</Button>
                    </div>
                    <div className="flex h-10 rounded-md overflow-hidden">
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
              
              <div className="glass-card dark:glass-card-dark rounded-lg p-4">
                <h4 className="font-medium mb-3">Color Harmony Check</h4>
                <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Select a palette to preview</p>
                    <Button size="sm">Preview in Room</Button>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Analysis</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Good contrast between walls and furniture
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Complementary accent colors
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      Consider adding more neutral tones
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'walkthrough':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye size={20} /> Virtual Walkthrough
            </h3>
            
            <div className="aspect-video bg-muted/30 rounded-lg relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3" 
                alt="Room 360 Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-black/50 backdrop-blur-sm hover:bg-black/70">Start 360° Tour</Button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                <p className="text-sm">Use mouse or touch to look around</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 glass-card dark:glass-card-dark p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Clock size={16} /> Viewing Options
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Day View</Button>
                  <Button variant="outline" size="sm">Night View</Button>
                  <Button variant="outline" size="sm">Zoom In</Button>
                  <Button variant="outline" size="sm">Zoom Out</Button>
                </div>
              </div>
              
              <div className="flex-1 glass-card dark:glass-card-dark p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <PanelTop size={16} /> AR Preview
                </h4>
                <p className="text-sm text-muted-foreground mb-2">Preview your design in your actual space</p>
                <Button variant="default" className="w-full">Open AR View</Button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <section id="interior" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Interior</span> Design
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Create your perfect interior space with our AI-powered design tools.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant={activeTab === 'designer' ? 'default' : 'outline'} 
              onClick={() => changeTab('designer')}
              className="flex items-center gap-2"
            >
              <Sofa size={16} />
              Room Designer
            </Button>
            <Button 
              variant={activeTab === 'styles' ? 'default' : 'outline'} 
              onClick={() => changeTab('styles')}
              className="flex items-center gap-2"
            >
              <Palette size={16} />
              AI Style
            </Button>
            <Button 
              variant={activeTab === 'furniture' ? 'default' : 'outline'} 
              onClick={() => changeTab('furniture')}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Furniture Match
            </Button>
            <Button 
              variant={activeTab === 'colors' ? 'default' : 'outline'} 
              onClick={() => changeTab('colors')}
              className="flex items-center gap-2"
            >
              <Palette size={16} />
              Color Tools
            </Button>
            <Button 
              variant={activeTab === 'walkthrough' ? 'default' : 'outline'} 
              onClick={() => changeTab('walkthrough')}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              Walkthrough
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-ghar-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 rounded-full bg-ghar-secondary/10 blur-3xl -z-10"></div>
    </section>
  );
};

export default Interior;

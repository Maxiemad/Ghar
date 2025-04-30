
import { useState } from 'react';
import { Save, Image, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';

const RoomDesigner = () => {
  const { addToCart } = useCart();
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  
  const roomTypes = [
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'office', name: 'Home Office' },
  ];
  
  const designStyles = [
    { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3' },
    { id: 'minimalist', name: 'Minimalist', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3' },
    { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3' },
    { id: 'industrial', name: 'Industrial', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3' },
  ];
  
  const roomImages = {
    living: {
      modern: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3',
      minimalist: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3',
      traditional: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3',
      industrial: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3',
    },
    bedroom: {
      modern: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3',
      minimalist: 'https://images.unsplash.com/photo-1617325247661-675ab4b64b43?ixlib=rb-4.0.3',
      traditional: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3',
      industrial: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3',
    },
    kitchen: {
      modern: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3',
      minimalist: 'https://images.unsplash.com/photo-1600607687644-a24130b194be?ixlib=rb-4.0.3',
      traditional: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3',
      industrial: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?ixlib=rb-4.0.3',
    },
    bathroom: {
      modern: 'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3',
      minimalist: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3',
      traditional: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3',
      industrial: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3',
    },
    office: {
      modern: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3',
      minimalist: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3',
      traditional: 'https://images.unsplash.com/photo-1599469803712-1d636ebc528b?ixlib=rb-4.0.3',
      industrial: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-4.0.3',
    },
  };
  
  const calculateRoomPrice = () => {
    // Base price varies by room type
    const basePrices = {
      living: 35000,
      bedroom: 25000,
      kitchen: 45000,
      bathroom: 22000,
      office: 18000,
    };
    
    // Style multipliers
    const styleMultipliers = {
      modern: 1.2,
      minimalist: 1.0,
      traditional: 1.3,
      industrial: 1.15,
    };
    
    return Math.round(basePrices[selectedRoom] * styleMultipliers[selectedStyle]);
  };
  
  const saveRoomDesign = () => {
    const design = {
      id: `interior-${Date.now()}`,
      type: 'interior',
      name: `${roomTypes.find(r => r.id === selectedRoom)?.name} - ${designStyles.find(s => s.id === selectedStyle)?.name}`,
      room: selectedRoom,
      style: selectedStyle,
      price: calculateRoomPrice(),
      image: roomImages[selectedRoom][selectedStyle],
      timestamp: new Date().toISOString()
    };
    
    addToCart(design);
    
    toast.success("Room design added to cart!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {roomTypes.map((room) => (
          <Button
            key={room.id}
            variant={selectedRoom === room.id ? "default" : "outline"}
            onClick={() => setSelectedRoom(room.id)}
            className="flex items-center gap-2"
          >
            {room.name}
          </Button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Design Style</h3>
          <div className="grid grid-cols-2 gap-3">
            {designStyles.map((style) => (
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
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Room Details</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm block mb-1">Room Size</label>
                <select className="w-full p-2 border rounded bg-background">
                  <option>Small (10-15 m²)</option>
                  <option>Medium (15-25 m²)</option>
                  <option>Large (25-40 m²)</option>
                  <option>Extra Large (40+ m²)</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm block mb-1">Ceiling Height</label>
                <select className="w-full p-2 border rounded bg-background">
                  <option>Standard (8ft/2.4m)</option>
                  <option>Medium (9ft/2.7m)</option>
                  <option>High (10ft/3m)</option>
                  <option>Vaulted/Cathedral</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm block mb-1">Natural Light</label>
                <select className="w-full p-2 border rounded bg-background">
                  <option>Minimal</option>
                  <option>Moderate</option>
                  <option>Abundant</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Design Preview</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Image size={14} />
                  Alternative Views
                </Button>
              </div>
            </div>
            <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
              <img 
                src={roomImages[selectedRoom][selectedStyle]} 
                alt={`${selectedRoom} ${selectedStyle} design`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated cost</p>
                <p className="text-2xl font-bold">${calculateRoomPrice().toLocaleString()}</p>
              </div>
              
              <Button onClick={saveRoomDesign} className="flex items-center gap-2">
                <Save size={16} />
                Save & Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;

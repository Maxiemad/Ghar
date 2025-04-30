
import { useState } from 'react';
import { 
  Save, 
  PaintBucket, 
  SofaSingle, 
  Lamp, 
  CheckSquare,
  BedDouble
} from 'lucide-react';
import { Button } from '../ui/button';
import RoomDesigner from './RoomDesigner';

const Interior = () => {
  const [activeTab, setActiveTab] = useState('room');
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'room':
        return <RoomDesigner />;
      case 'furniture':
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <h3 className="text-2xl font-medium mb-4">Furniture Selection Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Our furniture selection tool is currently being developed. 
              Check back soon to customize your spaces with handpicked furniture items.
            </p>
            <Button onClick={() => setActiveTab('room')}>
              Back to Room Design
            </Button>
          </div>
        );
      case 'materials':
      case 'lighting':
      default:
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <h3 className="text-2xl font-medium mb-4">Feature Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              We're working hard to bring you this feature.
              Check back soon for updates.
            </p>
            <Button onClick={() => setActiveTab('room')}>
              Back to Room Design
            </Button>
          </div>
        );
    }
  };

  return (
    <section id="interior" className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Interior</span> Design Studio
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Design beautiful interior spaces with our AI-powered tools and visualization.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant={activeTab === 'room' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('room')}
              className="flex items-center gap-2"
            >
              <BedDouble size={16} />
              Room Design
            </Button>
            <Button 
              variant={activeTab === 'furniture' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('furniture')}
              className="flex items-center gap-2"
            >
              <SofaSingle size={16} />
              Furniture
            </Button>
            <Button 
              variant={activeTab === 'materials' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('materials')}
              className="flex items-center gap-2"
            >
              <PaintBucket size={16} />
              Materials
            </Button>
            <Button 
              variant={activeTab === 'lighting' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('lighting')}
              className="flex items-center gap-2"
            >
              <Lamp size={16} />
              Lighting
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 rounded-full bg-ghar-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 -right-32 w-64 h-64 rounded-full bg-ghar-secondary/10 blur-3xl -z-10"></div>
    </section>
  );
};

export default Interior;

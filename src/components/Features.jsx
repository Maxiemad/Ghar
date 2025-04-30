
import { 
  Sofa, Building, Map, MessageCircle, Palette, LayoutGrid, 
  UserCheck, Clock, Share2, ShoppingCart, 
  VolumeX, Globe
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Sofa,
      title: "Interior Design Customization",
      description: "Modular furniture options, lighting fixtures, wall designs, and floor planning with an easy drag & drop interface.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Building,
      title: "Exterior Design Customization",
      description: "Wall textures, architectural styles, roof designs, and smart home tech integration for the perfect exterior.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Map,
      title: "Land Analysis & Risk Assessment",
      description: "AI identifies disaster risks and recommends suitable materials and designs for safety and sustainability.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: MessageCircle,
      title: "AI Design Assistant",
      description: "Get intelligent suggestions for materials, styles, and layouts tailored to your preferences.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Palette,
      title: "Live 3D Preview",
      description: "Change colors, furniture, and materials in real-time to visualize your dream home instantly.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: LayoutGrid,
      title: "Smart Room Suggestions",
      description: "AI analyzes your rooms and suggests missing elements or improvements for better aesthetics and functionality.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: UserCheck,
      title: "Connect with Professionals",
      description: "Hire verified interior designers, architects, and contractors directly from the platform.",
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: Clock,
      title: "Smart Lighting Moods",
      description: "Visualize different lighting settings for morning, evening, party, or relaxation modes.",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: Share2,
      title: "Save & Share Designs",
      description: "Export your designs in multiple formats and share them with friends, family, or professionals.",
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: ShoppingCart,
      title: "Shop Matched Products",
      description: "Purchase the exact materials, furniture, and decor items used in your design directly through the platform.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: VolumeX,
      title: "Voice-Controlled Design",
      description: "Use voice commands to search, customize, and navigate through the platform's features.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Design in your preferred language with our comprehensive multi-language interface.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Revolutionary</span> Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the cutting-edge tools that make GHAR the ultimate AI-powered home design platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card dark:glass-card-dark rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:animate-pulse`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-ghar-primary to-ghar-secondary text-white font-medium hover:shadow-lg transition-shadow">
            Explore All Features
          </button>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-ghar-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 rounded-full bg-ghar-secondary/10 blur-3xl -z-10"></div>
    </section>
  );
};

export default Features;

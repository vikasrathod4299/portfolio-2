import { useEffect, useRef, useState, useMemo } from 'react';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SphereItem {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

interface AnimationState {
  items: SphereItem[];
  mouseX: number;
  mouseY: number;
  activeRotation: { x: number; y: number };
  isHovering: boolean;
}

// Helper Component for Mobile Cards - Brutalist/Minimalist style
const MobileCard = ({ skill }: { skill: Skill }) => (
  <div className="flex items-center gap-2 bg-transparent border border-gray-800 dark:border-white/80 px-3 py-2 rounded-md w-[140px] flex-shrink-0 transition-all duration-200 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900">
    <i className={`${skill.icon} text-xl`} style={{ color: skill.color }}></i>
    <span className="text-gray-800 dark:text-gray-200 font-semibold text-xs">{skill.name}</span>
  </div>
);

const SkillsSphere = ({ skillsData }: { skillsData: Skill[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]); // Stores references to the DOM elements
  
  // State to track mobile view
  const [isMobile, setIsMobile] = useState(false);

  // We use a ref for the animation state to avoid triggering React re-renders for every frame
  const animationStateRef = useRef<AnimationState>({
    items: [], // Stores x, y, z, opacity of each item
    mouseX: 0,
    mouseY: 0,
    activeRotation: { x: 0.001, y: 0.001 },
    isHovering: false
  });

  // Configuration
  const radius = 220;

  // Split data for mobile columns
  const { col1Data, col2Data } = useMemo(() => {
    const halfLength = Math.ceil(skillsData.length / 2);
    return {
      col1Data: [...skillsData.slice(0, halfLength), ...skillsData.slice(0, halfLength)],
      col2Data: [...skillsData.slice(halfLength), ...skillsData.slice(halfLength)]
    };
  }, [skillsData]);
  

  // Inject Devicon CDN & Handle Window Resize
  useEffect(() => {
    if (!document.getElementById('devicon-css')) {
      const link = document.createElement('link');
      link.id = 'devicon-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      document.head.appendChild(link);
    }

    // Check Mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Animation State (Positions) - Desktop Only
  useEffect(() => {
    if (isMobile) return;
    // Calculate initial positions on a sphere (Fibonacci Sphere algorithm)
    animationStateRef.current.items = skillsData?.map((_, index) => {
      const phi = Math.acos(-1 + (2 * index + 1) / skillsData.length);
      const theta = Math.sqrt(skillsData.length * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        scale: 1,
        opacity: 1
      };
    });
  }, [skillsData, radius, isMobile]);

  // Main Animation Loop - Desktop Only
  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    
    let animationFrameId: number;

    // --- The Loop ---
    const render = () => {
      // Rotate Sphere
      const state = animationStateRef.current;
      const rotX = state.activeRotation.x;
      const rotY = state.activeRotation.y;

      state.items.forEach((item, i) => {
        // Rotation Math (Euler angles)
        const y1 = item.y * Math.cos(rotX) - item.z * Math.sin(rotX);
        const z1 = item.z * Math.cos(rotX) + item.y * Math.sin(rotX);
        item.y = y1;
        item.z = z1;

        const x1 = item.x * Math.cos(rotY) - item.z * Math.sin(rotY);
        const z2 = item.z * Math.cos(rotY) + item.x * Math.sin(rotY);
        item.x = x1;
        item.z = z2;

        // Projection
        const scale = radius / (radius - item.z + radius);
        const alpha = (item.z + radius) / (2 * radius);
        
        // Update DOM element directly via ref
        const el = itemsRef.current[i];
        if (el && containerRef.current) {
          const left = item.x + containerRef.current.clientWidth / 2 - el.offsetWidth / 2;
          const top = item.y + containerRef.current.clientHeight / 2 - el.offsetHeight / 2;
          
          el.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`;
          el.style.opacity = String(Math.max(0.15, Math.pow(alpha, 1.5)));
          el.style.filter = `blur(${(1 - alpha) * 4}px)`;
          el.style.zIndex = String(Math.floor(scale * 100));
        }
      });

      // 3. Parallax Tilt (Container)
      if (containerRef.current && !state.isHovering) {
        const tiltX = state.mouseY * 5;
        const tiltY = -state.mouseX * 5;
        containerRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [radius, isMobile]); // Dependencies: radius and isMobile

  // --- Interaction Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const state = animationStateRef.current;
    const rect = e.currentTarget.getBoundingClientRect();

    // Global (Window) coordinates for Parallax
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    state.mouseX = (e.clientX - centerX) / centerX;
    state.mouseY = (e.clientY - centerY) / centerY;

    // Local (Section) coordinates for Rotation Speed - uses the outer container
    const contCenterX = rect.left + rect.width / 2;
    const contCenterY = rect.top + rect.height / 2;
    const localX = (e.clientX - contCenterX) / (rect.width / 2); 
    const localY = (e.clientY - contCenterY) / (rect.height / 2);

    // Update rotation speed (Inverted)
    state.activeRotation.y = -localX * 0.03; 
    state.activeRotation.x = -localY * 0.03;
  };

  const handleMouseLeave = () => {
    const state = animationStateRef.current;
    state.activeRotation = { x: 0.001, y: 0.001 };
    state.mouseX = 0;
    state.mouseY = 0;
    state.isHovering = false;
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <div 
      className="relative w-full flex justify-center items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- DESKTOP VIEW: 3D Sphere --- */}
      {!isMobile && (
        <div 
          ref={containerRef}
          className="relative w-[500px] h-[500px] preserve-3d transition-transform duration-100 ease-out z-10"
        >
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="absolute top-0 left-0 flex items-center gap-2 text-gray-800 dark:text-white font-semibold text-base px-4 py-2.5 
                         pointer-events-none select-none whitespace-nowrap 
                         bg-transparent border-2 border-gray-800 dark:border-white/80"
            >
              <i className={`${skill.icon} text-2xl`} style={{ color: skill.color }}></i>
              {skill.name}
            </div>
          ))}
        </div>
      )}

      {/* --- MOBILE VIEW: Double Parallax Stream --- */}
      {isMobile && (
        <div className="relative flex justify-center gap-4 w-full h-[500px] overflow-hidden py-10 px-4 z-10">
          {/* Column 1: Scrolls Up */}
          <div className="flex flex-col gap-4 animate-scroll-up">
            {col1Data.map((skill, index) => (
              <MobileCard key={`col1-${index}`} skill={skill} />
            ))}
          </div>
          
          {/* Column 2: Scrolls Down */}
          <div className="flex flex-col gap-4 animate-scroll-down">
            {col2Data.map((skill, index) => (
              <MobileCard key={`col2-${index}`} skill={skill} />
            ))}
          </div>

          {/* Fade Overlay for Mobile - uses CSS variables for background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-[#18181b] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#18181b] to-transparent z-20 pointer-events-none"></div>
        </div>
      )}

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillsSphere;

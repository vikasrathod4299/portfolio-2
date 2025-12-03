import { useEffect, useRef, useMemo } from 'react';

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

const SkillsSphere = ({ skillsData }: { skillsData: Skill[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]); // Stores references to the DOM elements
  
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
  

  // Inject Devicon CDN
  useEffect(() => {
    if (!document.getElementById('devicon-css')) {
      const link = document.createElement('link');
      link.id = 'devicon-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      document.head.appendChild(link);
    }
  }, []);

  // Initialize Animation State (Positions)
  useEffect(() => {
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
  }, [skillsData, radius]);

  // Main Animation Loop
  useEffect(() => {
    if (!containerRef.current) return;
    
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
  }, [radius]); // Dependencies: only radius needs to trigger full restart

  // --- Interaction Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const state = animationStateRef.current;

    // Global (Window) coordinates for Parallax
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    state.mouseX = (e.clientX - centerX) / centerX;
    state.mouseY = (e.clientY - centerY) / centerY;

    // Local (Container) coordinates for Rotation Speed
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

  // Helper for item hover
  const handleItemHover = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    const isDark = document.documentElement.classList.contains('dark');
    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)';
    e.currentTarget.style.zIndex = '10000'; // Force to top
    const icon = e.currentTarget.querySelector('i');
    if (icon) icon.style.color = color;
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const isDark = document.documentElement.classList.contains('dark');
    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(229, 231, 235, 1)';
    e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)';
    e.currentTarget.style.zIndex = ''; // Let animation loop handle z-index
    const icon = e.currentTarget.querySelector('i');
    if (icon) icon.style.color = '';
  };

  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden">
      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative w-[500px] h-[500px] preserve-3d transition-transform duration-100 ease-out z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render Skills Declaratively */}
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute top-0 left-0 flex items-center gap-2 text-gray-700 dark:text-slate-300 font-bold text-xl px-5 py-3 
                       cursor-pointer select-none whitespace-nowrap 
                       bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg backdrop-blur-sm shadow-lg
                       transition-colors duration-300"
            onMouseEnter={(e) => handleItemHover(e, skill.color)}
            onMouseLeave={handleItemLeave}
          >
            <i className={`${skill.icon} text-3xl transition-colors duration-300`}></i>
            {skill.name}
          </div>
        ))}
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default SkillsSphere;

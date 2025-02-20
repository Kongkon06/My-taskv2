import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Zap, Clock, ChartBar, TrendingUp, Calendar, Map, Link, CheckSquare } from 'lucide-react';
import Dashboard from '../assets/My_task Dashboard.png';
import Analytics from '../assets/Analytics.png';
import Planner from '../assets/Task Planner.png';

export function Info() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Hi There";
  const [isVisible, setIsVisible] = useState<any>({});

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Intersection Observer for features
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            setIsVisible((prev: any) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const features = [
    { icon: <CheckCircle className="w-6 h-6" />, text: "Track your daily tasks" },
    { icon: <Zap className="w-6 h-6" />, text: "Boost productivity" },
    { icon: <Clock className="w-6 h-6" />, text: "Time management made easy" },
  ];

  return (
    <div className="relative max-w-screen min-h-screen bg-black overflow-hidden">
      {/* Background remains the same */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90 z-10" />
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://i.pinimg.com/736x/74/6d/5a/746d5a2c2b2a4d80ee1b54da38082031.jpg"
            alt="Background"
            className="w-full h-full blur-lg object-cover"
          />
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full 
                          mb-8 animate-fade-in">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="text-white/90 text-sm">New Features Available</span>
            </div>

            <h1 className="font-kubo text-4xl md:text-6xl text-white mb-4 leading-relaxed">
              <span className="inline-block min-w-[2ch]">{text}</span>
              <span className={`inline-block w-1 h-12 bg-white/75 ${isTypingComplete ? 'animate-cursor-blink' : ''}`}></span>
            </h1>

            <p className={`text-white text-2xl font-goldman transition-opacity duration-500 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
              Are you searching for a productivity app to manage, track, and plan your tasks?
              <br />
              Introducing <span className="text-blue-400 relative">
                My Task
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 animate-expand-line" />
              </span>
            </p>

            <p className={`text-gray-300 text-lg md:text-xl mb-8 transition-opacity duration-500 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
              Boost your efficiency with an intuitive task management system.
            </p>

            {/* Features grid with stagger animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 flex items-center justify-center space-x-3 
                           text-white/90 p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 
                           ${isTypingComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/signup')}
                className={`group px-8 py-3 bg-transparent border-2 border-white text-white
                         hover:bg-white hover:text-black transition-all duration-300
                         rounded-full font-kubo text-lg flex items-center justify-center space-x-2
                         transform ${isTypingComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Sections with Intersection Observer animations */}
        <div
          data-section="feature1"
          className="relative py-20 px-4 md:px-8 bg-black/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 transition-all duration-1000 transform 
                            ${isVisible.feature1 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                {/* Feature content remains the same */}
                <h2 className="text-3xl md:text-4xl font-kubo text-white mb-6">
                  Boost Your Productivity with My-Tasks!
                </h2>
                {/* ... rest of the feature content ... */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  Struggling to keep track of your daily and weekly tasks? My-Tasks is your ultimate
                  productivity companion! With an intuitive dashboard, goal tracking, and insightful
                  progress analytics, staying on top of your work has never been easier.
                </p>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-xl font-goldman text-white">📌 Key Features:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Smart task management & progress tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Visual insights into daily & weekly achievements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Beautiful, modern UI for effortless organization
                    </li>
                  </ul>
                </div>
                <p className="text-2xl font-goldman text-white">
                  Take control of your productivity today! 🚀
                </p>
              </div>

              <div className={`relative transition-all duration-1000 transform 
                            ${isVisible.feature1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <img
                  src={Dashboard}
                  alt="Task List Preview"
                  className="relative rounded-xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add similar data-section and animation classes to other feature sections */}
        <div
          data-section="feature2"
          className="relative py-20 px-4 md:px-8 bg-black/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`relative transition-all duration-1000 transform
                            ${isVisible.feature2 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <img
                  src={Analytics}
                  alt="Task List Preview"
                  className="relative rounded-xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className={`space-y-6 transition-all duration-1000 transform 
                            ${isVisible.feature2 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                {/* Feature content remains the same */}
                <h2 className="text-3xl md:text-4xl font-kubo text-white">
                Track Your Tasks and Progress
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Stay motivated with My-Tasks' powerful analytics dashboard! Visualize your streaks, 
                task completion rates, and monthly progress—all in one sleek interface.
              </p>

              <div className="space-y-6">
                <h3 className="text-xl font-goldman text-white flex items-center gap-2">
                  <ChartBar className="w-6 h-6 text-blue-400" />
                  Analytics Features
                </h3>
                
                <div className="grid gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">Task Streak Tracking</h4>
                        <p className="text-gray-400">Stay consistent with daily progress monitoring</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">Progress Breakdown</h4>
                        <p className="text-gray-400">Monthly & weekly detailed analysis</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <ChartBar className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">Visual Analytics</h4>
                        <p className="text-gray-400">Beautiful insights for smarter planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-2xl font-goldman text-white">
                  Achieve more, stay on track, and crush your goals! 🚀
                </p>
              </div>
              </div>

            </div>
          </div>
        </div>
        {/* ... rest of the component remains the same ... */}
        <div
          data-section="feature3"
          className="relative py-20 px-4 md:px-8 bg-black/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 transition-all duration-1000 transform 
                            ${isVisible.feature3 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                {/* Feature content remains the same */}
                <h2 className="text-3xl md:text-4xl font-kubo text-white">
                Plan, Organize, and Conquer Your Goals!
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                With My-Tasks' interactive Task Map, you can visually plan your tasks, create structured roadmaps, 
                and track your progress effortlessly. Drag, connect, and organize tasks the way you like, 
                making it easier to break down big goals into manageable steps.
              </p>

              <div className="space-y-6">
                <h3 className="text-xl font-goldman text-white flex items-center gap-2">
                  <Map className="w-6 h-6 text-blue-400" />
                  Task Map Features
                </h3>
                
                <div className="grid gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                        <Map className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">Visual Task Mapping</h4>
                        <p className="text-gray-400">Create intuitive roadmaps for your projects</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                        <Link className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">Customizable Dependencies</h4>
                        <p className="text-gray-400">Link related tasks for structured planning</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                        <CheckSquare className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-goldman">One-Click Completion</h4>
                        <p className="text-gray-400">Mark tasks as done with a single click</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg
                           flex items-center gap-2 text-white font-goldman"
                >
                  <span>Start Mapping Your Success</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              </div>
              <div className={`relative transition-all duration-1000 transform
                            ${isVisible.feature3 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <img
                  src={Planner}
                  alt="Task List Preview"
                  className="relative rounded-xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2
                      flex space-x-4 text-white/50 text-sm animate-fade-in opacity-0 [animation-delay:1600ms]">
          <span className="font-mono">01</span>
          <span className="font-mono">━</span>
          <span className="font-mono">∞</span>
        </div>
      </div>
    </div>

    
  );
}

// Add these animations to your global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes expand-line {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-expand-line {
    animation: expand-line 0.6s ease-out forwards;
  }

  .animate-cursor-blink {
    animation: cursor-blink 1s step-end infinite;
  }
`;
document.head.appendChild(style);

export default Info;
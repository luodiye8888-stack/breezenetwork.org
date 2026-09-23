import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const anchor = `          <a href="/network" class="text-gray-400 hover:text-white transition-colors">了解线路详情</a>
        </div>`;
        
const injection = `          <a href="/network" class="text-gray-400 hover:text-white transition-colors">了解线路详情</a>
        </div>
        
        <!-- Contact Dock -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        <style>
        .contact-dock {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        }
        .contact-dock .letter {
          position: relative;
          width: 52px;
          height: 52px;
          perspective: 1000px;
          cursor: pointer;
          text-decoration: none;
        }
        .contact-dock .flip {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .contact-dock .letter:hover .flip {
          transform: rotateY(180deg);
        }
        .contact-dock .front, .contact-dock .back {
          width: 100%;
          height: 100%;
          position: absolute;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .contact-dock .front {
          background: rgba(255,255,255,0.03);
          color: #9CA3AF;
          border: 1px solid rgba(255,255,255,0.05);
          font-weight: bold;
          transition: all 0.3s;
        }
        .contact-dock .letter:hover .front {
          color: white;
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }
        .contact-dock .back {
          transform: rotateY(180deg);
          color: white;
        }
        .contact-dock .logo .back { background: transparent; border: none; }
        .contact-dock .email .back { background: #ea4335; }
        .contact-dock .facebook .back { background: #1877f2; }
        .contact-dock .github .back { background: #333; }
        
        .contact-dock .tooltip {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          opacity: 0;
          background: rgba(11, 22, 40, 0.9);
          color: #D1D5DB;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(4px);
        }
        .contact-dock .letter:hover .tooltip {
          opacity: 1;
          color: white;
          transform: translateX(-50%) scale(1);
        }
        </style>
        
        <div class="contact-dock">
            <!-- 联 -->
            <a href="https://edp01.breezenetaff.com/#/?code=bSnymFll" class="letter logo" target="_blank" rel="nofollow">
                <div class="flip">
                    <div class="front">联</div>
                    <div class="back"><img src="/logo.png" alt="微风网络" class="w-full h-full object-cover rounded-[14px]" /></div>
                </div>
                <span class="tooltip">微风网络</span>
            </a>
        
            <!-- 系 -->
            <a href="mailto:support@breezenetwork.org" class="letter email">
                <div class="flip">
                    <div class="front">系</div>
                    <div class="back"><i class="fa-solid fa-envelope"></i></div>
                </div>
                <span class="tooltip">Email Support</span>
            </a>
        
            <!-- 我 -->
            <a href="https://facebook.com/" class="letter facebook" target="_blank">
                <div class="flip">
                    <div class="front">我</div>
                    <div class="back"><i class="fa-brands fa-facebook-f"></i></div>
                </div>
                <span class="tooltip">Facebook</span>
            </a>
        
            <!-- 们 -->
            <a href="https://github.com/weifeng" class="letter github" target="_blank">
                <div class="flip">
                    <div class="front">们</div>
                    <div class="back"><i class="fa-brands fa-github"></i></div>
                </div>
                <span class="tooltip">GitHub Repo</span>
            </a>
        </div>`;

content = content.replace(anchor, injection);
fs.writeFileSync('src/pages/index.astro', content);

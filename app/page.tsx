'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const fps = 30;
  const duration = 60;
  const totalFrames = fps * duration;

  const scenes = [
    {
      start: 0,
      end: 10,
      title: 'आवास सहायता कार्यक्रम',
      subtitle: 'नागरिकों के लिए घर का सपना',
      icon: '🏠'
    },
    {
      start: 10,
      end: 22,
      title: 'कार्यक्रम क्या है?',
      content: [
        '• किफायती आवास के लिए वित्तीय सहायता',
        '• घर बनाने या खरीदने में मदद',
        '• सब्सिडी और ऋण सुविधाएं',
        '• शहरी और ग्रामीण क्षेत्रों के लिए'
      ],
      icon: '📋'
    },
    {
      start: 22,
      end: 35,
      title: 'कौन आवेदन कर सकता है?',
      content: [
        '• भारतीय नागरिक',
        '• आर्थिक रूप से कमजोर वर्ग',
        '• निम्न और मध्यम आय समूह',
        '• जिनके पास पक्का घर नहीं है',
        '• आय प्रमाण पत्र आवश्यक'
      ],
      icon: '👥'
    },
    {
      start: 35,
      end: 48,
      title: 'ऑनलाइन आवेदन कैसे करें?',
      content: [
        '1. आधिकारिक वेबसाइट पर जाएं',
        '2. पंजीकरण फॉर्म भरें',
        '3. आवश्यक दस्तावेज अपलोड करें',
        '   • आधार कार्ड',
        '   • आय प्रमाण पत्र',
        '   • बैंक खाता विवरण',
        '4. आवेदन जमा करें'
      ],
      icon: '💻'
    },
    {
      start: 48,
      end: 60,
      title: 'मुख्य लाभ',
      content: [
        '✓ ब्याज सब्सिडी',
        '✓ आसान ऋण प्रक्रिया',
        '✓ त्वरित स्वीकृति',
        '✓ पारदर्शी प्रणाली',
        '',
        'अधिक जानकारी के लिए',
        'नजदीकी कार्यालय से संपर्क करें'
      ],
      icon: '✨'
    }
  ];

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentSecond = frame / fps;
    const scene = scenes.find(s => currentSecond >= s.start && currentSecond < s.end);

    if (!scene) return;

    // Clear canvas
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e3f2fd');
    gradient.addColorStop(1, '#bbdefb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw decorative elements
    ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 100, canvas.height - 100, 200, 0, Math.PI * 2);
    ctx.fill();

    // Calculate fade
    const sceneProgress = (currentSecond - scene.start) / (scene.end - scene.start);
    let opacity = 1;
    if (sceneProgress < 0.1) {
      opacity = sceneProgress / 0.1;
    } else if (sceneProgress > 0.9) {
      opacity = (1 - sceneProgress) / 0.1;
    }

    ctx.globalAlpha = opacity;

    // Draw icon
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const iconY = scene.content ? 180 : canvas.height / 2 - 80;
    ctx.fillText(scene.icon, canvas.width / 2, iconY);

    // Draw title
    ctx.font = 'bold 56px Arial';
    ctx.fillStyle = '#1565c0';
    const titleY = scene.content ? 320 : canvas.height / 2 + 40;
    ctx.fillText(scene.title, canvas.width / 2, titleY);

    // Draw subtitle (for first scene)
    if (scene.subtitle) {
      ctx.font = '36px Arial';
      ctx.fillStyle = '#424242';
      ctx.fillText(scene.subtitle, canvas.width / 2, canvas.height / 2 + 100);
    }

    // Draw content
    if (scene.content) {
      ctx.font = '32px Arial';
      ctx.fillStyle = '#212121';
      ctx.textAlign = 'left';

      let startY = 400;
      scene.content.forEach((line, index) => {
        const x = line.startsWith('✓') || line.startsWith('•') ? 280 :
                  line.match(/^\d+\./) ? 280 :
                  line.startsWith('   •') ? 340 : 300;
        ctx.fillText(line, x, startY + (index * 48));
      });
    }

    ctx.globalAlpha = 1;

    // Draw progress bar
    const progressWidth = canvas.width * 0.8;
    const progressX = (canvas.width - progressWidth) / 2;
    const progressY = canvas.height - 60;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(progressX, progressY, progressWidth, 8);

    ctx.fillStyle = '#1565c0';
    ctx.fillRect(progressX, progressY, progressWidth * (currentSecond / duration), 8);

    // Draw watermark
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('सार्वजनिक लाभ कार्यक्रम', canvas.width / 2, canvas.height - 20);
  };

  const playVideo = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    setIsPlaying(true);
    const startTime = Date.now() - (currentTime * 1000);

    // Create background music (simple oscillator)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

    oscillator.start();

    const animate = () => {
      if (!isPlaying) {
        oscillator.stop();
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed >= duration) {
        setIsPlaying(false);
        setCurrentTime(0);
        oscillator.stop();
        return;
      }

      setCurrentTime(elapsed);
      const frame = Math.floor(elapsed * fps);
      drawFrame(frame);

      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    drawFrame(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      drawFrame(Math.floor(currentTime * fps));
    }
  }, [currentTime, isPlaying]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        आवास सहायता कार्यक्रम - सूचना वीडियो
      </h1>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '1120px',
        width: '100%'
      }}>
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            display: 'block'
          }}
        />

        <div style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <button
            onClick={playVideo}
            style={{
              padding: '15px 40px',
              fontSize: '1.2rem',
              background: isPlaying ? '#f44336' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}
          >
            {isPlaying ? '⏸ रोकें' : '▶ वीडियो चलाएं'}
          </button>

          <div style={{
            fontSize: '1.1rem',
            color: '#666',
            fontWeight: '500'
          }}>
            {Math.floor(currentTime)}s / {duration}s
          </div>

          <div style={{
            textAlign: 'center',
            color: '#777',
            fontSize: '0.9rem',
            maxWidth: '600px',
            marginTop: '10px',
            lineHeight: '1.6'
          }}>
            <p><strong>वीडियो की विशेषताएं:</strong></p>
            <p>• हिंदी भाषा में पूर्ण जानकारी</p>
            <p>• शांत पृष्ठभूमि संगीत</p>
            <p>• स्पष्ट दृश्य और पाठ</p>
            <p>• शैक्षिक और तटस्थ स्वर</p>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: 0.8
      }}>
        <p>यह एक शैक्षिक सूचना वीडियो है</p>
        <p>निष्पक्ष और पारदर्शी जानकारी के लिए बनाया गया</p>
      </div>
    </div>
  );
}

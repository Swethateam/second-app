import React, { useState, useEffect, useRef } from "react";

// ===== Typewriter Component =====
function TypewriterText({ text, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h2 style={{ fontSize: "42px", color: "#ff1a75", marginBottom: "16px" }}>
      {displayedText}
    </h2>
  );
}

// ===== Main Component =====
export default function DigitalGiftApp() {
  const [page, setPage] = useState(1);
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizMsg, setQuizMsg] = useState("");
  const [showBurst, setShowBurst] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);
  const [recipient, setRecipient] = useState("Beloved");
  const [loveMessage, setLoveMessage] = useState("I love you more than anything!");
  const [voicePlaying, setVoicePlaying] = useState(false);
  const voiceRef = useRef(null);
  const bgMusicRef = useRef(null); // for background music

  const [toggleOn, setToggleOn] = useState(false);
  // Inside your DigitalGiftApp component, at the top with other states
const fullMessage = "I love you more than anything!\n— Beloved";
const [typed, setTyped] = useState("");

// Typewriter effect
useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    setTyped(fullMessage.slice(0, i + 1));
    i++;
    if (i >= fullMessage.length) clearInterval(interval);
  }, 50); // typing speed in ms
  return () => clearInterval(interval);
}, []);


  const quotes = [
    "“Love is composed of a single soul inhabiting two bodies.” – Aristotle",
    "“You are my today and all of my tomorrows.” – Leo Christopher",
    "“I saw that you were perfect, and so I loved you.” – Shakespeare",
    "“Together is my favorite place to be.” – Unknown",
    "“You make my heart smile every day.” – Unknown"
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Who loves you the most?",
      options: [
        { key: "A", label: "A) Nobody" },
        { key: "B", label: "B) Random person" },
        { key: "C", label: "C) Me ❤️" },
      ],
      correct: "C",
    },
    {
      id: 2,
      question: "What color makes me happiest?",
      options: [
        { key: "A", label: "A) Blue" },
        { key: "B", label: "B) Pink ❤️" },
        { key: "C", label: "C) Green" },
      ],
      correct: "B",
    },
    {
      id: 3,
      question: "Where did we first meet?",
      options: [
        { key: "A", label: "A) School" },
        { key: "B", label: "B) Park ❤️" },
        { key: "C", label: "C) Mall" },
      ],
      correct: "B",
    },
  ];

  const videos = {
    talk: "/video/first talk.mp4",
    smile: "/video/we smile.mp4",
    happy: "/video/date.mp4",
  };

  const photos = [
    "/image/Screenshot 2025-12-11 181915.png",
    "/image/Screenshot 2025-12-11 181230.png",
    "/image/Screenshot 2025-12-11 181306.png",
    "/image/Screenshot 2025-12-11 181349.png",
    "/image/Screenshot 2025-12-11 181757.png",
  ];

  // Slide show for page 5
  useEffect(() => {
    if (page === 5) {
      const interval = setInterval(() => {
        setSlideIndex((s) => (s + 1) % photos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [page]);

  // Shake animation for wrong password
  useEffect(() => {
    if (shake) {
      const t = setTimeout(() => setShake(false), 600);
      return () => clearTimeout(t);
    }
  }, [shake]);

  // Glitter hearts background
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          size: 8 + Math.random() * 16,
          duration: 4000 + Math.random() * 3000,
        },
      ]);
      if (hearts.length > 50) setHearts((prev) => prev.slice(20));
    }, 200);
    return () => clearInterval(interval);
  }, [hearts]);

  // Full screen video
  function playVideo(src) {
  if (bgMusicRef.current) bgMusicRef.current.pause(); // pause music

  const video = document.createElement("video");
  video.src = src;
  video.autoplay = true;
  video.controls = true;
  video.style.position = "fixed";
  video.style.top = 0;
  video.style.left = 0;
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.objectFit = "cover";
  video.style.zIndex = 9999;

  video.addEventListener("ended", () => {
    video.remove();
    if (bgMusicRef.current) bgMusicRef.current.play(); // resume music
  });

  video.addEventListener("click", () => {
    video.remove();
    if (bgMusicRef.current) bgMusicRef.current.play(); // resume music
  });

  document.body.appendChild(video);
  video.play().catch(() => {});
}

  // Unlock password
  function tryUnlock() {
  if (password.trim() === "12345") {
    setToggleOn(true); // unlock animation start

    // Background music start
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
    }

    setTimeout(() => setPage(2), 1500); // next page
  } else {
    alert("Incorrect password! 💔");
    setPassword("");
  }
}


  // Voice play/pause
 function toggleVoice() {
  if (!voiceRef.current || !bgMusicRef.current) return;

  if (voiceRef.current.paused) {
    bgMusicRef.current.pause();  // music stop
    voiceRef.current.play();     // voice play
    setVoicePlaying(true);
  } else {
    voiceRef.current.pause();    
    setVoicePlaying(false);
    bgMusicRef.current.play();   // music resume
  }
}

function onVoiceEnded() {
  setVoicePlaying(false);
  if (bgMusicRef.current) bgMusicRef.current.play(); // resume music
  setPage(5); // next page
}



  function answerQuiz(choice) {
  const correctAnswer = quizQuestions[currentQuestion].correct;

  if (choice === correctAnswer) {
    setQuizMsg("Correct! 💖");

    setTimeout(() => {
      setQuizMsg("");

      // If it is NOT the last question → go to next question
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } 
      else {
        // LAST QUESTION → move to Love Letter Page
        setPage(7);  // 👉 Change to your Love Letter page number
      }

    }, 900);
  } 
  else {
    setQuizMsg("Try again 😭😂");
    setTimeout(() => setQuizMsg(""), 1200);
  }
}
function TypewriterText({ lines, speed = 50 }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [lineIndex, setLineIndex] = React.useState(0);

  React.useEffect(() => {
    if (lineIndex >= lines.length) return; // stop if all lines typed
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + lines[lineIndex].charAt(i));
      i++;
      if (i >= lines[lineIndex].length) {
        clearInterval(interval);
        setDisplayedText((prev) => prev + "\n"); // new line after each
        setTimeout(() => setLineIndex(lineIndex + 1), 500); // delay before next line
      }
    }, speed);
    return () => clearInterval(interval);
  }, [lineIndex, lines, speed]);

  return (
    <pre style={{ 
      fontSize: "28px", 
      color: "#ff1a75", 
      whiteSpace: "pre-wrap", 
      textAlign: "center",
      lineHeight: "1.5em"
    }}>
      {displayedText}
    </pre>
  );
}


  const css = `
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Poppins',sans-serif;}
  body{margin:0;background:#fff0fb;}
  .appWrap{
    min-height:100vh;
    position:relative;
    overflow:hidden;
    background: radial-gradient(circle at top left, #ffdde1, #ee9ca7, #ff6a88);
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .container{width:90%;max-width:800px;position:relative;z-index:10;text-align:center;}
  .card{
    background:rgba(255,255,255,0.18);
    backdrop-filter:blur(16px);
    border-radius:20px;
    padding:20px;
    box-shadow:0 25px 80px rgba(255,100,160,0.2);
    animation:fadeIn 0.8s;
  }
  .title{font-size:36px;font-weight:800;color:#ff1a75;margin-bottom:12px;text-shadow:0 0 10px #ff80bf;}
  .subtitle{font-size:16px;color:#6b3a57;margin-bottom:20px;}
  .unlockHeart{font-size:80px;cursor:pointer;animation:pulse 1.2s infinite;text-shadow:0 0 15px #ff80bf;}
  @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
  .pwdInput{padding:14px 18px;border-radius:12px;border:1px solid #ff80bf;width:220px;text-align:center;box-shadow:0 4px 12px rgba(255,0,128,0.2);}
  .shake{animation:shakeX 0.6s;}
  @keyframes shakeX{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-6px)}40%,60%{transform:translateX(6px)}}
  .timeline{display:flex;flex-direction:column;gap:14px;margin-top:12px;}
  .moment{background:linear-gradient(90deg,#fff0fb,#ffe6f7);padding:14px;border-radius:12px;cursor:pointer;transition:0.3s;box-shadow:0 10px 30px rgba(255,0,128,0.1);}
  .moment:hover{transform:translateY(-6px);box-shadow:0 20px 40px rgba(255,0,128,0.2);}
  .momentTitle{font-weight:700;color:#ff1a75;}
  .momentSub{font-size:13px;color:#6b3a57;}
  .slideshow{margin-top:20px;position:relative;}
  .slideImg{width:100%;height:350px;object-fit:cover;border-radius:16px;opacity:0;transform:scale(0.98);transition:all .7s;}
  .slideImg.active{opacity:1;transform:scale(1);}
  .options{display:flex;flex-direction:column;gap:10px;margin-top:14px;}
  .optBtn{
    padding:10px 14px;
    border-radius:12px;
    border:none;
    background:linear-gradient(135deg,#ff6a88,#ffb6c1);
    color:white;
    font-weight:700;
    cursor:pointer;
    transition:0.3s;
    box-shadow:0 6px 20px rgba(255,50,120,0.3);
  }
  .optBtn:hover{transform:scale(1.05);box-shadow:0 8px 30px rgba(255,50,120,0.5);}
  .burstLayer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1200;}
  .burstHeart{font-size:26px;animation:pop 900ms forwards ease-out;position:absolute;text-shadow:0 0 10px #ff80bf;}
  @keyframes pop{0%{transform:scale(1);opacity:1}100%{transform:translateY(-200px) scale(.2);opacity:0}}
  .fullReveal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at top left, #ffdde1, #ee9ca7, #ff6a88);z-index:1500;}
  .finalRevealBox{background:white;padding:28px;border-radius:20px;box-shadow:0 30px 80px rgba(255,0,128,0.15);text-align:center;max-width:800px;}
  .glitterHeart{position:absolute;animation:floatUp linear forwards;text-shadow:0 0 12px #ff80bf,0 0 20px #ff3380;}
  @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-700px) scale(0.3)}}
  @keyframes fadeIn{0%{opacity:0}100%{opacity:1}}
`;



 useEffect(() => {
  if (!document) return; // check if document exists
  const tag = document.createElement("style");
  tag.innerHTML = css;
  document.head.appendChild(tag);

  return () => {
    document.head.removeChild(tag); // remove only the tag
  };
}, []);


  return (
    <div className="appWrap">
      {/* Glitter hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="glitterHeart"
          style={{
            left: `${h.left}%`,
            width: h.size + "px",
            height: h.size + "px",
            animationDuration: h.duration + "ms",
          }}
          
        >
          💖
        </div>
      ))}

    <audio
    ref={bgMusicRef}
    src="/audio/bg song.mp3"
    loop
  />

      <div className="container">

        {/* ===== PAGE 1: Unlock ===== */}
{page === 1 && (
  <div
    style={{
      position: "relative",
      minHeight: "500px",
      background: "linear-gradient(135deg,#ffe6f7,#ffd1eb)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      padding: "30px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 20px 60px rgba(255,100,150,0.1)",
    }}
      >
    {/* Title */}
    <div
      style={{
        fontSize: "36px",
        fontWeight: 800,
        color: "#c72b7e",
        marginBottom: "40px",
        textAlign: "center",
        zIndex: 2,
      }}
    >
      Unlock Your Gift 💖
    </div>

  
    {/* Girl - left side */}
    <img
      src="/image/428036-PE28U2-745-removebg-preview.png"
      alt="girl"
      style={{
        position: "absolute",
        top: "40%",
        left: toggleOn ? "50%" : "5%",
        transform: toggleOn ? "translate(-50%, -50%)" : "translateY(-50%)",
        width: "250px",
        transition: "all 1.5s ease-in-out",
        zIndex: 2,
      }}
    />

    {/* Boy - right side */}
    <img
      src="/image/girl.png"
      alt="boy"
      style={{
        position: "absolute",
        top: "40%",
        right: toggleOn ? "50%" : "5%",
        transform: toggleOn ? "translate(50%, -50%)" : "translateY(-50%)",
        width: "250px",
        transition: "all 1.5s ease-in-out",
        zIndex: 2,
      }}
    />

    {/* Password Input */}
    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        padding: "12px 18px",
        borderRadius: "12px",
        border: "1px solid #d890b3",
        width: "220px",
        textAlign: "center",
        marginTop: "300px",
        marginBottom: "12px",
        zIndex: 2,
      }}
      onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
    />

    {/* Unlock Button */}
    <button
      onClick={tryUnlock}
      style={{
        padding: "12px 20px",
        borderRadius: "12px",
        border: "none",
        background: "#c72b7e",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        zIndex: 2,
        boxShadow: "0 6px 20px rgba(199,43,126,0.4)",
      }}
    >
      Unlock 💖
    </button>
  </div>
)}


        {/* ===== PAGE 2: Birthday ===== */}
        {/* ===== PAGE 2: Birthday with Cake ===== */}
{page === 2 && (
  <div
    style={{
      position: "relative",
      minHeight: "400px",
      background: "linear-gradient(135deg,#ffe6f7,#fff0fb)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      padding: "30px",
      width: "80%", // smaller width
      margin: "0 auto",
      boxShadow: "0 20px 60px rgba(255,100,150,0.1)",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: "36px",
        fontWeight: 800,
        color: "#c72b7e",
        marginBottom: "20px",
      }}
    >
      🎉 Happy Birthday! 🎉<br></br><br></br>

           VMK
    </div>

    {/* Cake image with simple animation */}
    <img
      src="/image/cake (1).png" // replace with your cake image path
      alt="cake"
      style={{
        width: "180px",
        marginBottom: "20px",
        animation: "float 2s ease-in-out infinite alternate",
      }}
    />

    {/* Next Button */}
    <button
      onClick={() => setPage(3)}
      style={{
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        background: "#c72b7e",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(199,43,126,0.4)",
      }}
    >
      Next ➜
    </button>

    {/* Inline animation keyframes */}
    <style>
      {`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }
      `}
    </style>
  </div>
)}


        {/* ===== PAGE 3: Moments ===== */}
        {page === 3 && (
          <div className="card">
            <div className="title">💞 Our Moments</div>
            <div className="timeline">
              <div className="moment" onClick={() => playVideo(videos.talk)}>
                <div className="momentTitle">First time we talked 💕</div>
                <div className="momentSub">Click to play</div>
              </div>
              <div className="moment" onClick={() => playVideo(videos.smile)}>
                <div className="momentTitle">First time you smiled 😊</div>
                <div className="momentSub">Click to play</div>
              </div>
              <div className="moment" onClick={() => playVideo(videos.happy)}>
                <div className="momentTitle">You make my heart happy every day</div>
                <div className="momentSub">Click to play</div>
              </div>
            </div>
            <button className="btnPrimary" style={{ marginTop: 14 }} onClick={() => setPage(4)}>Voice of Love ➜</button>
          </div>
        )}

        {/* ===== PAGE 4: Voice ===== */}
        {page === 4 && (
  <div
    className="card"
    style={{
      background: "url('/image/bg.png') center/cover no-repeat",
      position: "relative",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 20px 60px rgba(255,100,150,0.1)",
      color: "#fff",
      textShadow: "0 0 12px #ff80bf",
    }}
  >
    <div className="title">🎧 Voice of Love</div>
    <button className="btnPrimary" onClick={toggleVoice}>
      {voicePlaying ? "Pause ❤️" : "Play my heart ❤️"}
    </button>
    <audio 
      ref={voiceRef} 
      src="/audio/WhatsApp Audio 2025-12-11 at 12.33.24 PM.mp4" 
      onEnded={onVoiceEnded}
    />
  </div>
)}


        {/* ===== PAGE 5: Slideshow ===== */}
        {/* ===== PAGE 5: Photo Carousel ===== */}
{/* ===== PAGE 5: Photo Carousel with Quotes ===== */}
{page === 5 && (
  <div
    style={{
      position: "relative",
      minHeight: "500px",
      background: "linear-gradient(135deg,#ffe6f7,#fff0fb)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      padding: "30px",
      width: "85%",
      margin: "0 auto",
      boxShadow: "0 20px 60px rgba(255,100,150,0.1)",
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: "32px",
        fontWeight: 800,
        color: "#c72b7e",
        marginBottom: "20px",
      }}
    >
     Love u baby
    </div>

    {/* Carousel Slide */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "350px",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >
      {photos
        .filter((p) => p)
        .map((p, i) => (
          <img
            key={i}
            src={p}
            alt={`slide ${i}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: i === slideIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
    </div>

    {/* Quote below image */}
    <div
      style={{
        marginTop: "14px",
        fontSize: "18px",
        fontStyle: "italic",
        color: "#6b3a57",
        minHeight: "50px",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {quotes[slideIndex]}
    </div>

    {/* Slide Indicators */}
    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
      {photos.map(
        (p, i) =>
          p && (
            <div
              key={i}
              style={{
                width: i === slideIndex ? "14px" : "10px",
                height: i === slideIndex ? "14px" : "10px",
                borderRadius: "50%",
                background: i === slideIndex ? "#c72b7e" : "#d890b3",
                transition: "0.3s",
              }}
            />
          )
      )}
    </div>

    {/* Next Button */}
    <button
      onClick={() => setPage(6)}
      style={{
        marginTop: "22px",
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        background: "#c72b7e",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(199,43,126,0.4)",
      }}
    >
      Next: Love Quiz ➜
    </button>
  </div>
)}


        {/* ===== PAGE 6: Quiz & Letter ===== */}
       {/* ===== PAGE 6: Multi Question Quiz ===== */}
{/* ===== PAGE 6: Quiz ===== */}
{page === 6 && (
  <div className="card">
    <div className="title">💘 Mini Quiz</div>

    <div className="subtitle">
      {quizQuestions[currentQuestion].question}
    </div>

    <div className="options">
      {quizQuestions[currentQuestion].options.map((opt) => (
        <button
          key={opt.key}
          className="optBtn"
          onClick={() => answerQuiz(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>

    {quizMsg && (
      <div style={{ marginTop: "20px", fontSize: "20px", color: "#c72b7e" }}>
        {quizMsg}
      </div>
    )}
  </div>
)}



        {/* ===== FINAL PAGE: Full Reveal ===== */}
        {/* ===== FINAL PAGE: Full Reveal ===== */}
{/* ===== FINAL PAGE: Full Reveal ===== */}
{page === 7 && (
  <div
    style={{
      width: "80%",
      margin: "50px auto",
      textAlign: "center",
      padding: 30,
      background: "linear-gradient(180deg, #fff0f5, #ffccd5)",
      borderRadius: 20,
      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
    }}
  >
    <h2
      style={{
        color: "#ff4d6d",
        textShadow: "0 2px 8px #ffe066",
        fontSize: 32,
        marginBottom: 20,
      }}
      className="bounce"
    >
      💖 A Special Message 💖
    </h2>

    <p
      style={{
        fontSize: 20,
        color: "#6b0000",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        minHeight: "80px",
      }}
    >
      {typed}
      <span style={{ opacity: typed.length < fullMessage.length ? 1 : 0 }}>|</span>
    </p>

    <button
      style={{
        marginTop: 30,
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        background: "#c72b7e",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(199,43,126,0.4)",
      }}
      onClick={() => setPage(2)}
    >
      Back to Start
    </button>

    <style>{`
      .bounce { animation: bounce 1.5s infinite; }
      @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
    `}</style>
  </div>
)}

      </div>
    </div>
  );
}



const About = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      <div
        className="absolute"
        style={{
          width: "100px",
          height: "150px",
          top: "25%",
          left: "calc(50% - 50px)",
          transformStyle: "preserve-3d",
          animation: "rotate 20s linear infinite",
          perspective: "1000px",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="absolute border-2 rounded-lg overflow-hidden"
            style={{
              borderColor: `rgb(${142 + index * 10}, ${252 - index * 10}, 200)`,
              transform: `rotateY(calc((360deg / 10) * ${index})) translateZ(200px)`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, rgba(${142 + index * 10}, ${252 - index * 10}, 200, 0.2) 0%, rgba(${142 + index * 10}, ${252 - index * 10}, 200, 0.9) 100%)`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes rotate {
            from {
              transform: perspective(1000px) rotateX(-15deg) rotateY(0);
            }
            to {
              transform: perspective(1000px) rotateX(-15deg) rotateY(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;

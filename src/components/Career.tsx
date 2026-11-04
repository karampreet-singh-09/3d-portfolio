import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Educational Background <span>&</span>
          <br /> Courses
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BACHELOR OF TECHNOLOGY</h4>
                <h5>NIET, Greater Noida</h5>
              </div>
              <h3>2024-NOW</h3>
            </div>
            <p>
              Bachelor of Technology in Artificial Intelligence and Machine Learning (2024-2028). Noida Institute of Engineering and Technology.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>12th Grade</h4>
                <h5>Red Rose Senior Secondary School</h5>
              </div>
              <h3>2021–2023</h3>
            </div>
            <p>
              Physics, Chemistry, Mathematics, Informatics Practices, English. Central Board of Secondary Education (CBSE), Lucknow.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>10th Grade</h4>
                <h5>Cambridge School</h5>
              </div>
              <h3>2020–2021</h3>
            </div>
            <p>
              10th with Standard Mathematics. Central Board of Secondary Education (CBSE), Lucknow.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>CodSoft</h5>
              </div>
              <h3>INTERNSHIP</h3>
            </div>
            <p>
              This opportunity marks a significant step in my journey of learning and growing in the tech industry. At CodSoft, I'll be working on web development and I'm looking forward to applying my skills in real-world projects while gaining valuable industry experience.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sigma Batch</h4>
                <h5>Apna College</h5>
              </div>
              <h3>COURSE</h3>
            </div>
            <p>
              Successfully completed the Sigma Batch at Apna College, an immersive 8.5-month program that combined Data Structures & Algorithms (4 months in Java) with comprehensive MERN stack web development (4.5 months). Experienced hands-on projects and industry professional training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

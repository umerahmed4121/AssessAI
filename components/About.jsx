import React from 'react'

const About = () => {
  return (
    <section className='mt-[25vh]'>
        <h2 className='heading_2'>About</h2>
        <p className='paragraph'>Welcome to AssessAI, your go-to platform for cutting-edge automated answer script assessment. We understand the challenges in grading and evaluating responses in educational settings, and AssessAI is here to transform the way you assess, saving time and ensuring accuracy.</p>
        <h3 className='heading_3'>Key Features</h3>
        <ul className='px-6 mt-6 font-normal list-disc'>
            <li>Efficiency: Say goodbye to manual grading. Our automated system swiftly evaluates answer scripts, providing quick and accurate results.</li>
            <li>Accuracy: Harness the power of AI to eliminate human bias, ensuring fair and consistent evaluations every time.</li>
            <li>Customization: Tailor assessments to your curriculum and criteria, ensuring a personalized and effective evaluation process.</li>
            <li>Insightful Analytics: Gain valuable insights into student performance with detailed analytics and reports, helping you make informed decisions for the future.</li>
        </ul>
        <h3 className='heading_3'>Why Choose AssessAI?</h3>
        <p className='paragraph'>AssessAI is not just a platform; it&#39s a revolution in education assessment. Whether you are an educator, institution, or organization, our platform adapts to your needs, streamlining the assessment process and enhancing the overall learning experience.</p>
        <h4 className='heading_4'>For Educators:</h4>
        <p className='paragraph ml-4'>Empower your teaching with AssessAI. Focus more on inspiring and guiding your students, while we handle the assessment workload.</p>
        <h4 className='heading_4'>For Institutions:</h4>
        <p className='paragraph ml-4'>Elevate the standards of your assessments, ensuring fair evaluations and efficient management of academic data.</p>
        <h4 className='heading_4'>For Organizations:</h4>
        <p className='paragraph ml-4'>Make informed decisions about employee training and development with our reliable assessment platform.</p>
    </section>
  )
}

export default About
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
    if (name === 'surveyTopic') {
      fetchAdditionalQuestions(value);
    } else if (name.startsWith('answer_')) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: value,
      }));
    }
  };

  const fetchAdditionalQuestions = async (topic) => {
    setLoading(true);
    try {
      let apiUrl = '';
      if (topic === 'Technology') {
        apiUrl = 'https://opentdb.com/api.php?amount=2&category=18&type=multiple';
      } else if (topic === 'Health') {
        apiUrl = 'https://opentdb.com/api.php?amount=2&category=23&type=multiple';
      } else if (topic === 'Education') {
        apiUrl = 'https://opentdb.com/api.php?amount=2&category=21&type=multiple';
      }

      const res = await axios.get(apiUrl);
      setAdditionalQuestions(res.data.results.map((result) => ({
        question: result.question,
        options: [result.correct_answer, ...result.incorrect_answers],
      })));
    } catch (error) {     
      toast.error('Failed to fetch additional questions. Please try again later.', {
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.surveyTopic || !formData.feedback) {
      toast.error('Please fill in all required fields.', {
        position: "top-right",
      });
      return;
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address.', {
        position: "top-right",
      });
      return;
    }
    
    onOpen()   
  };
 
  return (
    <div className="container mx-auto mt-8 mb-10">
      <h1 className="text-2xl font-bold text-center mb-4">Survey Form</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto border-2 border-[#0a84ab] p-1">
        <div className="mb-4">
          <label className="block font-medium text-sm">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"      
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"  
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm">Survey Topic</label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"      
          >
            <option value="">Select survey topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {formData.surveyTopic === 'Technology' && (
          <>
            <div className="mb-4">
              <label className="block font-medium text-sm">Favorite Programming Language</label>
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              >
                <option value="">Select language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-sm">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              />
            </div>
          </>
        )}

        {formData.surveyTopic === 'Health' && (
          <>
            <div className="mb-4">
              <label className="block font-medium text-sm">Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-sm">Diet Preference</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              >
                <option value="">Select preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </>
        )}

        {formData.surveyTopic === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block font-medium text-sm">Highest Qualification</label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-sm">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"
              />
            </div>
          </>
        )}

        {loading ? (
          <div className="flex items-center justify-center mb-4">
            <ClipLoader size={35} color="#3B82F6" loading={loading} />
          </div>
        ) : (
          additionalQuestions.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Additional Questions</h2>
              {additionalQuestions.map((question, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-sm">Q{index+1})  {question.question}</h3>
                  <div className='mt-2'>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="mb-2">
                        <input
                          type="radio"
                          id={`option_${index}_${optionIndex}`}
                          name={`answer_${index}`}
                          value={option}
                          onChange={handleChange}
                          className="mr-2"                         
                        />
                        <label htmlFor={`option_${index}_${optionIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        <div className="mb-4">
          <label className="block font-medium text-sm">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-3/4 text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm mt-2"       
          />
        </div>

        <div className='w-full flex justify-center items-center'>
        <button
          type="submit"
          className="text-[#0a84ab] flex justify-center items-center border-2 rounded-lg transition-all duration-200 border-[#0a84ab] font-semibold hover:text-white hover:bg-[#0a84ab] w-[6rem] h-[3rem]"        
        >
          Submit
        </button>
        </div>
      </form>

      <ToastContainer />

      <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={undefined}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Submitted Details
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>           
                <p className="mb-4">
                  <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="mb-4">
                  <strong>Survey Topic:</strong> {formData.surveyTopic}
                </p>
                {formData.surveyTopic === 'Technology' && (
                  <>
                    <p className="mb-4">
                      <strong>Favorite Programming Language:</strong>{' '}
                      {formData.favoriteProgrammingLanguage}
                    </p>
                    <p className="mb-4">
                      <strong>Years of Experience:</strong>{' '}
                      {formData.yearsOfExperience}
                    </p>
                  </>
                )}
                {formData.surveyTopic === 'Health' && (
                  <>
                    <p className="mb-4">
                      <strong>Exercise Frequency:</strong>{' '}
                      {formData.exerciseFrequency}
                    </p>
                    <p className="mb-4">
                      <strong>Diet Preference:</strong>{' '}
                      {formData.dietPreference}
                    </p>
                  </>
                )}
                {formData.surveyTopic === 'Education' && (
                  <>
                    <p className="mb-4">
                      <strong>Highest Qualification:</strong>{' '}
                      {formData.highestQualification}
                    </p>
                    <p className="mb-4">
                      <strong>Field of Study:</strong> {formData.fieldOfStudy}
                    </p>
                  </>
                )}
                <p className="mb-4">
                  <strong>Feedback:</strong> {formData.feedback}
                </p>
                {additionalQuestions.map((question, index) => (
                  <p key={index} className="mb-4">
                    <strong>Question {index + 1}:</strong> {question.question}
                    <br />
                    <strong>Answer:</strong> {selectedAnswers[`answer_${index}`]}
                  </p>
                ))}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onClose} colorScheme="gray">
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

    </div>
  );
}

export default App;

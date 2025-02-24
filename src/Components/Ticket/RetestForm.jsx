import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropType from "prop-types";
const tester = [
    {
        id: 1,
        name: "tester 1"
        
    },
    {
        id: 2,
        name: "tester 2"
        
    }
]
const RetestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    developer: "",
    addremarks: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Show toast notification on successful submission
  const notify = () => {
    toast.success("Ticket submitted successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.developer) newErrors.developer = "Please select a developer.";
    if (!formData.addremarks) newErrors.addremarks = "Bug details are required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save dummy data for API readiness
    console.log("Form Data Submitted: ", formData);
    notify(); // Trigger success toast

    setTimeout(onClose, 1000); // Close the form after success
  };

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-5">Send For Retest</h2>
          <div className="w-full bg-[#c2c3c3] text-left mb-6 ">
              <h1 className="pt-3 pl-3 text-sm font-[600]">Ticket Number :<span className="font-[400] pl-1">TK00001</span></h1>
              <h1 className="pt-3 pl-3 pb-3 text-sm font-[600]">Project Name :<span className="font-[400] pl-1">Project 1</span></h1>
           </div>
          
      {/* Project Selection */}
      <label className="block mb-2 text-sm font-[400] ">
        Tester <span className="text-red-600">*</span>
      </label>
      <select
        name="developer"
        value={formData.developer}
        onChange={handleChange}
        className={`" border border-gray-400 w-full p-2  rounded-md ${

            errors.developer ? " mb-1 " : " mb-5 "
  
          }"`}
      >
                  <option value="">Select Tester</option>
                  {
                      tester.map((tester)=> {
                          return (
                              <option key={tester.id}>{tester.name}</option>
                          )
                      })
                    
                  }
      </select>
      {errors.developer && <p className="text-red-500 text-sm mb-2">{errors.developer}</p>}

      {/* Bug Details */}
      <label className="block mb-2 text-sm font-[400] ">
        Add Remark 
      </label>
      <textarea
        name="addremarks"
        value={formData.addremarks}
        onChange={handleChange}
        className={`" border border-gray-400 w-full p-2  rounded-md ${

            errors.addremark? " mb-5 " : " mb-0 "
  
          }"`}
        placeholder="Describe the bug..."
        rows="3"
      ></textarea>
      {errors.addremarks && <p className="text-red-500 text-sm mb-2">{errors.addremarks}</p>}

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-8 mt-4 mb-7">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
        >
          Save
        </button>
              </div>
         
    </div>
  );
};

RetestForm.propTypes = {
    onClose: PropType.func.isRequired
}
export default RetestForm;

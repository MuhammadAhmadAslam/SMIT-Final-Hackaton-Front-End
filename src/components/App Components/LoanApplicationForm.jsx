// import { useState } from "react"
// import { useForm, useFieldArray } from "react-hook-form"   
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// // Custom validation function
// const validateField = (value, rules) => {
//   if (rules.required && !value) {
//     return rules.message || "This field is required."
//   }
//   if (rules.minLength && value.length < rules.minLength) {
//     return rules.message || `Minimum length is ${rules.minLength} characters.`
//   }
//   if (rules.isNumber && isNaN(value)) {
//     return rules.message || "This field must be a number."
//   }
//   if (rules.isEmail && !/\S+@\S+\.\S+/.test(value)) {
//     return rules.message || "Invalid email address."
//   }
//   return null
// }

// export function LoanApplicationForm() {
//   const [step, setStep] = useState(1)
//   const [errors, setErrors] = useState({}) // For custom validation errors

//   const form = useForm({
//     defaultValues: {
//       category: "",
//       subcategory: "",
//       initialDeposit: "",
//       loanAmount: "",
//       loanPeriod: "",
//       guarantors: [
//         { name: "", phone: "", address: "", city: "", country: "" },
//         { name: "", phone: "", address: "", city: "", country: "" },
//       ],
//       email: "",
//       CNIC: "",
//       name: "",
//       phone: "",
//       address: "",
//       city: "",
//       country: "",
//     },
//   })

//   const { fields, append, remove } = useFieldArray({
//     name: "guarantors",
//     control: form.control,
//   })

//   function validateForm(data) {
//     const newErrors = {}

//     // Step 1: Loan Details Validation
//     if (step === 1) {
//       if (!data.category) newErrors.category = "Category is required."
//       if (!data.subcategory) newErrors.subcategory = "Subcategory is required."
//       if (!data.initialDeposit || isNaN(data.initialDeposit)) newErrors.initialDeposit = "Initial deposit must be a valid number."
//       if (!data.loanAmount || data.loanAmount < 1000) newErrors.loanAmount = "Loan amount must be at least 1000."
//       if (!data.loanPeriod || data.loanPeriod < 1) newErrors.loanPeriod = "Loan period must be at least 1 month."
//     }

//     // Step 2: Guarantors Validation
//     if (step === 2) {
//       data.guarantors.forEach((guarantor, index) => {
//         if (!guarantor.name) newErrors[`guarantors.${index}.name`] = `Guarantor ${index + 1}: Name is required.`
//         if (!guarantor.phone || guarantor.phone.length < 10)
//           newErrors[`guarantors.${index}.phone`] = `Guarantor ${index + 1}: Valid phone number is required.`
//         if (!guarantor.address) newErrors[`guarantors.${index}.address`] = `Guarantor ${index + 1}: Address is required.`
//         if (!guarantor.city) newErrors[`guarantors.${index}.city`] = `Guarantor ${index + 1}: City is required.`
//         if (!guarantor.country) newErrors[`guarantors.${index}.country`] = `Guarantor ${index + 1}: Country is required.`
//       })
//     }

//     // Step 3: Personal Information Validation
//     if (step === 3) {
//       if (!data.name) newErrors.name = "Name is required."
//       if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "A valid email address is required."
//       if (!data.CNIC || data.CNIC.length < 13) newErrors.CNIC = "CNIC must be at least 13 characters."
//       if (!data.phone || data.phone.length < 10) newErrors.phone = "Valid phone number is required."
//       if (!data.address) newErrors.address = "Address is required."
//       if (!data.city) newErrors.city = "City is required."
//       if (!data.country) newErrors.country = "Country is required."
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0 // Return true if no errors
//   }

//   function onSubmit(data) {
//     if (validateForm(data)) {
//       console.log("Form submitted:", data)
//       // Here you would typically send the form data to your backend
//     }
//   }

//   const nextStep = () => {
//     if (validateForm(form.getValues())) {
//       setStep(step + 1)
//     }
//   }

//   const prevStep = () => {
//     setStep(step - 1)
//   }

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//       {step === 1 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Loan Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Category */}
//             <div>
//               <label>Category</label>
//               <Select onValueChange={(value) => form.setValue("category", value)} defaultValue={form.getValues("category")}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="business">Business Loan</SelectItem>
//                   <SelectItem value="personal">Personal Loan</SelectItem>
//                   <SelectItem value="education">Education Loan</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.category && <p className="text-red-500">{errors.category}</p>}
//             </div>

//             {/* Subcategory */}
//             <div>
//               <label>Subcategory</label>
//               <Select onValueChange={(value) => form.setValue("subcategory", value)} defaultValue={form.getValues("subcategory")}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select subcategory" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="startup">Startup</SelectItem>
//                   <SelectItem value="expansion">Business Expansion</SelectItem>
//                   <SelectItem value="equipment">Equipment Purchase</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.subcategory && <p className="text-red-500">{errors.subcategory}</p>}
//             </div>

//             {/* Initial Deposit */}
//             <div>
//               <label>Initial Deposit</label>
//               <Input
//                 type="number"
//                 {...form.register("initialDeposit")}
//                 onChange={(e) => form.setValue("initialDeposit", e.target.value)}
//               />
//               {errors.initialDeposit && <p className="text-red-500">{errors.initialDeposit}</p>}
//             </div>

//             {/* Loan Amount */}
//             <div>
//               <label>Loan Amount</label>
//               <Input
//                 type="number"
//                 {...form.register("loanAmount")}
//                 onChange={(e) => form.setValue("loanAmount", e.target.value)}
//               />
//               {errors.loanAmount && <p className="text-red-500">{errors.loanAmount}</p>}
//             </div>

//             {/* Loan Period */}
//             <div>
//               <label>Loan Period (Months)</label>
//               <Input
//                 type="number"
//                 {...form.register("loanPeriod")}
//                 onChange={(e) => form.setValue("loanPeriod", e.target.value)}
//               />
//               {errors.loanPeriod && <p className="text-red-500">{errors.loanPeriod}</p>}
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="button" onClick={nextStep}>
//               Next
//             </Button>
//           </CardFooter>
//         </Card>
//       )}

//       {/* Other Steps */}
//       {/* Repeat similar validation for Step 2 and Step 3 */}

//       {step === 3 && (
//         <CardFooter className="flex justify-between">
//           <Button type="button" onClick={prevStep}>
//             Previous
//           </Button>
//           <Button type="submit">Submit</Button>
//         </CardFooter>
//       )}
//     </form>
//   )
// }




import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"

export function LoanApplicationForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        category: "",
        subcategory: "",
        initialDeposit: "",
        loanAmount: "",
        loanPeriod: "",
        guarantors: [
            { name: "", phone: "", address: "", city: "", country: "" },
            { name: "", phone: "", address: "", city: "", country: "" },
        ],
        email: "",
        CNIC: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
    })

    const [errors, setErrors] = useState({}) // For custom validation errors

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleGuarantorChange = (index, field, value) => {
        const updatedGuarantors = [...formData.guarantors]
        updatedGuarantors[index][field] = value
        setFormData((prev) => ({ ...prev, guarantors: updatedGuarantors }))
    }

    const validateForm = () => {
        const newErrors = {}

        // Step 1: Loan Details Validation
        if (step === 1) {
            if (!formData.category) newErrors.category = "Category is required."
            if (!formData.subcategory) newErrors.subcategory = "Subcategory is required."
            if (!formData.initialDeposit || isNaN(formData.initialDeposit))
                newErrors.initialDeposit = "Initial deposit must be a valid number."
            if (!formData.loanAmount || formData.loanAmount < 1000)
                newErrors.loanAmount = "Loan amount must be at least 1000."
            if (!formData.loanPeriod || formData.loanPeriod < 1)
                newErrors.loanPeriod = "Loan period must be at least 1 month."
        }

        // Step 2: Guarantors Validation
        if (step === 2) {
            formData.guarantors.forEach((guarantor, index) => {
                if (!guarantor.name) newErrors[`guarantors.${index}.name`] = `Guarantor ${index + 1}: Name is required.`
                if (!guarantor.phone || guarantor.phone.length < 10)
                    newErrors[`guarantors.${index}.phone`] = `Guarantor ${index + 1}: Valid phone number is required.`
                if (!guarantor.address) newErrors[`guarantors.${index}.address`] = `Guarantor ${index + 1}: Address is required.`
                if (!guarantor.city) newErrors[`guarantors.${index}.city`] = `Guarantor ${index + 1}: City is required.`
                if (!guarantor.country) newErrors[`guarantors.${index}.country`] = `Guarantor ${index + 1}: Country is required.`
            })
        }

        // Step 3: Personal Information Validation
        if (step === 3) {
            if (!formData.name) newErrors.name = "Name is required."
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
                newErrors.email = "A valid email address is required."
            if (!formData.CNIC || formData.CNIC.length < 13)
                newErrors.CNIC = "CNIC must be at least 13 characters."
            if (!formData.phone || formData.phone.length < 10)
                newErrors.phone = "Valid phone number is required."
            if (!formData.address) newErrors.address = "Address is required."
            if (!formData.city) newErrors.city = "City is required."
            if (!formData.country) newErrors.country = "Country is required."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 // Return true if no errors
    }

    const nextStep = () => {
        if (validateForm()) {
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log("Form submitted:", formData)
            let sendingData = await axios.post("http://localhost:4000/api/loan/applyLoan", formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Category */}
                        <div>
                            <label>Category</label>
                            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="business">Business Loan</SelectItem>
                                    <SelectItem value="personal">Personal Loan</SelectItem>
                                    <SelectItem value="education">Education Loan</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-red-500">{errors.category}</p>}
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label>Subcategory</label>
                            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, subcategory: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="startup">Startup</SelectItem>
                                    <SelectItem value="expansion">Business Expansion</SelectItem>
                                    <SelectItem value="equipment">Equipment Purchase</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.subcategory && <p className="text-red-500">{errors.subcategory}</p>}
                        </div>

                        {/* Initial Deposit */}
                        <div>
                            <label>Initial Deposit</label>
                            <Input
                                type="number"
                                name="initialDeposit"
                                value={formData.initialDeposit}
                                onChange={handleInputChange}
                            />
                            {errors.initialDeposit && <p className="text-red-500">{errors.initialDeposit}</p>}
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <label>Loan Amount</label>
                            <Input
                                type="number"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                            />
                            {errors.loanAmount && <p className="text-red-500">{errors.loanAmount}</p>}
                        </div>

                        {/* Loan Period */}
                        <div>
                            <label>Loan Period (Months)</label>
                            <Input
                                type="number"
                                name="loanPeriod"
                                value={formData.loanPeriod}
                                onChange={handleInputChange}
                            />
                            {errors.loanPeriod && <p className="text-red-500">{errors.loanPeriod}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="button" onClick={nextStep}>
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            )}
            {step === 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Guarantor Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {formData.guarantors.map((guarantor, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-semibold">Guarantor {index + 1}</h3>

                                {/* Name */}
                                <div>
                                    <label>Name</label>
                                    <Input
                                        type="text"
                                        value={guarantor.name}
                                        onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                                    />
                                    {errors[`guarantors.${index}.name`] && (
                                        <p className="text-red-500">{errors[`guarantors.${index}.name`]}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label>Phone</label>
                                    <Input
                                        type="text"
                                        value={guarantor.phone}
                                        onChange={(e) => handleGuarantorChange(index, "phone", e.target.value)}
                                    />
                                    {errors[`guarantors.${index}.phone`] && (
                                        <p className="text-red-500">{errors[`guarantors.${index}.phone`]}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label>Address</label>
                                    <Input
                                        type="text"
                                        value={guarantor.address}
                                        onChange={(e) => handleGuarantorChange(index, "address", e.target.value)}
                                    />
                                    {errors[`guarantors.${index}.address`] && (
                                        <p className="text-red-500">{errors[`guarantors.${index}.address`]}</p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label>City</label>
                                    <Input
                                        type="text"
                                        value={guarantor.city}
                                        onChange={(e) => handleGuarantorChange(index, "city", e.target.value)}
                                    />
                                    {errors[`guarantors.${index}.city`] && (
                                        <p className="text-red-500">{errors[`guarantors.${index}.city`]}</p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label>Country</label>
                                    <Input
                                        type="text"
                                        value={guarantor.country}
                                        onChange={(e) => handleGuarantorChange(index, "country", e.target.value)}
                                    />
                                    {errors[`guarantors.${index}.country`] && (
                                        <p className="text-red-500">{errors[`guarantors.${index}.country`]}</p>
                                    )}
                                </div>

                                {/* Remove Button */}
                                {index >= 2 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => {
                                            const updatedGuarantors = formData.guarantors.filter((_, i) => i !== index)
                                            setFormData((prev) => ({ ...prev, guarantors: updatedGuarantors }))
                                        }}
                                    >
                                        Remove Guarantor
                                    </Button>
                                )}
                            </div>
                        ))}

                        {/* Add Guarantor Button */}
                        {formData.guarantors.length < 3 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        guarantors: [...prev.guarantors, { name: "", phone: "", address: "", city: "", country: "" }],
                                    }))
                                }
                            >
                                Add Guarantor
                            </Button>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                            Previous
                        </Button>
                        <Button type="button" onClick={nextStep}>
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 3 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label>Full Name</label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label>Email</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>

                        {/* CNIC */}
                        <div>
                            <label>CNIC</label>
                            <Input
                                type="text"
                                name="CNIC"
                                value={formData.CNIC}
                                onChange={handleInputChange}
                            />
                            {errors.CNIC && <p className="text-red-500">{errors.CNIC}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label>Phone</label>
                            <Input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label>Address</label>
                            <Input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <p className="text-red-500">{errors.address}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label>City</label>
                            <Input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            {errors.city && <p className="text-red-500">{errors.city}</p>}
                        </div>

                        {/* Country */}
                        <div>
                            <label>Country</label>
                            <Input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            {errors.country && <p className="text-red-500">{errors.country}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                            Previous
                        </Button>
                        <Button type="submit">Submit Application</Button>
                    </CardFooter>
                </Card>
            )}

            {step === 3 && (
                <CardFooter className="flex justify-between">
                    <Button type="button" onClick={prevStep}>
                        Previous
                    </Button>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            )}
        </form>
    )
}

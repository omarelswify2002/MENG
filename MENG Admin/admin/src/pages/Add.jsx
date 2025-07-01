import React, { useState } from 'react'
import {assets} from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

export default function Add({token}) {
    const [imageCover, setImageCover] = useState(false)
    const [images, setImages] = useState([]) // Changed to array for multiple images
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('Medical')
    const [typecategory, setTypecategory] = useState('Clothes')
    const [subcategory1, setٍSubcategogy1] = useState('Select a subcategory')
    const [subcategory2, setٍSubcategogy2] = useState('Select a subcategory details')
    const [sizes, setSizes] = useState([])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        setImages(prev => [...prev, ...files])
    }

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    async function onSubmitHandler(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('quantity', quantity)
            formData.append('category', category)
            formData.append('typecategory', typecategory)
            formData.append('subcategory1', subcategory1)
            formData.append('subcategory2', subcategory2)

            sizes.forEach(size => formData.append('sizes', size))
            images.forEach(img => formData.append('images', img))
            
            imageCover && formData.append('imageCover', imageCover)

            if(!name || !description || !category || !typecategory || 
                !subcategory1 || !price || !quantity || !imageCover || 
                !sizes.length ) {
                toast.error('Please enter all requirements.')
                return
            }

            const response = await axios.post(
                backendUrl + '/api/v1/products',
                formData,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            )
            console.log('response of add product>>>',response);
            if(response){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImageCover(false)
                setImages([])
                setPrice('')
                setQuantity('')
                setSizes([])
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <form className='flex flex-col w-full items-start gap-3'>
            <div>
                <div className='flex flex-col gap-3'>
                    {/* Cover Image */}
                    <div className='flex flex-col gap-1'>
                        <p className='mb-1'>Cover Image</p>
                        <label className='cursor-pointer' htmlFor='imageCover'>
                            <img className='w-20' src={!imageCover ? assets.upload_area : URL.createObjectURL(imageCover)} alt="" />
                            <input onChange={(e)=>setImageCover(e.target.files[0])} required type="file" id='imageCover' hidden/>
                        </label>
                    </div>
                    
                    {/* Product Images */}
                    <div className='flex flex-col gap-1'>
                        <p className='mb-1'>Upload Images</p>
                        <div className='flex flex-wrap gap-2'>
                            {/* Display uploaded images */}
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img 
                                        className='w-20 h-20 object-cover' 
                                        src={URL.createObjectURL(img)} 
                                        alt={`Preview ${index}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() => removeImage(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            
                            {/* Upload button */}
                            <label className='cursor-pointer' htmlFor='images'>
                                <img className='w-20' src={assets.upload_area} alt="" />
                                <input 
                                    onChange={handleImageUpload}
                                    type="file" 
                                    id='images' 
                                    multiple
                                    hidden
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of your form remains the same */}
            <div className='w-full'>
                <p className='mb-2'>Product Name:</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} required type="text" className='w-full max-w-[500px] px-3 py-2'  placeholder='Type here' />
            </div>
            
            <div className='w-full'>
                <p className='mb-2'>Product Description:</p>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} required type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' />
            </div>
            {/* <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>  
                <div>
                    <p className='mb-2'>Product Category:</p>
                    <select onChange={(e)=>setCategory(e.target.value)} required className='w-full px-3 py-2'>
                        <option value="Medical">Medical</option>
                        <option value="Geometric">Geometric</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Type:</p>
                    <select onChange={(e)=>setTypecategory(e.target.value)} required className='w-full px-3 py-2'>
                        <option value={"Clothes"}>Clothes</option>
                        <option value="Tools">Tools</option>
                    </select>
                </div>
                <div>
                {category === 'Medical' && typecategory === 'Clothes'?
                    <div>
                        <p className='mb-2'>Sub Category:</p>
                        <select onChange={(e)=>setٍSubcategogy1(e.target.value)} className='w-full px-3 py-2'>
                            <option className='text-black font-bold'>select a subcategory:</option>
                            <option value={"White coat"}>White coat</option>
                            <option value={"Scrubs"}>Scrubs</option>
                            <option value="Medical shoes">Medical shoes</option>
                            <option value="Masks and gloves">Masks and gloves</option>
                            <option value="Cap">Cap</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Tools'?
                    <div>
                        <p className='mb-2'>Sub Category:</p>
                        <select onChange={(e)=>setٍSubcategogy1(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory:</option>
                            <option value={"Metal and digital"}>Metal and digital</option>
                            <option value={"Plastic and glass"}>Plastic and glass</option>
                            <option value="Sharp">Sharp</option>
                            <option value="Not sharp">Not sharp</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes'?
                    <div>
                        <p className='mb-2'>Sub Category:</p>
                        <select onChange={(e)=>setٍSubcategogy1(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory:</option>
                            <option value={"Overalls"}>Overalls</option>
                            <option value={"Helmet"}>Helmet</option>
                            <option value="glasses">glasses</option>
                            <option value="jackets">jackets</option>
                            <option value="Pants">Pants</option>
                            <option value="safety shoes">safety shoes</option>
                            <option value="gloves">gloves</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Tools'?
                    <div>
                        <p className='mb-2'>Sub Category:</p>
                        <select onChange={(e)=>setٍSubcategogy1(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory:</option>
                            <option value={"Office supplies"}>Office supplies</option>
                            <option value={"Practical supplies"}>Practical supplies</option>
                            <option value="Technical supplies">Technical supplies</option>
                        </select>
                    </div>
                    : null
                }
                </div>

                <div>
                {category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'White coat'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Short Lab Coat"}>Short Lab Coat</option>
                            <option value={"Long Lab Coat"}>Long Lab Coat</option>
                            <option value="Surgical Gown">Surgical Gown</option>
                            <option value="Short sleeve coat">Short sleeve coat</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'Scrubs'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Classic Scrubs"}>Classic Scrubs</option>
                            <option value={"Surgical Scrubs"}>Surgical Scrubs</option>
                            <option value="Long Sleeve Scrubs">Long Sleeve Scrubs</option>
                            <option value="Fluid Resistant Scrubs">Fluid Resistant Scrubs</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'Medical shoes'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Closed Toe Medical Shoes"}>Closed Toe Medical Shoes</option>
                            <option value={"Comfort Clogs"}>Comfort Clogs</option>
                            <option value="Slip Resistant Shoes">Slip Resistant Shoes</option>
                            <option value="Surgical Shoes">Surgical Shoes</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'Masks and gloves'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Surgical Mask"}>Surgical Mask</option>
                            <option value={"N95 Mask"}>N95 Mask</option>
                            <option value="KN95 Mask">KN95 Mask</option>
                            <option value="Cloth Mask">Cloth Mask</option>
                            <option value="Transparent Mas ">Transparent Mask</option>
                            <option value="Latex Gloves">Latex Gloves</option>
                            <option value="Nitrile Gloves">Nitrile Gloves</option>
                            <option value="Non-Sterile Gloves">Non-Sterile Gloves</option>
                            <option value="Sterile Gloves">Sterile Gloves</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'Cap'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value="Bouffant Cap">Bouffant Cap</option>
                            <option value="Surgical Cap">Surgical Cap</option>
                            <option value="Tie-Back Cap">Tie-Back Cap</option>
                            <option value="Reusable Cloth Cap">Reusable Cloth Cap</option>
                            <option value="Non-Slip Cap">Non-Slip Cap</option>
                            <option value="Elastic Band Cap">Elastic Band Cap</option>
                            <option value="Anti-Static Cap">Anti-Static Cap</option>
                            <option value="Full Coverage Cap">Full Coverage Cap</option>
                        </select>
                    </div>

                    :category === 'Medical' && typecategory === 'Tools' && subcategory1 === 'Metal and digital'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value="Reflex hammer">Reflex hammer</option>
                            <option value="Tuning fork">Tuning fork</option>
                            <option value="Stethoscope">Stethoscope</option>
                            <option value="Sphygmomanometer">Sphygmomanometer</option>
                            <option value="Blood pressure monitors">Blood pressure monitors</option>
                            <option value="Diabetic monitors">Diabetic monitors</option>
                            <option value="Oximeter">Oximeter</option>
                            <option value="Sickle probe">Sickle probe</option>
                            <option value="Periodontal probe">Periodontal probe</option>
                            <option value="Mouth mirror">Mouth mirror</option>
                            <option value="Tweezer">Tweezer</option>
                            <option value="Mercurial thermometer">Mercurial thermometer</option>
                            <option value="Digital thermometer">Digital thermometer</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Tools' && subcategory1 === 'Plastic and glass'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value="Flask">Flask</option>
                            <option value="Measure tube">Measure tube</option>
                            <option value="Holder">Holder</option>
                            <option value="Dropper">Dropper</option>
                            <option value="Burette">Burette</option>
                            <option value="Pipette">Pipette</option>
                            <option value="Test tube rack">Test tube rack</option>
                            <option value="Tape measures">Tape measures</option>
                            <option value="Morter">Morter</option>
                            <option value="Goniometer">Goniometer</option>
                            <option value="Beaker">Beaker</option>
                            <option value="Petri dish">Petri dish</option>
                            <option value="Automatic pipette">Automatic pipette</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Tools' && subcategory1 === 'Sharp'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value="Scissors">Scissors</option>
                            <option value="Bone cutters">Bone cutters</option>
                            <option value="Scalpels">Scalpels</option>
                            <option value="Surgical staples">Surgical staples</option>
                            <option value="Dermic needles">Dermic needles</option>
                            <option value="Surgical blades">Surgical blades</option>
                            <option value="Cranial drills">Cranial drills</option>
                            <option value="Mammotome">Mammotome</option>
                            <option value="Syringes">Syringes</option>
                            <option value="Osteotomes">Osteotomes</option>
                            <option value="Dental scaler">Dental scaler</option>
                            <option value="Dental Turbines">Dental Turbines</option>
                            <option value="Dental chisel">Dental chisel</option>
                        </select>
                    </div>
                    :category === 'Medical' && typecategory === 'Tools' && subcategory1 === 'Not sharp'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value="Amalgamator">Amalgamator</option>
                            <option value="Sterilizer">Sterilizer</option>
                            <option value="Light cure device">Light cure device</option>
                            <option value="Saliva ejector">Saliva ejector</option>
                            <option value="Amalgam">Amalgam</option>
                            <option value="Artery forceps">Artery forceps</option>
                            <option value="Surgical suture">Surgical suture</option>
                            <option value="Blades handle">Blades handle</option>
                            <option value="Orthodentic plier">Orthodentic plier</option>
                            <option value="Bracket tweerzers">Bracket tweerzers</option>
                            <option value="Scalpel handle">Scalpel handle</option>
                            <option value="Cupping">Cupping</option>
                            <option value="Massage gun">Massage gun</option>
                        </select>
                    </div>

                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Overalls'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"General safety overalls"}>General safety overalls</option>
                            <option value={"Fire resistant overalls"}>Fire resistant overalls</option>
                            <option value="Anti-static overalls">Anti-static overalls</option>
                            <option value="Chemical resistant overalls">Chemical resistant overalls</option>
                            <option value="Water and dust resistant overalls">Water and dust resistant overalls</option>
                            <option value="Cooling overall">Cooling overall</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Helmet'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Standard Safety Helmet"}>Standard Safety Helmet</option>
                            <option value={"Electrical Safety Helmet"}>Electrical Safety Helmet</option>
                            <option value={"Heat-Resistant Helmet"}>Heat-Resistant Helmet</option>
                            <option value={"Helmet with Face Shield"}>Helmet with Face Shield</option>
                            <option value={"Helmet with Neck Protection"}>Helmet with Neck Protection</option>
                            <option value={"Ventilated Helmet"}>Ventilated Helmet</option>
                            <option value={"Helmet with Ear Protection"}>Helmet with Ear Protection</option>
                            <option value={"Multi-Impact Helmet"}>Multi-Impact Helmet</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Glasses'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Standard Safety Glasses"}>Standard Safety Glasses</option>
                            <option value={"Chemical Splash Goggles"}>Chemical Splash Goggles</option>
                            <option value={"UV Protection Safety Glasses"}>UV Protection Safety Glasses</option>
                            <option value={"Dust Protection Goggles"}>Dust Protection Goggles</option>
                            <option value={"Welding Goggles"}>Welding Goggles</option>
                            <option value={"Electrical Insulated Goggles"}>Electrical Insulated Goggles</option>
                            <option value={"Reflective Safety Glasses"}>Reflective Safety Glasses</option>
                            <option value={"High Impact Safety Goggles"}>High Impact Safety Goggles</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Jackets'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"High-Visibility Safety Vest"}>High-Visibility Safety Vest</option>
                            <option value={"Flame-Resistant Jacket"}>Flame-Resistant Jacket</option>
                            <option value={"Anti-Static Jacket"}>Anti-Static Jacket</option>
                            <option value={"Chemical-Resistant Jacket"}>Chemical-Resistant Jacket</option>
                            <option value={"Heavy-Duty Work Jacket"}>Heavy-Duty Work Jacket</option>
                            <option value={"Waterproof Jacket"}>Waterproof Jacket</option>
                            <option value={"Insulated Cold-Weather Jacket"}>Insulated Cold-Weather Jacket</option>
                            <option value={"Neck and Shoulder Protection Jacket"}>Neck and Shoulder Protection Jacket</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Pants'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Standard Safety Pants"}>Standard Safety Pants</option>
                            <option value={"Flame-Resistant Pants"}>Flame-Resistant Pants</option>
                            <option value={"Anti-Static Pants"}>Anti-Static Pants</option>
                            <option value={"Chemical-Resistant Pants"}>Chemical-Resistant Pants</option>
                            <option value={"Waterproof Pants"}>Waterproof Pants</option>
                            <option value={"High-Visibility Pants"}>High-Visibility Pants</option>
                            <option value={"Insulated Cold-Weather Pants"}>Insulated Cold-Weather Pants</option>
                            <option value={"Knee-Pad Pants"}>Knee-Pad Pants</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'safety shoes'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Steel-Toe Safety Shoes"}>Steel-Toe Safety Shoes</option>
                            <option value={"Slip-Resistant Safety Shoes"}>Slip-Resistant Safety Shoes</option>
                            <option value={"Waterproof Safety Boots"}>Waterproof Safety Boots</option>
                            <option value={"Heat-Resistant Safety Shoes"}>Heat-Resistant Safety Shoes</option>
                            <option value={"Chemical-Resistant Safety Boots"}>Chemical-Resistant Safety Boots</option>
                            <option value={"High-Top Safety Boots"}>High-Top Safety Boots</option>
                            <option value={"Insulated Cold-Weather Safety Boots"}>Insulated Cold-Weather Safety Boots</option>
                            <option value={"Electrical Hazard (EH) Safety Shoes"}>Electrical Hazard (EH) Safety Shoes</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'Gloves'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"General Work Gloves"}>General Work Gloves</option>
                            <option value={"Cut-Resistant Gloves"}>Cut-Resistant Gloves</option>
                            <option value={"Heat-Resistant Gloves"}>Heat-Resistant Gloves</option>
                            <option value={"Chemical-Resistant Gloves"}>Chemical-Resistant Gloves</option>
                            <option value={"Electrical-Insulating Gloves"}>Electrical-Insulating Gloves</option>
                            <option value={"Grip-Enhanced Gloves"}>Grip-Enhanced Gloves</option>
                            <option value={"Cold-Resistant Gloves"}>Cold-Resistant Gloves</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Tools' && subcategory1 === 'Office supplies'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Engineering notebooks"}>Engineering notebooks</option>
                            <option value={"Drawing paper"}>Drawing paper</option>
                            <option value={"Engineering drawing pens"}>Engineering drawing pens</option>
                            <option value={"Engineering ink pens"}>Engineering ink pens</option>
                            <option value={"Paper bags and document folders"}>Paper bags and document folders</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Tools' && subcategory1 === 'Practical supplies'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Measuring tape"}>Measuring tape</option>
                            <option value={"Micrometer and calibre"}>Micrometer and calibre</option>
                            <option value={"Rulers"}>Rulers</option>
                            <option value={"Engineering circles"}>Engineering circles</option>
                            <option value={"Hammers and keys"}>Hammers and keys</option>
                            <option value={"Scissors and cutting tools"}>Scissors and cutting tools</option>
                            <option value={"Hand drills"}>Hand drills</option>
                        </select>
                    </div>
                    :category === 'Geometric' && typecategory === 'Tools' && subcategory1 === 'Technical supplies'?
                    <div>
                        <p className='mb-2'>Sub Category Details:</p>
                        <select onChange={(e)=>setٍSubcategogy2(e.target.value)} className='w-full px-3 py-2'>
                        <option className='text-black font-bold'>select a subcategory details:</option>
                            <option value={"Surveying laser devices"}>Surveying laser devices</option>
                            <option value={"Soldering iron"}>Soldering iron</option>
                            <option value={"Multimeter device"}>Multimeter device</option>
                            <option value={"Oscilloscope"}>Oscilloscope</option>
                            <option value={"Signal generators"}>Signal generators</option>
                            <option value={"Electric drilling rigs"}>Electric drilling rigs</option>
                        </select>
                    </div>
                    : null
                }
                </div>

                <div>
                    <p className='mb-2'>Product Price:</p>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
                </div>

                <div>
                    <p className='mb-2'>Product Quantity:</p>
                    <input onChange={(e)=>setQuantity(e.target.value)} value={quantity} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='1'/>
                </div>
            </div>
            <div>
                <p className='mb-2'>Product Size:</p>
                {category === 'Medical' && typecategory === 'Clothes' && subcategory1 === 'Medical shoes'?
                    //Medical shoes
                    <div className={`flex gap-3`}>
                        <div onClick={()=>setSizes(prev => prev.includes('35') ? prev.filter(item => item !== '35') : [...prev , '35'])}> 
                            <p className={`${sizes.includes('35') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('35') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>35</p>
                        </div>

                        <div onClick={()=>setSizes(prev => prev.includes('36') ? prev.filter(item => item !== '36') : [...prev , '36'])}>
                            <p className={`${sizes.includes('36') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('36') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>36</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('37') ? prev.filter(item => item !== '37') : [...prev , '37'])}>
                            <p className={`${sizes.includes('37') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('37') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>37</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('38') ? prev.filter(item => item !== '38') : [...prev , '38'])}>
                            <p className={`${sizes.includes('38') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('38') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>38</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('39') ? prev.filter(item => item !== '39') : [...prev , '39'])}>
                            <p className={`${sizes.includes('39') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('39') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>39</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('40') ? prev.filter(item => item !== '40') : [...prev , '40'])}>
                            <p className={`${sizes.includes('40') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('40') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>40</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('41') ? prev.filter(item => item !== '41') : [...prev , '41'])}>
                            <p className={`${sizes.includes('41') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('41') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>41</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('42') ? prev.filter(item => item !== '42') : [...prev , '42'])}>
                            <p className={`${sizes.includes('42') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('42') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>42</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('43') ? prev.filter(item => item !== '43') : [...prev , '43'])}>
                            <p className={`${sizes.includes('43') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('43') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>43</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('44') ? prev.filter(item => item !== '44') : [...prev , '44'])}>
                            <p className={`${sizes.includes('44') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('44') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>44</p>
                        </div>
                    </div>
                :category === 'Geometric' && typecategory === 'Clothes' && subcategory1 === 'safety shoes'?
                    //safety shoes
                    <div className={`flex gap-3`}>
                        <div onClick={()=>setSizes(prev => prev.includes('35') ? prev.filter(item => item !== '35') : [...prev , '35'])}> 
                            <p className={`${sizes.includes('35') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('35') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>35</p>
                        </div>

                        <div onClick={()=>setSizes(prev => prev.includes('36') ? prev.filter(item => item !== '36') : [...prev , '36'])}>
                            <p className={`${sizes.includes('36') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('36') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>36</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('37') ? prev.filter(item => item !== '37') : [...prev , '37'])}>
                            <p className={`${sizes.includes('37') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('37') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>37</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('38') ? prev.filter(item => item !== '38') : [...prev , '38'])}>
                            <p className={`${sizes.includes('38') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('38') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>38</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('39') ? prev.filter(item => item !== '39') : [...prev , '39'])}>
                            <p className={`${sizes.includes('39') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('39') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>39</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('40') ? prev.filter(item => item !== '40') : [...prev , '40'])}>
                            <p className={`${sizes.includes('40') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('40') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>40</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('41') ? prev.filter(item => item !== '41') : [...prev , '41'])}>
                            <p className={`${sizes.includes('41') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('41') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>41</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('42') ? prev.filter(item => item !== '42') : [...prev , '42'])}>
                            <p className={`${sizes.includes('42') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('42') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>42</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('43') ? prev.filter(item => item !== '43') : [...prev , '43'])}>
                            <p className={`${sizes.includes('43') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('43') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>43</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('44') ? prev.filter(item => item !== '44') : [...prev , '44'])}>
                            <p className={`${sizes.includes('44') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('44') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>44</p>
                        </div>
                    </div>
                    //elbaky
                :    <div className={`flex gap-3`}>
                        <div onClick={()=>setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev , 'S'])}> 
                            <p className={`${sizes.includes('S') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('S') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>S</p>
                        </div>

                        <div onClick={()=>setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev , 'M'])}>
                            <p className={`${sizes.includes('M') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('M') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>M</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev , 'L'])}>
                            <p className={`${sizes.includes('L') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('L') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>L</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev , 'XL'])}>
                            <p className={`${sizes.includes('XL') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('XL') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>XL</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev , 'XXL'])}>
                            <p className={`${sizes.includes('XXL') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('XXL') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>XXL</p>
                        </div>
                        
                        <div onClick={()=>setSizes(prev => prev.includes('One Size') ? prev.filter(item => item !== 'One Size') : [...prev , 'One Size'])}>
                            <p className={`${sizes.includes('One Size') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('One Size') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>One Size</p>
                        </div>

                        <div required onClick={()=>setSizes(prev => prev.includes('No Size') ? prev.filter(item => item !== 'No Size') : [...prev , 'No Size'])}>
                            <p className={`${sizes.includes('No Size') ? 'bg-[#1B5CBECC]' : 'bg-slate-200'} ${sizes.includes('No Size') ? 'text-white' : 'text-gray-600'} px-3 py-1 cursor-pointer`}>No Size</p>
                        </div>
                    </div>
                }
            </div>
            
            {/* bestseller place */}
            
            <button onClick={onSubmitHandler} type='submit' className='px-8 py-3 mt-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500 text-black active:bg-gray-800'>
                ADD
            </button>                           
        </form>
    )
}
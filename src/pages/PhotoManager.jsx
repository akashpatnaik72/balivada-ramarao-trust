import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Camera, Trash2, ArrowLeft, Upload, Info, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PillButton from '@/components/site/PillButton';

const PhotoManager = () => {
    const [section, setSection] = useState('gallery');
    const [selectedFiles, setSelectedFiles] = useState([]); // { file, src, caption }
    const [slotImage, setSlotImage] = useState(null); // { file, src }
    const [selectedSlot, setSelectedSlot] = useState('');
    const [existingGallery, setExistingGallery] = useState([]);

    // Slots definitions
    const SLOTS = {
        home: [
            { id: 'founder', name: 'Founder Hero Image (IMG.founder)' },
            { id: 'trees', name: 'Plantation Banner (IMG.trees)' },
        ],
        about: [
            { id: 'founder', name: 'Founder portrait (IMG.founder)' },
            { id: 'stage', name: 'State recognition award (IMG.stage)' },
            { id: 'trophies', name: 'Trophies and awards gallery collection (IMG.trophies)' },
            { id: 'medical', name: 'Medical camp diagnostics service (IMG.medical)' },
        ],
        donate: [
            { id: 'qr', name: 'PhonePe QR Code (Donate QR area)' },
        ],
    };

    // Load existing custom gallery photos
    useEffect(() => {
        const stored = localStorage.getItem('custom_photos_gallery');
        if (stored) {
            try {
                setExistingGallery(JSON.parse(stored));
            } catch (e) {
                setExistingGallery([]);
            }
        }
    }, [section]);

    // Handle section changes
    useEffect(() => {
        setSelectedFiles([]);
        setSlotImage(null);
        if (SLOTS[section]) {
            setSelectedSlot(SLOTS[section][0].id);
        } else {
            setSelectedSlot('');
        }
    }, [section]);

    // Read files helper
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        if (section === 'gallery') {
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFiles((prev) => [
                        ...prev,
                        { file, src: reader.result, caption: file.name.split('.')[0] },
                    ]);
                };
                reader.readAsDataURL(file);
            });
        } else {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSlotImage({ file, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove file from preview list before adding
    const removeSelectedFile = (idx) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    // Add photos to gallery list
    const handleAddGalleryPhotos = () => {
        if (!selectedFiles.length) return;

        const newPhotos = selectedFiles.map((f, i) => ({
            id: `custom_${Date.now()}_${i}`,
            src: f.src,
            caption: f.caption.trim() || 'Custom Photo',
        }));

        const updated = [...newPhotos, ...existingGallery];
        localStorage.setItem('custom_photos_gallery', JSON.stringify(updated));
        setExistingGallery(updated);
        setSelectedFiles([]);
        alert('Successfully added photos to local storage gallery preview!');
    };

    // Remove photo from gallery list
    const handleDeleteGalleryPhoto = (id) => {
        const updated = existingGallery.filter((p) => p.id !== id);
        localStorage.setItem('custom_photos_gallery', JSON.stringify(updated));
        setExistingGallery(updated);
    };

    // Save single slot override
    const handleSaveSlotOverride = () => {
        if (!slotImage || !selectedSlot) return;

        localStorage.setItem(`custom_slot_${section}_${selectedSlot}`, slotImage.src);
        setSlotImage(null);
        alert(`Successfully overrode the [${selectedSlot}] slot inside [${section}] page!`);
    };

    // Clear single slot override
    const handleClearSlotOverride = (slotId) => {
        localStorage.removeItem(`custom_slot_${section}_${slotId}`);
        // Trigger a force state update
        setSelectedSlot(selectedSlot);
        alert(`Cleared override for [${slotId}] slot. Back to default asset.`);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F5] text-brand-dark pb-20 pt-10">
            <Helmet>
                <title>Dev Tool: Photo Manager</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="mx-auto max-w-[50rem] px-6">
                {/* Header Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-green hover:text-brand-dark transition-colors mb-6 font-semibold">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="rounded-[2.5rem] border border-brand-dark/15 bg-white p-8 shadow-soft md:p-10">
                    {/* Dev Banner */}
                    <div className="flex items-start gap-3 rounded-2xl bg-brand-accent/20 border border-brand-accent/40 p-4 mb-8">
                        <Info className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                        <div>
                            <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Development-Only Photo Manager</h2>
                            <p className="text-xs text-brand-dark/80 mt-1 leading-relaxed">
                                This route is only for previewing new photos during development. Uploads are stored in your browser's local storage as Base64 data and override default images dynamically.
                            </p>
                        </div>
                    </div>

                    {/* Section Selector */}
                    <div>
                        <label htmlFor="section-select" className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 block mb-2">Select Section</label>
                        <div className="flex flex-wrap gap-2">
                            {['gallery', 'home', 'about', 'donate'].map((sec) => (
                                <button
                                    key={sec}
                                    type="button"
                                    onClick={() => setSection(sec)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 ${
                                        section === sec
                                            ? 'bg-brand-accent border-brand-accent text-brand-dark'
                                            : 'bg-white border-brand-dark/15 text-brand-dark/70 hover:border-brand-dark'
                                    }`}
                                >
                                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-brand-dark/10 my-8" />

                    {/* Content management logic */}
                    {section === 'gallery' ? (
                        <div className="space-y-6">
                            <h3 className="font-display text-xl font-bold">Manage Gallery Items</h3>
                            
                            {/* File Upload Box */}
                            <div className="relative border-2 border-dashed border-brand-dark/20 hover:border-brand-accent transition-colors rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer bg-[#FAF9F5]/40 group">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    aria-label="Upload files"
                                />
                                <Upload className="h-10 w-10 text-brand-green mb-3 group-hover:scale-105 transition-transform" />
                                <p className="text-sm font-semibold text-brand-dark">Click to upload multiple image files</p>
                                <p className="text-xs text-brand-dark/65 mt-1">Images will be resized to a clean 4:3 crop in the grid</p>
                            </div>

                            {/* Preview Queue */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/60">Selected Previews ({selectedFiles.length})</h4>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {selectedFiles.map((fileObj, idx) => (
                                            <div key={idx} className="relative rounded-2xl border border-brand-dark/10 bg-[#FAF9F5] p-3 flex gap-3 items-center">
                                                <img src={fileObj.src} alt="preview" className="w-16 h-12 object-cover rounded-lg shrink-0" />
                                                <div className="min-w-0 flex-grow">
                                                    <label htmlFor={`caption-${idx}`} className="sr-only">Caption</label>
                                                    <input
                                                        id={`caption-${idx}`}
                                                        type="text"
                                                        value={fileObj.caption}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setSelectedFiles((prev) =>
                                                                prev.map((item, i) => (i === idx ? { ...item, caption: val } : item))
                                                            );
                                                        }}
                                                        placeholder="Enter caption..."
                                                        className="w-full text-xs border border-brand-dark/10 rounded-lg px-2 py-1.5 focus:border-brand-accent focus:outline-none bg-white"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSelectedFile(idx)}
                                                    className="p-1 rounded-full text-red-500 hover:bg-red-50 shrink-0"
                                                    aria-label="Remove photo"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <PillButton onClick={handleAddGalleryPhotos} className="w-full sm:w-auto mt-2">
                                        Add Selected Photos
                                    </PillButton>
                                </div>
                            )}

                            {/* Existing Overrides */}
                            {existingGallery.length > 0 && (
                                <div className="space-y-4 pt-4 border-t border-brand-dark/10">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/60">Currently Previews in Gallery ({existingGallery.length})</h4>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {existingGallery.map((item) => (
                                            <div key={item.id} className="group relative rounded-xl border border-brand-dark/10 overflow-hidden bg-white">
                                                <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                                    <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteGalleryPhoto(item.id)}
                                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition-colors"
                                                        aria-label="Delete photo"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                                <div className="p-2 text-xs font-medium text-brand-dark/80 truncate">
                                                    {item.caption}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="font-display text-xl font-bold">Configure Image Slots</h3>

                            {/* Slots Selector */}
                            <div>
                                <label htmlFor="slot-select" className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 block mb-2">Select Target Image Slot</label>
                                <select
                                    id="slot-select"
                                    value={selectedSlot}
                                    onChange={(e) => {
                                        setSelectedSlot(e.target.value);
                                        setSlotImage(null);
                                    }}
                                    className="w-full rounded-2xl border border-brand-dark/15 px-4 py-3 bg-white text-sm focus:border-brand-accent focus:outline-none"
                                >
                                    {SLOTS[section].map((sl) => (
                                        <option key={sl.id} value={sl.id}>{sl.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Preview current slot status */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-2xl border border-brand-dark/10 bg-[#FAF9F5] p-5 flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 mb-3">Local Overrides Preview</span>
                                    {localStorage.getItem(`custom_slot_${section}_${selectedSlot}`) ? (
                                        <div className="w-full flex flex-col items-center gap-3">
                                            <img
                                                src={localStorage.getItem(`custom_slot_${section}_${selectedSlot}`)}
                                                alt="Slot Preview"
                                                className="w-full max-h-48 object-contain rounded-xl border border-brand-dark/5 bg-white shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleClearSlotOverride(selectedSlot)}
                                                className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1.5"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Restore Default Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <ImageIcon className="h-8 w-8 text-brand-dark/30 mx-auto mb-2" />
                                            <p className="text-xs text-brand-dark/65">Currently using default project assets.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 block">Upload Visual Override</span>
                                    
                                    <div className="relative border-2 border-dashed border-brand-dark/20 hover:border-brand-accent transition-colors rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer bg-[#FAF9F5]/40 group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            aria-label="Upload override"
                                        />
                                        <Camera className="h-8 w-8 text-brand-green mb-2 group-hover:scale-105 transition-transform" />
                                        <p className="text-xs font-semibold text-brand-dark">Click to select new image file</p>
                                    </div>

                                    {slotImage && (
                                        <div className="rounded-xl border border-brand-dark/15 p-3 flex gap-3 items-center">
                                            <img src={slotImage.src} alt="new override" className="w-16 h-12 object-cover rounded-lg shrink-0" />
                                            <div className="min-w-0 flex-grow text-xs truncate font-medium text-brand-dark/80">
                                                {slotImage.file.name}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSlotImage(null)}
                                                className="text-xs font-semibold text-red-500 hover:underline shrink-0"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    )}

                                    {slotImage && (
                                        <PillButton onClick={handleSaveSlotOverride} className="w-full">
                                            Override Selected Slot
                                        </PillButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* How to commit changes */}
                    <div className="border-t border-brand-dark/10 my-8" />
                    
                    <div className="rounded-2xl bg-brand-cream/30 border border-brand-dark/5 p-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark flex items-center gap-2 mb-3">
                            <ImageIcon className="h-4 w-4 text-brand-green" />
                            How to Persist Photos Permanently
                        </h4>
                        <ol className="text-xs text-brand-dark/80 space-y-2 list-decimal list-inside leading-relaxed">
                            <li>Copy the finalized files into your project's <code className="bg-brand-cream px-1.5 py-0.5 rounded font-mono border border-brand-dark/10">public/images/</code> folder (e.g. <code className="bg-brand-cream px-1.5 py-0.5 rounded font-mono border border-brand-dark/10">c:/Users/avina/Desktop/cool drink/apps/web/public/images/</code>).</li>
                            <li>Locate the constant <code className="bg-brand-cream px-1.5 py-0.5 rounded font-mono border border-brand-dark/10">IMG</code> mapping in the target file (like <code className="bg-brand-cream px-1.5 py-0.5 rounded font-mono border border-brand-dark/10">src/pages/GalleryPage.jsx</code>).</li>
                            <li>Change the path mapping value to point to your new file path (e.g. <code className="bg-brand-cream px-1.5 py-0.5 rounded font-mono border border-brand-dark/10">"/images/your-photo.png"</code> instead of the old URL).</li>
                            <li>Clear local overrides in this Photo Manager to confirm the permanent assets show up perfectly.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoManager;
